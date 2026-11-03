import { i18n } from "./i18n/index.js?v=1.2.5";
import { PFU_VENDOR_ID, HHKBDevice, HHKBError } from "./protocol.js?v=1.2.5";
import { HHKB_ANSI_LAYOUT, HID_KEYCODES, DOM_CODE_TO_HID, getKeyName } from "./keymap-data.js?v=1.2.5";

class HHKBApp {
  constructor() {
    this.device = null;
    this.deviceInfo = null;
    this.deviceMode = null;
    this.currentLayer = "standard"; // "standard" | "fn"
    this.currentCategory = "basic";
    this.selectedKeyIndex = null;

    // 128-byte layout buffers
    this.standardLayout = new Uint8Array(128);
    this.fnLayout = new Uint8Array(128);

    // Initialize with default standard ANSI codes
    this.initDefaultLayouts();

    // Cache DOM Elements
    this.dom = {
      connectBtn: document.getElementById("connect-btn"),
      disconnectBtn: document.getElementById("disconnect-btn"),
      deviceStatus: document.getElementById("device-status"),
      deviceInfoCard: document.getElementById("device-info-card"),
      deviceModel: document.getElementById("info-model"),
      deviceSerial: document.getElementById("info-serial"),
      deviceFirmware: document.getElementById("info-firmware"),
      deviceMode: document.getElementById("info-mode"),

      layerStandardBtn: document.getElementById("layer-standard-btn"),
      layerFnBtn: document.getElementById("layer-fn-btn"),

      readBtn: document.getElementById("read-btn"),
      writeBtn: document.getElementById("write-btn"),
      resetBtn: document.getElementById("reset-btn"),
      exportBtn: document.getElementById("export-btn"),
      importBtn: document.getElementById("import-btn"),
      importFileInput: document.getElementById("import-file-input"),

      keyboardContainer: document.getElementById("keyboard-container"),
      selectedKeyBar: document.getElementById("selected-key-bar"),
      unsavedBanner: document.getElementById("unsaved-banner"),
      quickFlashBtn: document.getElementById("quick-flash-btn"),
      paletteContainer: document.getElementById("palette-container"),

      logArea: document.getElementById("log-area"),
      clearLogBtn: document.getElementById("clear-log-btn"),
      errorBanner: document.getElementById("error-banner"),
      errorMessage: document.getElementById("error-message"),
      errorClose: document.getElementById("error-close"),

      langSelect: document.getElementById("lang-select"),
      themeSelect: document.getElementById("theme-select"),
    };

    this.initTheme();
    this.bindEvents();
    this.renderKeyboard();
    this.renderPalette("basic");
    i18n.notify();
  }

  initTheme() {
    const savedTheme = localStorage.getItem("hhkb_theme") || "classic-white";
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    if (this.dom.themeSelect) {
      this.dom.themeSelect.value = theme;
    }
    localStorage.setItem("hhkb_theme", theme);
  }

  initDefaultLayouts() {
    // Default fallback scan codes for ANSI HHKB
    const defaultAnsi = {
      60: 0x29, // Esc
      59: 0x1e, 58: 0x1f, 57: 0x20, 56: 0x21, 55: 0x22, 54: 0x23, // 1-6
      53: 0x24, 52: 0x25, 51: 0x26, 50: 0x27, 49: 0x2d, 48: 0x2e, // 7-0 - =
      47: 0x31, 46: 0x35, // \ `
      45: 0x2b, // Tab
      44: 0x14, 43: 0x1a, 42: 0x08, 41: 0x15, 40: 0x17, 39: 0x1c, // Q W E R T Y
      38: 0x18, 37: 0x0c, 36: 0x12, 35: 0x13, 34: 0x2f, 33: 0x30, // U I O P [ ]
      32: 0x2a, // Delete
      31: 0xe0, // Control
      30: 0x04, 29: 0x16, 28: 0x07, 27: 0x09, 26: 0x0a, 25: 0x0b, // A S D F G H
      24: 0x0d, 23: 0x0e, 22: 0x0f, 21: 0x33, 20: 0x34, 19: 0x28, // J K L ; ' Return
      18: 0xe1, // L_Shift
      17: 0x1d, 16: 0x1b, 15: 0x06, 14: 0x19, 13: 0x05, 12: 0x11, // Z X C V B N
      11: 0x10, 10: 0x36, 9: 0x37, 8: 0x38, // M , . /
      7: 0xe5, // R_Shift
      6: 0x01, // Fn
      5: 0xe2, 4: 0xe3, 3: 0x2c, 2: 0xe7, 1: 0xe6 // Opt Cmd Space Cmd Opt
    };

    for (const [idx, code] of Object.entries(defaultAnsi)) {
      this.standardLayout[Number(idx)] = code;
      this.fnLayout[Number(idx)] = code;
    }

    // Default Fn additions
    this.fnLayout[34] = 0x52; // [ -> Up
    this.fnLayout[21] = 0x50; // ; -> Left
    this.fnLayout[20] = 0x4f; // ' -> Right
    this.fnLayout[8] = 0x51;  // / -> Down
    this.fnLayout[44] = 0x81; // Q -> VolDown
    this.fnLayout[43] = 0x80; // W -> VolUp
    this.fnLayout[42] = 0x7f; // E -> Mute
  }

  log(msg) {
    const text = `${msg}\n`;
    this.dom.logArea.value += text;
    this.dom.logArea.scrollTop = this.dom.logArea.scrollHeight;
  }

  showError(error) {
    console.error(error);
    const msg = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    this.dom.errorMessage.textContent = msg;
    this.dom.errorBanner.classList.remove("hidden");
    this.log(`[ERROR] ${msg}`);
  }

  clearError() {
    this.dom.errorBanner.classList.add("hidden");
  }

  bindEvents() {
    // Language selection
    this.dom.langSelect.value = i18n.getLocale();
    this.dom.langSelect.addEventListener("change", (e) => {
      i18n.setLocale(e.target.value);
      this.refreshLanguageViews();
    });

    // Theme selection
    if (this.dom.themeSelect) {
      this.dom.themeSelect.addEventListener("change", (e) => {
        this.setTheme(e.target.value);
      });
    }

    this.dom.errorClose.addEventListener("click", () => this.clearError());
    this.dom.clearLogBtn.addEventListener("click", () => (this.dom.logArea.value = ""));

    // Connect / Disconnect
    this.dom.connectBtn.addEventListener("click", () => this.connect());
    this.dom.disconnectBtn.addEventListener("click", () => this.disconnect());

    // Layer switching
    this.dom.layerStandardBtn.addEventListener("click", () => this.switchLayer("standard"));
    this.dom.layerFnBtn.addEventListener("click", () => this.switchLayer("fn"));

    // Hardware Actions
    this.dom.readBtn.addEventListener("click", () => this.readFromKeyboard());
    this.dom.writeBtn.addEventListener("click", () => this.writeToKeyboard());
    if (this.dom.quickFlashBtn) {
      this.dom.quickFlashBtn.addEventListener("click", () => this.writeToKeyboard());
    }
    this.dom.resetBtn.addEventListener("click", () => this.resetFactory());

    // JSON Import / Export
    this.dom.exportBtn.addEventListener("click", () => this.exportJson());
    this.dom.importBtn.addEventListener("click", () => this.dom.importFileInput.click());
    this.dom.importFileInput.addEventListener("change", (e) => this.importJson(e));

    // Physical keyboard press listener (Direct recording)
    window.addEventListener("keydown", (e) => {
      // Ignore if typing inside textareas or inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }

      if (this.selectedKeyIndex !== null) {
        const hidCode = DOM_CODE_TO_HID[e.code];
        if (hidCode !== undefined) {
          e.preventDefault();
          e.stopPropagation();
          this.log(`[Key Pressed] Detected: ${e.code} -> Mapping to HID: 0x${hidCode.toString(16).padStart(2, "0").toUpperCase()}`);
          this.assignKeycodeToSelected(hidCode);
        } else {
          this.log(`[Key Pressed] Key ${e.code} not mapped in direct recorder.`);
        }
      }
    });

    // Palette tab switching
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.currentCategory = e.target.dataset.category;
        this.renderPalette(this.currentCategory);
      });
    });
  }

  refreshLanguageViews() {
    this.updateSelectionBar();
    this.renderKeyboard();
    this.renderPalette(this.currentCategory || "basic");

    if (this.device && this.deviceInfo) {
      const modeMap = {
        0: i18n.t("device.modeHhk"),
        1: i18n.t("device.modeMac"),
        2: i18n.t("device.modeLite"),
      };
      this.dom.deviceMode.textContent = modeMap[this.deviceMode] || i18n.t("device.modeUnknown", { code: this.deviceMode });

      this.dom.deviceStatus.textContent = i18n.t("app.statusConnected", {
        model: this.deviceInfo.typeNumber || "HHKB",
        firmware: this.deviceInfo.appFirmware || "1.0",
      });
    } else {
      this.dom.deviceStatus.textContent = i18n.t("app.deviceNotConnected");
    }
  }

  async connect() {
    this.clearError();
    if (!("hid" in navigator)) {
      this.showError(new Error(i18n.t("app.browserUnsupported")));
      return;
    }

    try {
      this.dom.connectBtn.disabled = true;
      this.dom.deviceStatus.textContent = i18n.t("app.statusConnecting");

      // Request device from user
      const devices = await navigator.hid.requestDevice({
        filters: [{ vendorId: PFU_VENDOR_ID }],
      });

      if (!devices || devices.length === 0) {
        throw new HHKBError(i18n.t("errors.noDeviceSelected"));
      }

      // Find Interface 2 (the configuration interface)
      let selectedDevice = null;
      for (const dev of devices) {
        // Find collection with interface 2
        const isProgInterface = dev.collections.some((c) => {
          // Check usagePage or collection properties
          return true;
        });
        if (isProgInterface) {
          selectedDevice = dev;
          break;
        }
      }

      if (!selectedDevice) {
        selectedDevice = devices[0];
      }

      if (!selectedDevice.opened) {
        await selectedDevice.open();
      }

      this.device = new HHKBDevice(selectedDevice, (msg) => this.log(msg));
      this.log(`Connected to USB device: ${selectedDevice.productName}`);

      // Read Device Info & Mode
      this.deviceInfo = await this.device.getKeyboardInfo();
      this.deviceMode = await this.device.getKeyboardMode();

      this.dom.deviceModel.textContent = this.deviceInfo.typeNumber || "HHKB";
      this.dom.deviceSerial.textContent = this.deviceInfo.serial || "N/A";
      this.dom.deviceFirmware.textContent = this.deviceInfo.appFirmware || "N/A";

      const modeMap = {
        0: i18n.t("device.modeHhk"),
        1: i18n.t("device.modeMac"),
        2: i18n.t("device.modeLite"),
      };
      this.dom.deviceMode.textContent = modeMap[this.deviceMode] || i18n.t("device.modeUnknown", { code: this.deviceMode });

      this.dom.deviceStatus.textContent = i18n.t("app.statusConnected", {
        model: this.deviceInfo.typeNumber || "HHKB",
        firmware: this.deviceInfo.appFirmware || "1.0",
      });

      this.dom.connectBtn.classList.add("hidden");
      this.dom.disconnectBtn.classList.remove("hidden");
      this.dom.deviceInfoCard.classList.remove("hidden");
      this.dom.readBtn.disabled = false;
      this.dom.writeBtn.disabled = false;
      this.dom.resetBtn.disabled = false;

      // Automatically read current layout on connect
      await this.readFromKeyboard();
    } catch (err) {
      this.showError(err);
      this.dom.deviceStatus.textContent = i18n.t("app.deviceNotConnected");
    } finally {
      this.dom.connectBtn.disabled = false;
    }
  }

  async disconnect() {
    if (this.device) {
      await this.device.close();
      this.device = null;
    }
    this.dom.connectBtn.classList.remove("hidden");
    this.dom.disconnectBtn.classList.add("hidden");
    this.dom.deviceInfoCard.classList.add("hidden");
    this.dom.deviceStatus.textContent = i18n.t("app.deviceNotConnected");
    this.dom.readBtn.disabled = true;
    this.dom.writeBtn.disabled = true;
    this.dom.resetBtn.disabled = true;
    this.log("Disconnected from keyboard.");
  }

  switchLayer(layer) {
    this.currentLayer = layer;
    if (layer === "standard") {
      this.dom.layerStandardBtn.classList.add("active");
      this.dom.layerFnBtn.classList.remove("active");
    } else {
      this.dom.layerStandardBtn.classList.remove("active");
      this.dom.layerFnBtn.classList.add("active");
    }
    this.renderKeyboard();
    this.updateSelectionBar();
  }

  getActiveLayout() {
    return this.currentLayer === "standard" ? this.standardLayout : this.fnLayout;
  }

  renderKeyboard() {
    const layout = this.getActiveLayout();
    this.dom.keyboardContainer.innerHTML = "";

    // Group keys by row
    for (let r = 1; r <= 5; r++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = `keyboard-row row-${r}`;

      const rowKeys = HHKB_ANSI_LAYOUT.filter((k) => k.row === r);
      for (const k of rowKeys) {
        if (k.spacerBefore) {
          const spacer = document.createElement("div");
          spacer.className = "key-spacer";
          spacer.style.flexGrow = String(k.spacerBefore);
          rowDiv.appendChild(spacer);
        }

        const keyBtn = document.createElement("button");
        keyBtn.type = "button";
        keyBtn.className = `key-cap ${k.isModifier ? "key-modifier" : "key-alpha"}`;
        if (this.selectedKeyIndex === k.index) {
          keyBtn.classList.add("selected");
        }
        keyBtn.style.flexGrow = String(k.width);

        const currentCode = layout[k.index] || 0;
        const currentName = getKeyName(currentCode);

        keyBtn.innerHTML = `
          <span class="key-legend-main">${currentName}</span>
          <span class="key-legend-sub">${k.defaultLabel} (#${k.index})</span>
        `;

        keyBtn.addEventListener("click", () => {
          this.selectKey(k.index);
        });

        rowDiv.appendChild(keyBtn);

        if (k.spacerAfter) {
          const spacer = document.createElement("div");
          spacer.className = "key-spacer";
          spacer.style.flexGrow = String(k.spacerAfter);
          rowDiv.appendChild(spacer);
        }
      }

      this.dom.keyboardContainer.appendChild(rowDiv);
    }
  }

  selectKey(index) {
    this.selectedKeyIndex = index;
    this.renderKeyboard();
    this.updateSelectionBar();
  }

  updateSelectionBar() {
    if (this.selectedKeyIndex === null) {
      this.dom.selectedKeyBar.classList.remove("recording");
      this.dom.selectedKeyBar.textContent = i18n.t("keyboard.selectKeyPrompt");
      return;
    }

    const keyDef = HHKB_ANSI_LAYOUT.find((k) => k.index === this.selectedKeyIndex);
    const layout = this.getActiveLayout();
    const scancode = layout[this.selectedKeyIndex] || 0;
    const keyName = getKeyName(scancode);

    this.dom.selectedKeyBar.classList.add("recording");
    this.dom.selectedKeyBar.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span><strong>🎯 ${i18n.t("keyboard.selectedPrefix")} #${this.selectedKeyIndex} (${keyDef?.defaultLabel || ""})</strong>: ${i18n.t("keyboard.currentFunction")} = <span style="color:#60a5fa; font-weight:700;">0x${scancode.toString(16).padStart(2, "0").toUpperCase()} (${keyName})</span></span>
          <span style="font-size:12px; color:#4ade80; background:rgba(74,222,128,0.15); padding:2px 8px; border-radius:4px;">${i18n.t("keyboard.recorderReady")}</span>
        </div>
        <div class="quick-pill-row">
          <span style="font-size:12px; color:#94a3b8;">${i18n.t("keyboard.quickReplaceLabel")}</span>
          <button type="button" class="quick-pill-btn" data-code="0x2a">⌫ Backspace (0x2A)</button>
          <button type="button" class="quick-pill-btn" data-code="0x31">${i18n.t("keyboard.quickBackslash")} (0x31)</button>
          <button type="button" class="quick-pill-btn" data-code="0x4c">⌦ Delete (0x4C)</button>
          <button type="button" class="quick-pill-btn" data-code="0x29">⎋ Esc (0x29)</button>
          <button type="button" class="quick-pill-btn" data-code="0x28">↵ Return (0x28)</button>
          <button type="button" class="quick-pill-btn" data-code="0xe0">⌃ Control (0xE0)</button>
        </div>
      </div>
    `;

    // Bind quick pill buttons
    this.dom.selectedKeyBar.querySelectorAll(".quick-pill-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const code = parseInt(btn.dataset.code, 16);
        this.assignKeycodeToSelected(code);
      });
    });
  }

  markUnsaved() {
    this.hasUnsavedChanges = true;
    if (this.dom.unsavedBanner) {
      this.dom.unsavedBanner.classList.remove("hidden");
    }
    this.dom.writeBtn.classList.add("btn-pulse");
    if (this.device) {
      this.dom.writeBtn.disabled = false;
    }
  }

  markSaved() {
    this.hasUnsavedChanges = false;
    if (this.dom.unsavedBanner) {
      this.dom.unsavedBanner.classList.add("hidden");
    }
    this.dom.writeBtn.classList.remove("btn-pulse");
  }

  assignKeycodeToSelected(code) {
    if (this.selectedKeyIndex === null) {
      this.showError(new Error(i18n.t("keyboard.selectKeyPrompt")));
      return;
    }

    const layout = this.getActiveLayout();
    const prevCode = layout[this.selectedKeyIndex];
    layout[this.selectedKeyIndex] = code;

    this.markUnsaved();
    this.renderKeyboard();
    this.updateSelectionBar();

    // Add updated flash animation to the changed key
    const targetKeyEl = document.querySelector(`.key-cap.selected`);
    if (targetKeyEl) {
      targetKeyEl.classList.add("just-updated");
      setTimeout(() => targetKeyEl.classList.remove("just-updated"), 500);
    }

    this.log(`✓ ${i18n.t("actions.keyModifiedLog", {
      index: this.selectedKeyIndex,
      from: getKeyName(prevCode),
      to: getKeyName(code),
      code: code.toString(16).padStart(2, "0").toUpperCase(),
      layer: this.currentLayer,
    })}`);
  }

  renderPalette(category) {
    this.dom.paletteContainer.innerHTML = "";
    const filtered = HID_KEYCODES.filter((k) => k.category === category);

    for (const item of filtered) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-key-btn";
      btn.innerHTML = `
        <span class="palette-code">0x${item.code.toString(16).padStart(2, "0").toUpperCase()}</span>
        <span class="palette-name">${item.name}</span>
      `;

      btn.addEventListener("click", () => {
        this.assignKeycodeToSelected(item.code);
      });

      this.dom.paletteContainer.appendChild(btn);
    }
  }

  async readFromKeyboard() {
    this.clearError();
    if (!this.device) return;

    try {
      this.dom.readBtn.disabled = true;
      this.log(i18n.t("actions.reading"));

      // Read standard layer (isFn=false)
      const std = await this.device.readKeymap(false);
      this.standardLayout.set(std);

      // Read Fn layer (isFn=true)
      const fn = await this.device.readKeymap(true);
      this.fnLayout.set(fn);

      this.renderKeyboard();
      this.updateSelectionBar();
      this.markSaved();
      this.log("Successfully fetched both Standard and Fn layers from keyboard.");
    } catch (err) {
      this.showError(err);
    } finally {
      this.dom.readBtn.disabled = false;
    }
  }

  async writeToKeyboard() {
    this.clearError();
    if (!this.device) return;

    try {
      this.dom.writeBtn.disabled = true;
      this.dom.readBtn.disabled = true;
      this.log(i18n.t("actions.writing"));

      // Write Standard Layer
      this.log("Writing Standard Layer (128 bytes)...");
      await this.device.writeKeymap(this.standardLayout, false);

      // Write Fn Layer
      this.log("Writing Fn Layer (128 bytes)...");
      await this.device.writeKeymap(this.fnLayout, true);

      this.markSaved();
      this.log(i18n.t("actions.writeSuccess"));
      alert(i18n.t("actions.writeSuccess"));
    } catch (err) {
      this.showError(err);
    } finally {
      this.dom.writeBtn.disabled = false;
      this.dom.readBtn.disabled = false;
    }
  }

  async resetFactory() {
    this.clearError();
    if (!this.device) return;

    if (!confirm(i18n.t("actions.resetConfirm"))) {
      return;
    }

    try {
      this.dom.resetBtn.disabled = true;
      this.log("Resetting keyboard to factory defaults...");
      await this.device.resetFactoryDefaults();
      this.log(i18n.t("actions.resetSuccess"));
      alert(i18n.t("actions.resetSuccess"));

      // Re-read fresh defaults
      await this.readFromKeyboard();
    } catch (err) {
      this.showError(err);
    } finally {
      this.dom.resetBtn.disabled = false;
    }
  }

  exportJson() {
    const backup = {
      version: 1,
      timestamp: new Date().toISOString(),
      standard: Array.from(this.standardLayout),
      fn: Array.from(this.fnLayout),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hhkb-keymap-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.log("Exported keymap configuration to JSON file.");
  }

  importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.standard || !data.fn) {
          throw new Error("Invalid HHKB keymap backup JSON file.");
        }
        this.standardLayout = new Uint8Array(data.standard);
        this.fnLayout = new Uint8Array(data.fn);
        this.renderKeyboard();
        this.updateSelectionBar();
        this.log(`Restored keymap from file: ${file.name}`);
      } catch (err) {
        this.showError(err);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }
}

// Instantiate App
window.addEventListener("DOMContentLoaded", () => {
  window.hhkbApp = new HHKBApp();
});
