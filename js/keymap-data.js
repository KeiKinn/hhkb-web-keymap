/**
 * HHKB ANSI 60-Key Layout Matrix & HID Scancode Definitions
 */

// USB HID Usage IDs (Scan codes)
export const HID_KEYCODES = [
  // Basic Letters
  { code: 0x04, name: "A", category: "basic" },
  { code: 0x05, name: "B", category: "basic" },
  { code: 0x06, name: "C", category: "basic" },
  { code: 0x07, name: "D", category: "basic" },
  { code: 0x08, name: "E", category: "basic" },
  { code: 0x09, name: "F", category: "basic" },
  { code: 0x0a, name: "G", category: "basic" },
  { code: 0x0b, name: "H", category: "basic" },
  { code: 0x0c, name: "I", category: "basic" },
  { code: 0x0d, name: "J", category: "basic" },
  { code: 0x0e, name: "K", category: "basic" },
  { code: 0x0f, name: "L", category: "basic" },
  { code: 0x10, name: "M", category: "basic" },
  { code: 0x11, name: "N", category: "basic" },
  { code: 0x12, name: "O", category: "basic" },
  { code: 0x13, name: "P", category: "basic" },
  { code: 0x14, name: "Q", category: "basic" },
  { code: 0x15, name: "R", category: "basic" },
  { code: 0x16, name: "S", category: "basic" },
  { code: 0x17, name: "T", category: "basic" },
  { code: 0x18, name: "U", category: "basic" },
  { code: 0x19, name: "V", category: "basic" },
  { code: 0x1a, name: "W", category: "basic" },
  { code: 0x1b, name: "X", category: "basic" },
  { code: 0x1c, name: "Y", category: "basic" },
  { code: 0x1d, name: "Z", category: "basic" },

  // Numbers & Symbols
  { code: 0x1e, name: "1 !", category: "basic" },
  { code: 0x1f, name: "2 @", category: "basic" },
  { code: 0x20, name: "3 #", category: "basic" },
  { code: 0x21, name: "4 $", category: "basic" },
  { code: 0x22, name: "5 %", category: "basic" },
  { code: 0x23, name: "6 ^", category: "basic" },
  { code: 0x24, name: "7 &", category: "basic" },
  { code: 0x25, name: "8 *", category: "basic" },
  { code: 0x26, name: "9 (", category: "basic" },
  { code: 0x27, name: "0 )", category: "basic" },
  { code: 0x2d, name: "- _", category: "basic" },
  { code: 0x2e, name: "= +", category: "basic" },
  { code: 0x2f, name: "[ {", category: "basic" },
  { code: 0x30, name: "] }", category: "basic" },
  { code: 0x31, name: "\\ |", category: "basic" },
  { code: 0x33, name: "; :", category: "basic" },
  { code: 0x34, name: "' \"", category: "basic" },
  { code: 0x35, name: "` ~", category: "basic" },
  { code: 0x36, name: ", <", category: "basic" },
  { code: 0x37, name: ". >", category: "basic" },
  { code: 0x38, name: "/ ?", category: "basic" },

  // Control Keys
  { code: 0x28, name: "Return", category: "modifiers" },
  { code: 0x29, name: "Esc", category: "modifiers" },
  { code: 0x2a, name: "Backspace", category: "modifiers" },
  { code: 0x2b, name: "Tab", category: "modifiers" },
  { code: 0x2c, name: "Space", category: "modifiers" },
  { code: 0x39, name: "Caps Lock", category: "modifiers" },

  // Modifiers
  { code: 0xe0, name: "Left Ctrl", category: "modifiers" },
  { code: 0xe1, name: "Left Shift", category: "modifiers" },
  { code: 0xe2, name: "Left Alt / Opt", category: "modifiers" },
  { code: 0xe3, name: "Left GUI / Cmd", category: "modifiers" },
  { code: 0xe4, name: "Right Ctrl", category: "modifiers" },
  { code: 0xe5, name: "Right Shift", category: "modifiers" },
  { code: 0xe6, name: "Right Alt / Opt", category: "modifiers" },
  { code: 0xe7, name: "Right GUI / Cmd", category: "modifiers" },

  // Navigation & Editing
  { code: 0x49, name: "Insert", category: "navigation" },
  { code: 0x4a, name: "Home", category: "navigation" },
  { code: 0x4b, name: "Page Up", category: "navigation" },
  { code: 0x4c, name: "Delete", category: "navigation" },
  { code: 0x4d, name: "End", category: "navigation" },
  { code: 0x4e, name: "Page Down", category: "navigation" },
  { code: 0x4f, name: "Right Arrow", category: "navigation" },
  { code: 0x50, name: "Left Arrow", category: "navigation" },
  { code: 0x51, name: "Down Arrow", category: "navigation" },
  { code: 0x52, name: "Up Arrow", category: "navigation" },

  // Function Keys F1 - F12
  { code: 0x3a, name: "F1", category: "navigation" },
  { code: 0x3b, name: "F2", category: "navigation" },
  { code: 0x3c, name: "F3", category: "navigation" },
  { code: 0x3d, name: "F4", category: "navigation" },
  { code: 0x3e, name: "F5", category: "navigation" },
  { code: 0x3f, name: "F6", category: "navigation" },
  { code: 0x40, name: "F7", category: "navigation" },
  { code: 0x41, name: "F8", category: "navigation" },
  { code: 0x42, name: "F9", category: "navigation" },
  { code: 0x43, name: "F10", category: "navigation" },
  { code: 0x44, name: "F11", category: "navigation" },
  { code: 0x45, name: "F12", category: "navigation" },

  // Media & Controls
  { code: 0x7f, name: "Mute", category: "media" },
  { code: 0x80, name: "Volume Up", category: "media" },
  { code: 0x81, name: "Volume Down", category: "media" },
  { code: 0x46, name: "Print Screen", category: "media" },
  { code: 0x47, name: "Scroll Lock", category: "media" },
  { code: 0x48, name: "Pause / Break", category: "media" },

  // Special
  { code: 0x00, name: "None / Disabled", category: "special" },
];

export const KEYCODE_MAP = new Map(HID_KEYCODES.map((k) => [k.code, k]));

export function getKeyName(code) {
  if (KEYCODE_MAP.has(code)) {
    return KEYCODE_MAP.get(code).name;
  }
  return `0x${code.toString(16).padStart(2, "0").toUpperCase()}`;
}

/**
 * Maps browser KeyboardEvent.code to USB HID scan code
 */
export const DOM_CODE_TO_HID = {
  KeyA: 0x04, KeyB: 0x05, KeyC: 0x06, KeyD: 0x07, KeyE: 0x08,
  KeyF: 0x09, KeyG: 0x0a, KeyH: 0x0b, KeyI: 0x0c, KeyJ: 0x0d,
  KeyK: 0x0e, KeyL: 0x0f, KeyM: 0x10, KeyN: 0x11, KeyO: 0x12,
  KeyP: 0x13, KeyQ: 0x14, KeyR: 0x15, KeyS: 0x16, KeyT: 0x17,
  KeyU: 0x18, KeyV: 0x19, KeyW: 0x1a, KeyX: 0x1b, KeyY: 0x1c,
  KeyZ: 0x1d,
  Digit1: 0x1e, Digit2: 0x1f, Digit3: 0x20, Digit4: 0x21, Digit5: 0x22,
  Digit6: 0x23, Digit7: 0x24, Digit8: 0x25, Digit9: 0x26, Digit0: 0x27,
  Enter: 0x28, NumpadEnter: 0x28,
  Escape: 0x29,
  Backspace: 0x2a,
  Tab: 0x2b,
  Space: 0x2c,
  Minus: 0x2d,
  Equal: 0x2e,
  BracketLeft: 0x2f,
  BracketRight: 0x30,
  Backslash: 0x31,
  Semicolon: 0x33,
  Quote: 0x34,
  Backquote: 0x35,
  Comma: 0x36,
  Period: 0x37,
  Slash: 0x38,
  CapsLock: 0x39,
  F1: 0x3a, F2: 0x3b, F3: 0x3c, F4: 0x3d, F5: 0x3e, F6: 0x3f,
  F7: 0x40, F8: 0x41, F9: 0x42, F10: 0x43, F11: 0x44, F12: 0x45,
  PrintScreen: 0x46, ScrollLock: 0x47, Pause: 0x48,
  Insert: 0x49, Home: 0x4a, PageUp: 0x4b,
  Delete: 0x4c, End: 0x4d, PageDown: 0x4e,
  ArrowRight: 0x4f, ArrowLeft: 0x50, ArrowDown: 0x51, ArrowUp: 0x52,
  ControlLeft: 0xe0, ShiftLeft: 0xe1, AltLeft: 0xe2, MetaLeft: 0xe3,
  ControlRight: 0xe4, ShiftRight: 0xe5, AltRight: 0xe6, MetaRight: 0xe7,
};

/**
 * HHKB ANSI 60-key matrix layout.
 * Each item contains:
 * - index: HHKB internal matrix index (1..60)
 * - defaultLabel: Default keycap text
 * - width: Key width in units (1 = 1u, 1.5 = 1.5u, etc.)
 * - row: 1 to 5
 */
export const HHKB_ANSI_LAYOUT = [
  // Row 1 (15 keys)
  { index: 60, defaultLabel: "Esc", width: 1, row: 1, isModifier: true },
  { index: 59, defaultLabel: "1", width: 1, row: 1, isModifier: false },
  { index: 58, defaultLabel: "2", width: 1, row: 1, isModifier: false },
  { index: 57, defaultLabel: "3", width: 1, row: 1, isModifier: false },
  { index: 56, defaultLabel: "4", width: 1, row: 1, isModifier: false },
  { index: 55, defaultLabel: "5", width: 1, row: 1, isModifier: false },
  { index: 54, defaultLabel: "6", width: 1, row: 1, isModifier: false },
  { index: 53, defaultLabel: "7", width: 1, row: 1, isModifier: false },
  { index: 52, defaultLabel: "8", width: 1, row: 1, isModifier: false },
  { index: 51, defaultLabel: "9", width: 1, row: 1, isModifier: false },
  { index: 50, defaultLabel: "0", width: 1, row: 1, isModifier: false },
  { index: 49, defaultLabel: "-", width: 1, row: 1, isModifier: false },
  { index: 48, defaultLabel: "=", width: 1, row: 1, isModifier: false },
  { index: 47, defaultLabel: "\\", width: 1, row: 1, isModifier: false },
  { index: 46, defaultLabel: "`", width: 1, row: 1, isModifier: false },

  // Row 2 (14 keys)
  { index: 45, defaultLabel: "Tab", width: 1.5, row: 2, isModifier: true },
  { index: 44, defaultLabel: "Q", width: 1, row: 2, isModifier: false },
  { index: 43, defaultLabel: "W", width: 1, row: 2, isModifier: false },
  { index: 42, defaultLabel: "E", width: 1, row: 2, isModifier: false },
  { index: 41, defaultLabel: "R", width: 1, row: 2, isModifier: false },
  { index: 40, defaultLabel: "T", width: 1, row: 2, isModifier: false },
  { index: 39, defaultLabel: "Y", width: 1, row: 2, isModifier: false },
  { index: 38, defaultLabel: "U", width: 1, row: 2, isModifier: false },
  { index: 37, defaultLabel: "I", width: 1, row: 2, isModifier: false },
  { index: 36, defaultLabel: "O", width: 1, row: 2, isModifier: false },
  { index: 35, defaultLabel: "P", width: 1, row: 2, isModifier: false },
  { index: 34, defaultLabel: "[", width: 1, row: 2, isModifier: false },
  { index: 33, defaultLabel: "]", width: 1, row: 2, isModifier: false },
  { index: 32, defaultLabel: "Delete", width: 1.5, row: 2, isModifier: true },

  // Row 3 (13 keys)
  { index: 31, defaultLabel: "Control", width: 1.75, row: 3, isModifier: true },
  { index: 30, defaultLabel: "A", width: 1, row: 3, isModifier: false },
  { index: 29, defaultLabel: "S", width: 1, row: 3, isModifier: false },
  { index: 28, defaultLabel: "D", width: 1, row: 3, isModifier: false },
  { index: 27, defaultLabel: "F", width: 1, row: 3, isModifier: false },
  { index: 26, defaultLabel: "G", width: 1, row: 3, isModifier: false },
  { index: 25, defaultLabel: "H", width: 1, row: 3, isModifier: false },
  { index: 24, defaultLabel: "J", width: 1, row: 3, isModifier: false },
  { index: 23, defaultLabel: "K", width: 1, row: 3, isModifier: false },
  { index: 22, defaultLabel: "L", width: 1, row: 3, isModifier: false },
  { index: 21, defaultLabel: ";", width: 1, row: 3, isModifier: false },
  { index: 20, defaultLabel: "'", width: 1, row: 3, isModifier: false },
  { index: 19, defaultLabel: "Return", width: 2.25, row: 3, isModifier: true },

  // Row 4 (13 keys)
  { index: 18, defaultLabel: "Shift", width: 2.25, row: 4, isModifier: true },
  { index: 17, defaultLabel: "Z", width: 1, row: 4, isModifier: false },
  { index: 16, defaultLabel: "X", width: 1, row: 4, isModifier: false },
  { index: 15, defaultLabel: "C", width: 1, row: 4, isModifier: false },
  { index: 14, defaultLabel: "V", width: 1, row: 4, isModifier: false },
  { index: 13, defaultLabel: "B", width: 1, row: 4, isModifier: false },
  { index: 12, defaultLabel: "N", width: 1, row: 4, isModifier: false },
  { index: 11, defaultLabel: "M", width: 1, row: 4, isModifier: false },
  { index: 10, defaultLabel: ",", width: 1, row: 4, isModifier: false },
  { index: 9, defaultLabel: ".", width: 1, row: 4, isModifier: false },
  { index: 8, defaultLabel: "/", width: 1, row: 4, isModifier: false },
  { index: 7, defaultLabel: "Shift", width: 1.75, row: 4, isModifier: true },
  { index: 6, defaultLabel: "Fn", width: 1, row: 4, isModifier: true },

  // Row 5 (Bottom Row: 5 keys with HHKB blockers)
  { index: 5, defaultLabel: "Opt", width: 1, row: 5, spacerBefore: 1.5, isModifier: true },
  { index: 4, defaultLabel: "Cmd", width: 1.5, row: 5, isModifier: true },
  { index: 3, defaultLabel: "Space", width: 6, row: 5, isModifier: false },
  { index: 2, defaultLabel: "Cmd", width: 1.5, row: 5, isModifier: true },
  { index: 1, defaultLabel: "Opt", width: 1, row: 5, spacerAfter: 1.5, isModifier: true },
];
