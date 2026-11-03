#!/usr/bin/env python3
"""
Unit tests for HHKB Protocol Packet Serialization & Layout Slicing.
Validates compatibility with PFU hardware specifications.
"""

import unittest

PFU_VENDOR_ID = 0x04fe
COMMAND_WRITE_KEYMAP = 134
COMMAND_GET_KEYMAP = 135

def create_base_packet(cmd):
    p = bytearray(64)
    p[0] = 0xaa
    p[1] = 0xaa
    p[2] = cmd
    return p

def create_write_keymap_packets(layout, mode, is_fn):
    assert len(layout) == 128
    
    # Pass 1
    p1 = create_base_packet(COMMAND_WRITE_KEYMAP)
    p1[3] = 65
    p1[4] = 59
    p1[5] = mode
    p1[6] = 1 if is_fn else 0
    p1[7:7+57] = layout[0:57]
    
    # Pass 2
    p2 = create_base_packet(COMMAND_WRITE_KEYMAP)
    p2[3] = 130
    p2[4] = 59
    p2[5:5+59] = layout[57:116]
    
    # Pass 3
    p3 = create_base_packet(COMMAND_WRITE_KEYMAP)
    p3[3] = 195
    p3[4] = 12
    p3[5:5+12] = layout[116:128]
    
    return p1, p2, p3

def assemble_read_keymap(pass1, pass2, pass3):
    layout = bytearray(128)
    layout[0:58] = pass1[5:5+58]
    layout[58:116] = pass2[5:5+58]
    layout[116:128] = pass3[5:5+12]
    return layout

class TestHHKBProtocol(unittest.TestCase):
    def test_write_packets_coverage(self):
        # Generate dummy layout: 0 to 127
        test_layout = bytes(range(128))
        p1, p2, p3 = create_write_keymap_packets(test_layout, mode=1, is_fn=False)
        
        # Verify p1 header & slice
        self.assertEqual(p1[0], 0xaa)
        self.assertEqual(p1[1], 0xaa)
        self.assertEqual(p1[2], COMMAND_WRITE_KEYMAP)
        self.assertEqual(p1[3], 65)
        self.assertEqual(p1[4], 59)
        self.assertEqual(p1[5], 1)
        self.assertEqual(p1[6], 0)
        self.assertEqual(bytes(p1[7:7+57]), test_layout[0:57])
        
        # Verify p2 header & slice
        self.assertEqual(p2[0], 0xaa)
        self.assertEqual(p2[1], 0xaa)
        self.assertEqual(p2[2], COMMAND_WRITE_KEYMAP)
        self.assertEqual(p2[3], 130)
        self.assertEqual(p2[4], 59)
        self.assertEqual(bytes(p2[5:5+59]), test_layout[57:116])
        
        # Verify p3 header & slice
        self.assertEqual(p3[0], 0xaa)
        self.assertEqual(p3[1], 0xaa)
        self.assertEqual(p3[2], COMMAND_WRITE_KEYMAP)
        self.assertEqual(p3[3], 195)
        self.assertEqual(p3[4], 12)
        self.assertEqual(bytes(p3[5:5+12]), test_layout[116:128])

        # Verify all 128 bytes are cleanly transmitted without gap or overlap
        total_covered = len(p1[7:7+57]) + len(p2[5:5+59]) + len(p3[5:5+12])
        self.assertEqual(total_covered, 128)

    def test_read_layout_assembly(self):
        # Simulate hardware responses
        expected = bytes([(i * 3) % 256 for i in range(128)])
        
        resp1 = bytearray(64)
        resp1[0:5] = b"\x55\x55\x87\x00\x00"
        resp1[5:5+58] = expected[0:58]
        
        resp2 = bytearray(64)
        resp2[0:5] = b"\x55\x55\x87\x00\x00"
        resp2[5:5+58] = expected[58:116]
        
        resp3 = bytearray(64)
        resp3[0:5] = b"\x55\x55\x87\x00\x00"
        resp3[5:5+12] = expected[116:128]
        
        assembled = assemble_read_keymap(resp1, resp2, resp3)
        self.assertEqual(assembled, expected)

if __name__ == "__main__":
    unittest.main()
