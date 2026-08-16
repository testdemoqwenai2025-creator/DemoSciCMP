#!/usr/bin/env python3
"""
Interactive Elements Test Script
================================

Tests that all UI elements in the codebase have proper event handlers.
This prevents the "static display" issue we encountered.

Run: python3 scripts/test-interactive-elements.py
"""

import re
from pathlib import Path
from typing import List, Tuple, Dict

SRC_DIR = Path("/home/z/my-project/src")

class InteractiveElementTester:
    """
    Tests for proper interactivity in React components:
    1. All <button> tags must have onClick or be disabled
    2. All <Button> components must have onClick (unless submit type)
    3. Cards with hover effects should be clickable
    4. Navigation links should work
    5. No orphaned cursor-pointer classes
    """
    
    def __init__(self):
        self.passed = []
        self.failed = []
        self.warnings = []
        
    def test_file(self, filepath: Path) -> Tuple[int, int, int]:
        """Test a single file. Returns (passed, failed, warnings)"""
        content = filepath.read_text(encoding='utf-8')
        lines = content.split('\n')
        rel_path = str(filepath.relative_to(SRC_DIR))
        
        p, f, w = 0, 0, 0
        
        # Test 1: Check buttons have onClick
        button_pattern = re.compile(r'<button[^>]*>')
        for match in button_pattern.finditer(content):
            btn_tag = match.group()
            line_num = content[:match.start()].count('\n') + 1
            
            # Skip if disabled
            if 'disabled' in btn_tag:
                continue
                
            # Check if onClick is on same line or next few lines
            start_line = line_num - 1
            end_line = min(line_num + 3, len(lines))
            context = '\n'.join(lines[start_line:end_line])
            
            if 'onClick' not in context:
                self.failed.append(f"{rel_path}:{line_num} - Button without onClick: {btn_tag[:50]}...")
                f += 1
            else:
                self.passed.append(f"{rel_path}:{line_num} - Button has onClick")
                p += 1
        
        # Test 2: Check Button components have onClick
        button_comp_pattern = re.compile(r'<Button[^>]*>(?!</Button>)')
        for match in button_comp_pattern.finditer(content):
            btn_tag = match.group()
            line_num = content[:match.start()].count('\n') + 1
            
            # Skip certain types
            if any(x in btn_tag for x in ['type="submit"', 'disabled', 'variant="link"']):
                if 'href' not in btn_tag and 'onClick' not in btn_tag:
                    # Links are OK, others need handlers
                    pass
                else:
                    continue
                    
            start_line = line_num - 1
            end_line = min(line_num + 5, len(lines))
            context = '\n'.join(lines[start_line:end_line])
            
            if 'onClick' not in context:
                self.warnings.append(f"{rel_path}:{line_num} - <Button> may be missing onClick")
                w += 1
            else:
                p += 1
        
        # Test 3: Check cursor-pointer has onClick nearby
        for line_num, line in enumerate(lines, 1):
            if 'cursor-pointer' in line and 'onClick' not in line:
                # Look in surrounding context
                start = max(0, line_num - 2)
                end = min(len(lines), line_num + 3)
                context = '\n'.join(lines[start:end])
                
                if 'onClick' not in context:
                    self.warnings.append(f"{rel_path}:{line_num} - cursor-pointer without onClick nearby")
                    w += 1
        
        # Test 4: Check for static cards that look interactive
        card_patterns = [
            r'group.*hover:.*transition',
            r'rounded-xl.*border.*hover:',
            r'className="[^"]*group[^"]*hover:'
        ]
        
        for pattern in card_patterns:
            for match in re.finditer(pattern, content, re.MULTILINE):
                start_pos = max(0, match.start() - 100)
                end_pos = min(len(content), match.end() + 200)
                context = content[start_pos:end_pos]
                line_num = content[:match.start()].count('\n') + 1
                
                # If it looks like an interactive card but no onClick
                if 'hover:' in context and 'onClick' not in context and '<div' in context[:50]:
                    # Only warn once per occurrence
                    rel_context = f"{rel_path}:{line_num}"
                    if not any(rel_context in item for item in self.warnings):
                        self.warnings.append(f"{rel_path}:{line_num} - Interactive-looking card without onClick")
                        w += 1
        
        return p, f, w
    
    def test_template_gallery_specific(self, filepath: Path) -> Tuple[int, int]:
        """Specific tests for TemplateGalleryPage"""
        content = filepath.read_text(encoding='utf-8')
        rel_path = str(filepath.relative_to(SRC_DIR))
        
        p, f = 0, 0
        
        required_items = {
            "templates": [
                "blast-sequence-analysis",
                "molecular-docking-workflow", 
                "transformer-training-pipeline",
                "statistical-analysis-suite",
                "visualization-templates",
                "create-template-guide"
            ],
            "sections": [
                ("Core Capabilities", "coreCapabilities"),
                ("Use Cases", "useCases"),
                ("Free Tier Resources", "freeTierResources"),
                ("One-Click Setup", "oneClickSetup"),
                ("Parameter Presets", "parameter-presets"),
                ("Best Practices Embedded", "best-practices"),
            ],
            "functions": [
                "navigateToTemplate",
                "navigateToSection",
                "toggleCapability",
                "parseHashRoute"
            ]
        }
        
        # Check templates exist
        print(f"\n📋 Checking template data completeness:")
        for template_id in required_items["templates"]:
            if template_id in content:
                print(f"  ✅ Found: {template_id}")
                p += 1
            else:
                print(f"  ❌ Missing: {template_id}")
                self.failed.append(f"{rel_path} - Missing template: {template_id}")
                f += 1
        
        # Check sections exist
        print(f"\n📋 Checking sections implemented:")
        for section_name, var_name in required_items["sections"]:
            if section_name in content or var_name in content:
                print(f"  ✅ Found: {section_name}")
                p += 1
            else:
                print(f"  ❌ Missing: {section_name}")
                self.failed.append(f"{rel_path} - Missing section: {section_name}")
                f += 1
        
        # Check navigation functions exist
        print(f"\n📋 Checking navigation functions:")
        for func_name in required_items["functions"]:
            if func_name in content:
                print(f"  ✅ Found: {func_name}()")
                p += 1
            else:
                print(f"  ❌ Missing: {func_name}()")
                self.failed.append(f"{rel_path} - Missing function: {func_name}")
                f += 1
        
        return p, f
    
    def run_all_tests(self) -> bool:
        """Run all tests and return True if all pass"""
        print("=" * 70)
        print("INTERACTIVE ELEMENTS TEST SUITE")
        print("=" * 70)
        
        total_p, total_f, total_w = 0, 0, 0
        
        # Find all TSX files
        tsx_files = list(SRC_DIR.rglob("*.tsx"))
        tsx_files = [f for f in tsx_files if "node_modules" not in str(f) and ".next" not in str(f)]
        
        print(f"\n🔍 Testing {len(tsx_files)} TypeScript React files...\n")
        
        for filepath in tsx_files:
            rel_path = str(filepath.relative_to(SRC_DIR))
            
            # Skip UI primitives
            if "/ui/" in rel_path:
                continue
            
            print(f"Testing: {rel_path}")
            p, f, w = self.test_file(filepath)
            total_p += p
            total_f += f
            total_w += w
            
            # Special tests for TemplateGalleryPage
            if "TemplateGallery" in rel_path:
                tp, tf = self.test_template_gallery_specific(filepath)
                total_p += tp
                total_f += tf
        
        # Print results
        print("\n" + "=" * 70)
        print("TEST RESULTS SUMMARY")
        print("=" * 70)
        print(f"\n✅ Passed: {total_p}")
        print(f"❌ Failed: {total_f}")
        print(f"⚠️  Warnings: {total_w}")
        
        if self.failed:
            print("\n" + "-" * 70)
            print("FAILED TESTS:")
            print("-" * 70)
            for failure in self.failed:
                print(f"  ❌ {failure}")
        
        if self.warnings:
            print("\n" + "-" * 70)
            print("WARNINGS:")
            print("-" * 70)
            for warning in self.warnings[:10]:  # Show first 10
                print(f"  ⚠️  {warning}")
            if len(self.warnings) > 10:
                print(f"  ... and {len(self.warnings) - 10} more warnings")
        
        print("\n" + "=" * 70)
        
        if total_f > 0:
            print(f"❌ TESTS FAILED - {total_f} failures found!")
            return False
        else:
            print("✅ ALL TESTS PASSED!")
            return True


def main():
    tester = InteractiveElementTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)


if __name__ == "__main__":
    main()
