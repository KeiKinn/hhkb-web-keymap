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
 * HHKB ANSI 60-key matrix layout.
 * Each item contains:
 * - index: HHKB internal matrix index (1..60)
 * - defaultLabel: Default keycap text
 * - width: Key width in units (1 = 1u, 1.5 = 1.5u, etc.)
 * - row: 1 to 5
 */
export const HHKB_ANSI_LAYOUT = [
  // Row 1 (15 keys)
  { index: 60, defaultLabel: "Esc", width: 1, row: 1 },
  { index: 59, defaultLabel: "1", width: 1, row: 1 },
  { index: 58, defaultLabel: "2", width: 1, row: 1 },
  { index: 57, defaultLabel: "3", width: 1, row: 1 },
  { index: 56, defaultLabel: "4", width: 1, row: 1 },
  { index: 55, defaultLabel: "5", width: 1, row: 1 },
  { index: 54, defaultLabel: "6", width: 1, row: 1 },
  { index: 53, defaultLabel: "7", width: 1, row: 1 },
  { index: 52, defaultLabel: "8", width: 1, row: 1 },
  { index: 51, defaultLabel: "9", width: 1, row: 1 },
  { index: 50, defaultLabel: "0", width: 1, row: 1 },
  { index: 49, defaultLabel: "-", width: 1, row: 1 },
  { index: 48, defaultLabel: "=", width: 1, row: 1 },
  { index: 47, defaultLabel: "\\", width: 1, row: 1 },
  { index: 46, defaultLabel: "`", width: 1, row: 1 },

  // Row 2 (14 keys)
  { index: 45, defaultLabel: "Tab", width: 1.5, row: 2 },
  { index: 44, defaultLabel: "Q", width: 1, row: 2 },
  { index: 43, defaultLabel: "W", width: 1, row: 2 },
  { index: 42, defaultLabel: "E", width: 1, row: 2 },
  { index: 41, defaultLabel: "R", width: 1, row: 2 },
  { index: 40, defaultLabel: "T", width: 1, row: 2 },
  { index: 39, defaultLabel: "Y", width: 1, row: 2 },
  { index: 38, defaultLabel: "U", width: 1, row: 2 },
  { index: 37, defaultLabel: "I", width: 1, row: 2 },
  { index: 36, defaultLabel: "O", width: 1, row: 2 },
  { index: 35, defaultLabel: "P", width: 1, row: 2 },
  { index: 34, defaultLabel: "[", width: 1, row: 2 },
  { index: 33, defaultLabel: "]", width: 1, row: 2 },
  { index: 32, defaultLabel: "Delete", width: 1.5, row: 2 },

  // Row 3 (13 keys)
  { index: 31, defaultLabel: "Control", width: 1.75, row: 3 },
  { index: 30, defaultLabel: "A", width: 1, row: 3 },
  { index: 29, defaultLabel: "S", width: 1, row: 3 },
  { index: 28, defaultLabel: "D", width: 1, row: 3 },
  { index: 27, defaultLabel: "F", width: 1, row: 3 },
  { index: 26, defaultLabel: "G", width: 1, row: 3 },
  { index: 25, defaultLabel: "H", width: 1, row: 3 },
  { index: 24, defaultLabel: "J", width: 1, row: 3 },
  { index: 23, defaultLabel: "K", width: 1, row: 3 },
  { index: 22, defaultLabel: "L", width: 1, row: 3 },
  { index: 21, defaultLabel: ";", width: 1, row: 3 },
  { index: 20, defaultLabel: "'", width: 1, row: 3 },
  { index: 19, defaultLabel: "Return", width: 2.25, row: 3 },

  // Row 4 (13 keys)
  { index: 18, defaultLabel: "Shift", width: 2.25, row: 4 },
  { index: 17, defaultLabel: "Z", width: 1, row: 4 },
  { index: 16, defaultLabel: "X", width: 1, row: 4 },
  { index: 15, defaultLabel: "C", width: 1, row: 4 },
  { index: 14, defaultLabel: "V", width: 1, row: 4 },
  { index: 13, defaultLabel: "B", width: 1, row: 4 },
  { index: 12, defaultLabel: "N", width: 1, row: 4 },
  { index: 11, defaultLabel: "M", width: 1, row: 4 },
  { index: 10, defaultLabel: ",", width: 1, row: 4 },
  { index: 9, defaultLabel: ".", width: 1, row: 4 },
  { index: 8, defaultLabel: "/", width: 1, row: 4 },
  { index: 7, defaultLabel: "Shift", width: 1.75, row: 4 },
  { index: 6, defaultLabel: "Fn", width: 1, row: 4 },

  // Row 5 (Bottom Row: 5 keys with HHKB blockers)
  { index: 5, defaultLabel: "Opt", width: 1, row: 5, spacerBefore: 1.5 },
  { index: 4, defaultLabel: "Cmd", width: 1.5, row: 5 },
  { index: 3, defaultLabel: "Space", width: 6, row: 5 },
  { index: 2, defaultLabel: "Cmd", width: 1.5, row: 5 },
  { index: 1, defaultLabel: "Opt", width: 1, row: 5, spacerAfter: 1.5 },
];
