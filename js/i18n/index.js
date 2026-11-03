/**
 * Integrated Internationalization (i18n) Engine for HHKB Web Tool
 * Embedded dictionaries guarantee atomic loading with zero cache de-sync.
 */

const en = {
  app: {
    title: "HHKB Web Keymap Tool",
    subtitle: "Browser-based hardware keymap editor for HHKB Classic & Hybrid series",
    badge: "WebHID Native",
    connectBtn: "Connect HHKB",
    disconnectBtn: "Disconnect",
    deviceNotConnected: "No keyboard connected",
    statusConnecting: "Connecting to keyboard...",
    statusConnected: "Connected: {model} (Firmware: {firmware})",
    statusError: "Connection failed: {error}",
    browserUnsupported: "WebHID is not supported by your browser. Please use Chrome, Edge, or Opera (version 89+).",
  },
  theme: {
    classicWhite: "Classic White",
    charcoal: "Charcoal Dark",
  },
  device: {
    infoTitle: "Device Information",
    model: "Model",
    serial: "Serial Number",
    firmware: "Firmware Version",
    mode: "Keyboard Mode",
    modeHhk: "HHK Mode",
    modeMac: "Mac Mode",
    modeLite: "Lite Mode",
    modeUnknown: "Unknown Mode ({code})",
  },
  layers: {
    standard: "Standard Layer",
    fn: "Fn Layer",
  },
  actions: {
    readKeymap: "Read Keymap",
    writeKeymap: "Flash to Keyboard",
    resetFactory: "Reset to Factory",
    exportJson: "Backup to JSON",
    importJson: "Restore from JSON",
    hasUnsavedPrompt: "You have unwritten keymap changes! Click 'Flash to Keyboard' to persist to hardware.",
    reading: "Reading layout from keyboard...",
    writing: "Flashing keymap to hardware (Do not unplug)...",
    writeSuccess: "Successfully flashed keymap into keyboard onboard Flash!",
    keyModifiedLog: "Modified key #{index}: from [{from}] to [{to}] (0x{code}) [Layer: {layer}]",
    resetConfirm: "Are you sure you want to reset the keyboard to factory defaults? This cannot be undone.",
    resetSuccess: "Keyboard reset to factory defaults successfully.",
  },
  keyboard: {
    selectKeyPrompt: "Click a key on the virtual keyboard to modify its mapping",
    selectedKeyListening: "[Recording Mode] Key #{keyIndex} ({keyLabel}) selected: 👉 Press any physical key on your keyboard, or click a scancode below",
    selectedKeyInfo: "Key #{keyIndex} ({keyLabel}): Current Scancode = 0x{scancode} ({keyName})",
    unsavedChanges: "⚠️ Unsaved changes. Click 'Flash to Keyboard' above to persist to hardware!",
    selectedPrefix: "Target Key",
    currentFunction: "Current Function",
    recorderReady: "● Hardware Capture Active: Press any key on your keyboard",
    quickReplaceLabel: "Quick replace with:",
    quickBackslash: "\\ | Backslash",
    categories: {
      basic: "Letters & Numbers",
      modifiers: "Modifiers",
      navigation: "Navigation & Function",
      media: "Media & Controls",
      special: "Special / None",
    },
  },
  log: {
    title: "Diagnostic Communication Logs",
    clear: "Clear Logs",
  },
  errors: {
    noDeviceSelected: "No USB device was selected in the browser prompt.",
    interfaceNotFound: "HHKB programming interface (Interface 2) not found. Ensure USB-C cable is connected.",
    openFailed: "Failed to open HID interface: {details}",
    timeout: "Communication timed out waiting for keyboard response ({cmd}).",
    protocolMismatch: "Protocol response error: received invalid response header {header} for command {cmd}.",
    flashFailed: "Flashing failed at step {step}: {details}",
  },
};

const zhCN = {
  app: {
    title: "HHKB 网页改键工具",
    subtitle: "基于 WebHID 的 HHKB Classic / Hybrid 系列硬件级免驱改键烧录器",
    badge: "纯前端原生 WebHID",
    connectBtn: "连接 HHKB 键盘",
    disconnectBtn: "断开连接",
    deviceNotConnected: "未连接键盘",
    statusConnecting: "正在连接键盘...",
    statusConnected: "已连接: {model} (固件版本: {firmware})",
    statusError: "连接失败: {error}",
    browserUnsupported: "当前浏览器不支持 WebHID API。请使用 Google Chrome、Microsoft Edge 或 Opera (89+ 版本)。",
  },
  theme: {
    classicWhite: "经典灰白 (Classic)",
    charcoal: "极客墨黑 (Charcoal)",
  },
  device: {
    infoTitle: "硬件信息",
    model: "机型型号",
    serial: "序列号",
    firmware: "固件版本",
    mode: "键盘模式",
    modeHhk: "HHK 模式",
    modeMac: "Mac 模式",
    modeLite: "Lite 模式",
    modeUnknown: "未知模式 ({code})",
  },
  layers: {
    standard: "标准层 (Standard)",
    fn: "Fn 组合层 (Fn Layer)",
  },
  actions: {
    readKeymap: "读取当前键位",
    writeKeymap: "烧录到键盘芯片",
    resetFactory: "恢复出厂设置",
    exportJson: "备份键位到 JSON",
    importJson: "从 JSON 恢复",
    hasUnsavedPrompt: "检测到未保存的键位修改！请点击【烧录到键盘芯片】完成固化。",
    reading: "正在从键盘读取键位数据...",
    writing: "正在向键盘板载芯片烧录键位（请勿拔出数据线）...",
    writeSuccess: "键位映射已成功永久烧录到键盘内部芯片！",
    keyModifiedLog: "已修改按键 #{index}：从 [{from}] 改为 [{to}] (0x{code}) [层: {layer}]",
    resetConfirm: "确定要将键盘恢复至原厂默认配置吗？此操作无法撤销。",
    resetSuccess: "已成功将键盘重置为原厂默认配置。",
  },
  keyboard: {
    selectKeyPrompt: "点击上方虚拟键盘选中要修改的按键",
    selectedKeyListening: "【录制模式】按键 #{keyIndex} ({keyLabel}) 已选中：👉 请直接按下你的物理键盘按键，或点击下方键码库进行修改",
    selectedKeyInfo: "按键 #{keyIndex} ({keyLabel}): 当前键码 = 0x{scancode} ({keyName})",
    unsavedChanges: "⚠️ 有未烧录的修改，请点击右上角【烧录到键盘芯片】完成固化！",
    selectedPrefix: "已选中",
    currentFunction: "当前功能",
    recorderReady: "● 物理键盘录制就绪：直接在键盘上敲按键即可",
    quickReplaceLabel: "一键快速替换为:",
    quickBackslash: "\\ | 反斜杠",
    categories: {
      basic: "常规字母 & 数字",
      modifiers: "修饰键 (Control/Cmd/Opt)",
      navigation: "导航 & 功能键 (F1-F12)",
      media: "多媒体控制",
      special: "特殊功能 / 禁用",
    },
  },
  log: {
    title: "底层通信与诊断日志",
    clear: "清空日志",
  },
  errors: {
    noDeviceSelected: "未在浏览器弹窗中选择任何 USB 设备。",
    interfaceNotFound: "未检测到 HHKB 固件编程接口 (Interface 2)。请确认使用 USB-C 有线直连（非蓝牙）。",
    openFailed: "打开 HID 设备接口失败: {details}",
    timeout: "等待键盘响应通信超时 (命令: {cmd})。",
    protocolMismatch: "协议数据校验失败: 期望命令 {cmd} 的应答，实际收到错误报头 {header}。",
    flashFailed: "烧录在第 {step} 阶段失败: {details}",
  },
};

class I18nManager {
  constructor() {
    this.locales = {
      en,
      "zh-CN": zhCN,
    };
    this.currentLocale = this.detectInitialLocale();
    this.listeners = new Set();
  }

  detectInitialLocale() {
    const saved = localStorage.getItem("hhkb_web_locale");
    if (saved && this.locales[saved]) {
      return saved;
    }
    const navLang = navigator.language || navigator.userLanguage || "en";
    if (navLang.startsWith("zh")) {
      return "zh-CN";
    }
    return "en";
  }

  registerLocale(name, strings) {
    this.locales[name] = strings;
  }

  setLocale(locale) {
    if (!this.locales[locale]) {
      throw new Error(`Unsupported locale: "${locale}". Available locales: ${Object.keys(this.locales).join(", ")}`);
    }
    this.currentLocale = locale;
    localStorage.setItem("hhkb_web_locale", locale);
    this.notify();
  }

  getLocale() {
    return this.currentLocale;
  }

  t(path, params = {}) {
    const keys = path.split(".");
    let current = this.locales[this.currentLocale];

    // Try current locale
    let value = null;
    if (current) {
      value = this._resolve(current, keys);
    }

    // Fallback to English
    if (value === null && this.currentLocale !== "en") {
      value = this._resolve(this.locales.en, keys);
    }

    // Fallback to Chinese if still not found
    if (value === null && this.currentLocale !== "zh-CN") {
      value = this._resolve(this.locales["zh-CN"], keys);
    }

    // If completely absent, never display raw dot paths on the UI
    if (value === null || typeof value !== "string") {
      const lastKey = keys[keys.length - 1];
      // Format camelCase to readable title
      return lastKey.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    }

    let result = value;
    for (const [k, v] of Object.entries(params)) {
      result = result.replaceAll(`{${k}}`, String(v));
    }
    return result;
  }

  _resolve(obj, keys) {
    let curr = obj;
    for (const k of keys) {
      if (curr && typeof curr === "object" && k in curr) {
        curr = curr[k];
      } else {
        return null;
      }
    }
    return typeof curr === "string" ? curr : null;
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.currentLocale);
    }
    this.updateDomElements();
  }

  updateDomElements() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) {
        el.textContent = this.t(key);
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) {
        el.setAttribute("placeholder", this.t(key));
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key) {
        el.setAttribute("title", this.t(key));
      }
    });
  }
}

export const i18n = new I18nManager();
