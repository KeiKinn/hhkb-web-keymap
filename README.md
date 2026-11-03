# HHKB Web Keymap Tool ⌨️

> A zero-install, browser-based hardware keymap editor for **HHKB Professional Classic** and **Hybrid** series, built natively on the **WebHID API**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: WebHID](https://img.shields.io/badge/Platform-WebHID-brightgreen.svg)](#browser-compatibility)
[![Supported: HHKB Classic & Hybrid](https://img.shields.io/badge/HHKB-Classic%20%2F%20Hybrid-orange.svg)](#hardware-support)

---

## 🌟 Overview

The official PFU Keymap Tool enforces artificial client-side model restrictions that prevent the **HHKB Professional Classic** (wired) from modifying onboard keymaps, despite its microcontroller and Flash memory fully supporting hardware remapping. Furthermore, the legacy software suffers from compatibility issues across modern operating systems (such as Apple Silicon / ARM64 macOS without Rosetta 2).

**HHKB Web Keymap Tool** communicates directly with your keyboard's internal firmware configuration interface over standard USB HID protocols. It allows you to read, modify, and permanently flash key mappings directly from your browser—with no local drivers, no background daemons, and zero OS restrictions.

---

## 🚀 Key Features

* **Hardware-Level Remapping**: Keymaps are burned directly into the HHKB's onboard Flash memory. Once saved, changes persist permanently across all devices (Mac, Windows, Linux, iPad, iOS, Android).
* **Bypasses Classic Restrictions**: Directly talks to the HHKB configuration interface (`Interface 2`), unlocking native remap capabilities for the HHKB Classic.
* **Pure WebHID Native**: Works directly in the browser via `navigator.hid`. Zero compilation, zero driver installation.
* **Full Layer Customization**: Full visual support for editing both the **Standard Layer** and **Fn Layer**.
* **Clean Error Propagation**: Strict protocol error handling and diagnostic reporting. No swallowed exceptions; real hardware feedback is always surfaced.
* **i18n Ready**: Full English and Simplified Chinese (`zh-CN`) support out of the box, with extensible locale architecture.
* **Backup & Restore**: Export and import your layouts via single-click JSON files.
* **100% Static Deployment**: Zero server-side code. Ready for instant deployment to **GitHub Pages** or **Cloudflare Pages / Workers**.

---

## 💻 Hardware Support

| Model | Type | Supported? | Notes |
| :--- | :--- | :---: | :--- |
| **HHKB Professional Classic** | USB-C Wired | **Yes** | Fully unlocked! |
| **HHKB Professional HYBRID** | Bluetooth / USB-C | **Yes** | Must be connected via USB-C cable |
| **HHKB Professional HYBRID Type-S** | Bluetooth / USB-C | **Yes** | Must be connected via USB-C cable |

> [!IMPORTANT]
> **A wired USB-C connection is strictly required.** The keyboard's programming interface (`Interface 2`) is only exposed over USB, not over Bluetooth.

---

## 🌐 Browser Compatibility

This tool relies on the **WebHID API**, which is supported in all modern Chromium-based browsers:

* Google Chrome (v89+)
* Microsoft Edge (v89+)
* Opera (v75+)
* Brave, Vivaldi, Arc

*(Note: Safari and Firefox do not currently support the WebHID standard).*

---

## 🛠️ Local Development & Testing

Since this project consists of pure static web assets, running it locally requires no build steps or package managers.

### 1. Run local HTTP server
Using Python 3 (built into macOS / Linux):
```bash
python3 -m http.server 8080
```
Open your browser and navigate to `http://localhost:8080`.

### 2. Run protocol test suite
```bash
python3 tests/test_protocol.py
```

---

## 📦 Deployment Guide

### Option A: GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` (or `master`) branch and `/ (root)` folder, then click **Save**.
5. Your web keymap tool will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your GitHub repository.
3. In **Build settings**:
   * **Framework preset**: None
   * **Build command**: (Leave empty)
   * **Build output directory**: `/` (Root directory)
4. Click **Save and Deploy**. Cloudflare will instantly host the app globally with free SSL and edge caching.

---

## 📖 Architecture & Extensibility

```
hhkb/
├── index.html            # Main semantic HTML entry
├── css/
│   └── style.css         # Modern dark-mode aesthetic theme
├── js/
│   ├── protocol.js       # Low-level HID packet framing, serialization & state machine
│   ├── keymap-data.js    # HHKB ANSI 60-key matrix definition & USB HID keycode tables
│   ├── app.js            # UI state management & event orchestration
│   └── i18n/             # Modular internationalization
│       ├── en.js         # English translation dictionary
│       ├── zh-CN.js      # Simplified Chinese translation dictionary
│       └── index.js      # I18n single-instance manager
├── tests/
│   └── test_protocol.py  # Unit tests for protocol framing and buffer slicing
├── .gitignore
├── LICENSE               # MIT License
└── README.md
```

### Adding a New Language (i18n)
To add a new language (e.g. Japanese `ja`):
1. Create `js/i18n/ja.js` by copying `en.js` and translating the values.
2. In `js/i18n/index.js`, import `ja` and register it in `this.locales`:
   ```javascript
   import ja from "./ja.js";
   this.locales["ja"] = ja;
   ```
3. Add the `<option value="ja">日本語</option>` to the `<select id="lang-select">` dropdown in `index.html`.

---

## 🔒 Safety & Protocol Notes

* **Non-destructive writes**: Remapping writes only to the user-configurable keymap table partition inside the keyboard's Flash memory. It does not overwrite bootloader or core firmware code.
* **Factory Reset Support**: In the event of an unintended mapping, the **"Reset to Factory"** button issues the hardware `RESET_FACTORY_DEFAULTS` opcode, restoring factory configuration.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
