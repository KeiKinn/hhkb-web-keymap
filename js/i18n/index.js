import en from "./en.js";
import zhCN from "./zh-CN.js";

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
    let current = this.locales[this.currentLocale] || this.locales.en;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        current = this.getFallback(path);
        break;
      }
    }

    if (typeof current !== "string") {
      return path;
    }

    let result = current;
    for (const [k, v] of Object.entries(params)) {
      result = result.replaceAll(`{${k}}`, String(v));
    }
    return result;
  }

  getFallback(path) {
    const keys = path.split(".");
    let current = this.locales.en;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }
    return typeof current === "string" ? current : path;
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
