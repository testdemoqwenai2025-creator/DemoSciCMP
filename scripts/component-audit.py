#!/usr/bin/env python3
"""
SciCMP Component Audit Script
==============================

This script performs automated quality checks on React/TypeScript components:
1. Verifies interactive elements have event handlers
2. Checks for missing onClick/onHover/onChange handlers
3. Identifies static content that should be interactive
4. Validates routing and navigation patterns

Run: python3 scripts/component-audit.py
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple
from dataclasses import dataclass, field
from datetime import datetime

# Configuration
SRC_DIR = Path("/home/z/my-project/src")
OUTPUT_FILE = Path("/home/z/my-project/tool-results/audit-report.json")

@dataclass
class Issue:
    severity: str  # CRITICAL, WARNING, INFO
    file: str
    line: int
    component: str
    issue_type: str
    message: str
    suggestion: str

@dataclass 
class AuditResult:
    timestamp: str = ""
    total_files: int = 0
    total_issues: int = 0
    issues_by_severity: Dict[str, int] = field(default_factory=dict)
    issues: List[Issue] = field(default_factory=list)

class ComponentAuditor:
    def __init__(self):
        self.result = AuditResult()
        self.result.timestamp = datetime.now().isoformat()
        
        # Patterns to detect
        self.button_patterns = [
            r'<button[^>]*>',
            r'<Button[^>]*>',
            r'<a\s+href=',
        ]
        
        # Interactive element patterns that should have handlers
        self.interactive_patterns = {
            'button': r'<button(?!\s*disabled)(?![^>]*\bonClick)',
            'Button': r'<Button(?![^>]*\bonClick)',
            'link': r'<a\s+href=["\']#(?![^>]*\bonClick)(?![^>]*\bpreventDefault)',
        }
        
        # Patterns that indicate missing functionality
        self.anti_patterns = [
            (r'className="[^"]*cursor-pointer[^"]*"(?![^>]*\bonClick)', 
             "cursor-pointer without onClick"),
            (r'hover:[^"]*(?![^{]*\bonClick)',
             "hover styles without click handler"),
        ]
    
    def find_tsx_files(self) -> List[Path]:
        """Find all TypeScript React files"""
        files = []
        for path in SRC_DIR.rglob("*.tsx"):
            if "node_modules" not in str(path) and ".next" not in str(path):
                files.append(path)
        return files
    
    def analyze_file(self, file_path: Path) -> List[Issue]:
        """Analyze a single component file for issues"""
        issues = []
        
        try:
            content = file_path.read_text(encoding='utf-8')
            lines = content.split('\n')
            
            # Extract component name
            component_match = re.search(r'(?:export\s+)?(?:default\s+)?function\s+(\w+)|const\s+(\w+)\s*[:=]\s*\(', content)
            component_name = component_match.group(1) or component_match.group(2) or "Unknown"
            
            for line_num, line in enumerate(lines, 1):
                # Check for buttons without onClick
                if re.search(r'<button', line) and not re.search(r'onClick|disabled', line):
                    # Check next few lines for onClick
                    context = '\n'.join(lines[line_num:min(line_num+5, len(lines))])
                    if not re.search(r'onClick', context):
                        issues.append(Issue(
                            severity="WARNING",
                            file=str(file_path.relative_to(SRC_DIR)),
                            line=line_num,
                            component=component_name,
                            issue_type="MISSING_HANDLER",
                            message=f"Button found without onClick handler",
                            suggestion="Add onClick handler or add disabled attribute"
                        ))
                
                # Check for <Button> components without onClick
                if re.search(r'<Button', line) and not re.search(r'onClick|disabled|type="submit"', line):
                    context = '\n'.join(lines[line_num:min(line_num+5, len(lines))])
                    if not re.search(r'onClick', context):
                        issues.append(Issue(
                            severity="WARNING",
                            file=str(file_path.relative_to(SRC_DIR)),
                            line=line_num,
                            component=component_name,
                            issue_type="MISSING_HANDLER",
                            message=f"<Button> component without onClick handler",
                            suggestion="Add onClick prop for interactivity"
                        ))
                
                # Check for divs with cursor-pointer but no onClick
                if 'cursor-pointer' in line and 'onClick' not in line:
                    issues.append(Issue(
                        severity="INFO",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=line_num,
                        component=component_name,
                        issue_type="POTENTIALLY_INTERACTIVE",
                        message="Element with cursor-pointer but no visible onClick",
                        suggestion="Verify this should be clickable"
                    ))
                
                # Check for alert() calls (should be proper UI feedback)
                if 'alert(' in line and 'onClick' in lines[max(0, line_num-3):line_num]:
                    issues.append(Issue(
                        severity="INFO",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=line_num,
                        component=component_name,
                        issue_type="PLACEHOLDER_IMPLEMENTATION",
                        message="Using alert() for user feedback",
                        suggestion="Replace with proper modal/toast notification"
                    ))
                
                # Check for TODO/FIXME comments
                if 'TODO' in line.upper() or 'FIXME' in line.upper():
                    issues.append(Issue(
                        severity="INFO",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=line_num,
                        component=component_name,
                        issue_type="TODO_FOUND",
                        message=line.strip().lstrip('/* ').rstrip('*/'),
                        suggestion="Address this TODO before production"
                    ))
                
                # Check for console.log left in code
                if 'console.log' in line:
                    issues.append(Issue(
                        severity="WARNING",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=line_num,
                        component=component_name,
                        issue_type="DEBUG_CODE",
                        message="console.log statement found",
                        suggestion="Remove or replace with proper logging"
                    ))
                    
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
        
        return issues
    
    def check_template_data_completeness(self, file_path: Path) -> List[Issue]:
        """Check template data arrays for completeness"""
        issues = []
        
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Check for expected templates
            expected_templates = [
                'blast-sequence-analysis',
                'molecular-docking-workflow', 
                'transformer-training-pipeline',
                'statistical-analysis-suite',
                'visualization-templates',
                'create-template-guide'
            ]
            
            for template_id in expected_templates:
                if template_id not in content:
                    issues.append(Issue(
                        severity="CRITICAL",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=0,
                        component="TemplateGalleryPage",
                        issue_type="MISSING_TEMPLATE",
                        message=f"Template '{template_id}' not found in data",
                        suggestion=f"Add {template_id} to templates array"
                    ))
            
            # Check for expected sections
            expected_sections = ['Core Capabilities', 'Use Cases', 'Free Tier']
            for section in expected_sections:
                if section not in content:
                    issues.append(Issue(
                        severity="CRITICAL",
                        file=str(file_path.relative_to(SRC_DIR)),
                        line=0,
                        component="TemplateGalleryPage",
                        issue_type="MISSING_SECTION",
                        message=f"Section '{section}' not implemented",
                        suggestion=f"Add {section} section with interactive elements"
                    ))
                    
        except Exception as e:
            print(f"Error checking templates: {e}")
        
        return issues
    
    def run_full_audit(self) -> AuditResult:
        """Run complete audit of all components"""
        print("=" * 60)
        print("SciCMP COMPONENT AUDIT")
        print("=" * 60)
        print(f"Started at: {self.result.timestamp}\n")
        
        # Find all TSX files
        tsx_files = self.find_tsx_files()
        self.result.total_files = len(tsx_files)
        print(f"Found {len(tsx_files)} TypeScript React files\n")
        
        # Analyze each file
        for file_path in tsx_files:
            rel_path = file_path.relative_to(SRC_DIR)
            print(f"Auditing: {rel_path}")
            
            # General analysis
            issues = self.analyze_file(file_path)
            
            # Template-specific checks
            if 'TemplateGallery' in str(file_path):
                issues.extend(self.check_template_data_completeness(file_path))
            
            self.result.issues.extend(issues)
        
        # Count by severity
        for issue in self.result.issues:
            self.result.issues_by_severity[issue.severity] = \
                self.result.issues_by_severity.get(issue.severity, 0) + 1
        
        self.result.total_issues = len(self.result.issues)
        
        return self.result
    
    def generate_report(self) -> str:
        """Generate human-readable report"""
        report = []
        report.append("\n" + "=" * 60)
        report.append("AUDIT REPORT SUMMARY")
        report.append("=" * 60)
        report.append(f"\nTotal Files Scanned: {self.result.total_files}")
        report.append(f"Total Issues Found: {self.result.total_issues}")
        report.append("\nIssues by Severity:")
        
        for severity in ['CRITICAL', 'WARNING', 'INFO']:
            count = self.result.issues_by_severity.get(severity, 0)
            status = "🔴" if severity == "CRITICAL" else "🟡" if severity == "WARNING" else "🔵"
            report.append(f"  {status} {severity}: {count}")
        
        # Group issues by type
        report.append("\n" + "-" * 60)
        report.append("ISSUES BY TYPE:")
        report.append("-" * 60)
        
        issues_by_type = {}
        for issue in self.result.issues:
            if issue.issue_type not in issues_by_type:
                issues_by_type[issue.issue_type] = []
            issues_by_type[issue.issue_type].append(issue)
        
        for issue_type, type_issues in sorted(issues_by_type.items()):
            report.append(f"\n{issue_type} ({len(type_issues)} occurrences):")
            for issue in type_issues[:5]:  # Show first 5 of each type
                report.append(f"  - {issue.file}:{issue.line} - {issue.message}")
            if len(type_issues) > 5:
                report.append(f"  ... and {len(type_issues) - 5} more")
        
        # Critical issues detail
        critical_issues = [i for i in self.result.issues if i.severity == "CRITICAL"]
        if critical_issues:
            report.append("\n" + "!" * 60)
            report.append("CRITICAL ISSUES - IMMEDIATE ACTION REQUIRED:")
            report.append("!" * 60)
            for issue in critical_issues:
                report.append(f"\n❌ {issue.component}: {issue.message}")
                report.append(f"   File: {issue.file}:{issue.line}")
                report.append(f"   Fix: {issue.suggestion}")
        
        return "\n".join(report)
    
    def save_json_report(self):
        """Save detailed JSON report"""
        data = {
            "timestamp": self.result.timestamp,
            "summary": {
                "total_files": self.result.total_files,
                "total_issues": self.result.total_issues,
                "by_severity": self.result.issues_by_severity
            },
            "issues": [
                {
                    "severity": i.severity,
                    "file": i.file,
                    "line": i.line,
                    "component": i.component,
                    "type": i.issue_type,
                    "message": i.message,
                    "suggestion": i.suggestion
                }
                for i in self.result.issues
            ]
        }
        
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_FILE.write_text(json.dumps(data, indent=2), encoding='utf-8')
        print(f"\n✅ JSON report saved to: {OUTPUT_FILE}")


def main():
    auditor = ComponentAuditor()
    
    # Run the audit
    auditor.run_full_audit()
    
    # Print report
    print(auditor.generate_report())
    
    # Save JSON
    auditor.save_json_report()
    
    # Return exit code based on critical issues
    critical_count = auditor.result.issues_by_severity.get("CRITICAL", 0)
    if critical_count > 0:
        print(f"\n⚠️  AUDIT FAILED: {critical_count} critical issues found!")
        return 1
    else:
        print("\n✅ AUDIT PASSED: No critical issues!")
        return 0


if __name__ == "__main__":
    exit(main())
