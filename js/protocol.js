/**
 * HHKB USB HID Communication Protocol Driver
 *
 * Implements hardware-level communication for HHKB Classic and Hybrid series
 * via WebHID API, with zero client-side artificial model restrictions.
 */

export const PFU_VENDOR_ID = 0x04fe;

export const HHKB_PRODUCT_IDS = {
  HYBRID_TYPE_S: 0x0020,
  HYBRID: 0x0021,
  CLASSIC: 0x0022,
};

export const COMMANDS = {
  NOTIFY_APPLICATION_STATE: 1,
  GET_KEYBOARD_INFO: 2,
  RESET_FACTORY_DEFAULTS: 3,
  CONFIRM_KEYMAP: 4,
  GET_DIP_STATE: 5,
  GET_KEYBOARD_MODE: 6,
  RESET_DIPSW: 7,
  WRITE_KEYMAP: 134,
  GET_KEYMAP: 135,
};

export class HHKBError extends Error {
  constructor(message, details = null) {
    super(message);
    this.name = "HHKBError";
    this.details = details;
  }
}

export class HHKBTimeoutError extends HHKBError {
  constructor(commandName, timeoutMs) {
    super(`Timeout waiting for response from HHKB (Command: ${commandName}, ${timeoutMs}ms)`);
    this.name = "HHKBTimeoutError";
  }
}

export class HHKBProtocolError extends HHKBError {
  constructor(message, rawData = null) {
    super(message);
    this.name = "HHKBProtocolError";
    this.rawData = rawData;
  }
}

/**
 * Pure protocol packet encoder and decoder
 */
export class HHKBPacket {
  static REPORT_LENGTH = 64;

  /**
   * Builds a standard 64-byte payload report
   * Buffer[0] = 0xAA, Buffer[1] = 0xAA, Buffer[2] = Command
   */
  static createBasePacket(commandId) {
    const packet = new Uint8Array(HHKBPacket.REPORT_LENGTH);
    packet[0] = 0xaa;
    packet[1] = 0xaa;
    packet[2] = commandId;
    return packet;
  }

  static createNotifyAppStatePacket(open) {
    const packet = HHKBPacket.createBasePacket(COMMANDS.NOTIFY_APPLICATION_STATE);
    packet[3] = 0;
    packet[4] = 1;
    packet[5] = open ? 1 : 0;
    return packet;
  }

  static createGetKeyboardModePacket() {
    return HHKBPacket.createBasePacket(COMMANDS.GET_KEYBOARD_MODE);
  }

  static createGetKeyboardInfoPacket() {
    return HHKBPacket.createBasePacket(COMMANDS.GET_KEYBOARD_INFO);
  }

  static createResetFactoryDefaultsPacket() {
    return HHKBPacket.createBasePacket(COMMANDS.RESET_FACTORY_DEFAULTS);
  }

  static createResetDipswPacket() {
    const packet = HHKBPacket.createBasePacket(COMMANDS.RESET_DIPSW);
    packet[3] = 0;
    packet[4] = 1;
    return packet;
  }

  static createConfirmKeymapPacket() {
    return HHKBPacket.createBasePacket(COMMANDS.CONFIRM_KEYMAP);
  }

  static createGetKeymapPacket(mode, isFn) {
    const packet = HHKBPacket.createBasePacket(COMMANDS.GET_KEYMAP);
    packet[4] = 2;
    packet[5] = mode;
    packet[6] = isFn ? 1 : 0;
    return packet;
  }

  /**
   * Creates the 3 write packets for keymap array (128 bytes)
   */
  static createWriteKeymapPackets(layout, mode, isFn) {
    if (!layout || layout.length !== 128) {
      throw new HHKBProtocolError(`Invalid layout length: expected 128, got ${layout?.length}`);
    }

    // Pass 1: 57 bytes (layout[0..56])
    const p1 = HHKBPacket.createBasePacket(COMMANDS.WRITE_KEYMAP);
    p1[3] = 65;
    p1[4] = 59;
    p1[5] = mode;
    p1[6] = isFn ? 1 : 0;
    for (let i = 0; i < 57; i++) {
      p1[7 + i] = layout[i];
    }

    // Pass 2: 59 bytes (layout[57..115])
    const p2 = HHKBPacket.createBasePacket(COMMANDS.WRITE_KEYMAP);
    p2[3] = 130;
    p2[4] = 59;
    for (let i = 0; i < 59; i++) {
      p2[5 + i] = layout[57 + i];
    }

    // Pass 3: 12 bytes (layout[116..127])
    const p3 = HHKBPacket.createBasePacket(COMMANDS.WRITE_KEYMAP);
    p3[3] = 195;
    p3[4] = 12;
    for (let i = 0; i < 12; i++) {
      p3[5 + i] = layout[116 + i];
    }

    return [p1, p2, p3];
  }

  static parseKeyboardInfo(data) {
    // data is Uint8Array of length 64
    const decoder = new TextDecoder("utf-8");
    const typeNumber = decoder.decode(data.subarray(6, 26)).replace(/\0/g, "").trim();
    const revision = decoder.decode(data.subarray(26, 30)).replace(/\0/g, "").trim();
    const serial = decoder.decode(data.subarray(30, 46)).replace(/\0/g, "").trim();
    const appFirmware = decoder.decode(data.subarray(46, 54)).replace(/\0/g, "").trim();
    const bootFirmware = decoder.decode(data.subarray(54, 62)).replace(/\0/g, "").trim();
    return {
      typeNumber,
      revision,
      serial,
      appFirmware,
      bootFirmware,
    };
  }
}

/**
 * High-level HHKB device controller
 */
export class HHKBDevice {
  constructor(hidDevice, onLog = null) {
    this.device = hidDevice;
    this.onLog = onLog || (() => {});
    this.reportQueue = [];
    this.waitingResolvers = [];

    this._boundInputReportHandler = this._handleInputReport.bind(this);
    this.device.addEventListener("inputreport", this._boundInputReportHandler);
  }

  log(msg, data = null) {
    let hex = "";
    if (data) {
      hex = Array.from(data)
        .slice(0, 16)
        .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
        .join(" ");
      if (data.length > 16) hex += ` ... (${data.length} bytes)`;
    }
    this.onLog(`[${new Date().toLocaleTimeString()}] ${msg} ${hex}`.trim());
  }

  _handleInputReport(event) {
    const raw = new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength);
    if (this.waitingResolvers.length > 0) {
      const resolver = this.waitingResolvers.shift();
      resolver(raw);
    } else {
      this.reportQueue.push(raw);
    }
  }

  async sendPacket(packet, desc = "SEND") {
    this.log(`-> ${desc}`, packet);
    // Report ID 0x00 is passed to sendReport
    await this.device.sendReport(0x00, packet);
  }

  async receiveReport(desc = "RECV", timeoutMs = 2500) {
    if (this.reportQueue.length > 0) {
      const report = this.reportQueue.shift();
      this.log(`<- ${desc}`, report);
      return report;
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const idx = this.waitingResolvers.indexOf(resolveWrapper);
        if (idx !== -1) {
          this.waitingResolvers.splice(idx, 1);
        }
        reject(new HHKBTimeoutError(desc, timeoutMs));
      }, timeoutMs);

      const resolveWrapper = (data) => {
        clearTimeout(timer);
        this.log(`<- ${desc}`, data);
        resolve(data);
      };

      this.waitingResolvers.push(resolveWrapper);
    });
  }

  async setApplicationState(open) {
    const packet = HHKBPacket.createNotifyAppStatePacket(open);
    await this.sendPacket(packet, `NOTIFY_APPLICATION_STATE(${open ? "open" : "close"})`);
    const resp = await this.receiveReport("RESP_APP_STATE");
    return resp;
  }

  async getKeyboardMode() {
    const packet = HHKBPacket.createGetKeyboardModePacket();
    await this.sendPacket(packet, "GET_KEYBOARD_MODE");
    const resp = await this.receiveReport("RESP_KEYBOARD_MODE");
    // Mode is in resp[5] (index 6 in 65-byte buffer, index 5 in 64-byte payload)
    return resp[5];
  }

  async getKeyboardInfo() {
    const packet = HHKBPacket.createGetKeyboardInfoPacket();
    await this.sendPacket(packet, "GET_KEYBOARD_INFO");
    const resp = await this.receiveReport("RESP_KEYBOARD_INFO");
    return HHKBPacket.parseKeyboardInfo(resp);
  }

  async resetFactoryDefaults() {
    const packet = HHKBPacket.createResetFactoryDefaultsPacket();
    await this.sendPacket(packet, "RESET_FACTORY_DEFAULTS");
    const resp = await this.receiveReport("RESP_RESET_FACTORY");
    // Verify response
    if (resp[0] !== 85 || resp[1] !== 85) {
      throw new HHKBProtocolError("Unexpected response for RESET_FACTORY_DEFAULTS", resp);
    }
    return true;
  }

  async resetDipSwitch() {
    const packet = HHKBPacket.createResetDipswPacket();
    await this.sendPacket(packet, "RESET_DIPSW");
    const resp = await this.receiveReport("RESP_RESET_DIPSW");
    return resp;
  }

  async confirmKeymap() {
    const packet = HHKBPacket.createConfirmKeymapPacket();
    await this.sendPacket(packet, "CONFIRM_KEYMAP");
    const resp = await this.receiveReport("RESP_CONFIRM_KEYMAP");
    return resp;
  }

  /**
   * Reads the full 128-byte keymap array for either standard or fn layer
   */
  async readKeymap(isFn = false) {
    const mode = await this.getKeyboardMode();
    const packet = HHKBPacket.createGetKeymapPacket(mode, isFn);
    await this.sendPacket(packet, `GET_KEYMAP(isFn=${isFn})`);

    const layout = new Uint8Array(128);

    // Read 3 passes from device
    const pass1 = await this.receiveReport("GET_KEYMAP_PASS1");
    for (let i = 0; i < 58; i++) {
      layout[i] = pass1[5 + i];
    }

    const pass2 = await this.receiveReport("GET_KEYMAP_PASS2");
    for (let i = 0; i < 58; i++) {
      layout[i + 58] = pass2[5 + i];
    }

    const pass3 = await this.receiveReport("GET_KEYMAP_PASS3");
    for (let i = 0; i < 12; i++) {
      layout[i + 116] = pass3[5 + i];
    }

    return layout;
  }

  /**
   * Writes the 128-byte layout and persists to Flash memory
   */
  async writeKeymap(layout, isFn = false) {
    if (!layout || layout.length !== 128) {
      throw new HHKBError("Invalid layout buffer: must be 128 bytes");
    }

    // Step 1: Notify start
    await this.setApplicationState(false);

    // Step 2: Mode
    const mode = await this.getKeyboardMode();

    // Step 3: Write in 3 packets
    const [p1, p2, p3] = HHKBPacket.createWriteKeymapPackets(layout, mode, isFn);

    await this.sendPacket(p1, "WRITE_KEYMAP_PASS1");
    await this.receiveReport("RESP_WRITE_PASS1");

    await this.sendPacket(p2, "WRITE_KEYMAP_PASS2");
    await this.receiveReport("RESP_WRITE_PASS2");

    await this.sendPacket(p3, "WRITE_KEYMAP_PASS3");
    await this.receiveReport("RESP_WRITE_PASS3");

    // Step 4: Confirm and commit to Flash
    await this.confirmKeymap();

    // Step 5: Reset DIP switch cache
    await this.resetDipSwitch();

    // Step 6: Notify completed
    await this.setApplicationState(true);

    return true;
  }

  async close() {
    this.device.removeEventListener("inputreport", this._boundInputReportHandler);
    if (this.device.opened) {
      await this.device.close();
    }
  }
}
