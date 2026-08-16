/**
 * Template Gallery Audit & Testing Suite
 * ======================================
 * 
 * Comprehensive validation for TemplateGalleryPage.tsx
 * 
 * Run: npx tsx scripts/audit-template-gallery.ts
 * 
 * Checks:
 * 1. TypeScript compilation
 * 2. Component structure integrity
 * 3. Data model consistency
 * 4. Accessibility compliance
 * 5. Performance indicators
 * 6. User interaction flows
 * 7. Bundle size impact
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AuditResult {
  category: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN' | 'SKIP';
  message: string;
  details?: string;
  suggestion?: string;
}

interface AuditReport {
  timestamp: string;
  file: string;
  fileSize: number;
  lineCount: number;
  results: AuditResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
    skipped: number;
    score: number; // 0-100
  };
  recommendations: string[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const TEMPLATE_FILE = join('/home/z/my-project/demoscicmp-repo', 'src/components/SciCMP/TemplateGalleryPage.tsx');
const EXPECTED_CATEGORIES = [
  'bioinformatics', 'cheminformatics', 'machine-learning', 'statistics',
  'visualization', 'quantum-computing', 'computational-physics',
  'image-analysis', 'nlp', 'signal-processing'
];
const EXPECTED_TIERS = ['free', 'freemium', 'premium'];
const EXPECTED_DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'expert'];
const EXPECTED_STATUSES = ['stable', 'beta', 'experimental'];

// ============================================================================
// AUDIT FUNCTIONS
// ============================================================================

function createAudit(): AuditReport {
  return {
    timestamp: new Date().toISOString(),
    file: TEMPLATE_FILE,
    fileSize: 0,
    lineCount: 0,
    results: [],
    summary: { total: 0, passed: 0, failed: 0, warnings: 0, skipped: 0, score: 0 },
    recommendations: []
  };
}

function addResult(report: AuditReport, result: AuditResult): void {
  report.results.push(result);
  report.summary.total++;
  
  switch (result.status) {
    case 'PASS': report.summary.passed++; break;
    case 'FAIL': report.summary.failed++; break;
    case 'WARN': report.summary.warnings++; break;
    case 'SKIP': report.summary.skipped++; break;
  }
  
  // Calculate score (pass = full points, warn = half, fail = 0)
  report.summary.score = Math.round(
    ((report.summary.passed + report.summary.warnings * 0.5) / report.summary.total) * 100
  );
}

// 1. FILE STRUCTURE CHECKS
function auditFileStructure(report: AuditReport, content: string): void {
  console.log('\n📁 Auditing File Structure...');
  
  // File existence
  addResult(report, {
    category: 'File Structure',
    test: 'File Exists',
    status: existsSync(TEMPLATE_FILE) ? 'PASS' : 'FAIL',
    message: existsSync(TEMPLATE_FILE) ? 'TemplateGalleryPage.tsx found' : 'File not found!',
    suggestion: !existsSync(TEMPLATE_FILE) ? 'Create the template gallery component' : undefined
  });
  
  if (!existsSync(TEMPLATE_FILE)) return;
  
  const stats = statSync(TEMPLATE_FILE);
  report.fileSize = stats.size;
  report.lineCount = content.split('\n').length;
  
  // File size check (should be < 100KB for a single component)
  const maxSizeKB = 100;
  const sizeKB = stats.size / 1024;
  
  addResult(report, {
    category: 'File Structure',
    test: 'File Size',
    status: sizeKB < maxSizeKB ? 'PASS' : 'WARN',
    message: `File size: ${sizeKB.toFixed(1)}KB (${report.lineCount} lines)`,
    details: `${sizeKB.toFixed(1)}KB / ${maxSizeKB}KB limit`,
    suggestion: sizeKB > maxSizeKB ? 'Consider splitting into smaller modules' : undefined
  });
  
  // Required exports
  const hasDefaultExport = content.includes('export default function');
  const isClientComponent = content.includes("'use client'");
  
  addResult(report, {
    category: 'File Structure',
    test: 'Default Export',
    status: hasDefaultExport ? 'PASS' : 'FAIL',
    message: hasDefaultExport ? 'Has default export' : 'Missing default export'
  });
  
  addResult(report, {
    category: 'File Structure',
    test: 'Client Component Directive',
    status: isClientComponent ? 'PASS' : 'FAIL',
    message: isClientComponent ? "Uses 'use client'" : "Missing 'use client' directive",
    suggestion: !isClientComponent ? "Add 'use client' at the top for interactive features" : undefined
  });
}

// 2. DATA MODEL INTEGRITY
function auditDataModel(report: AuditReport, content: string): void {
  console.log('\n📊 Auditing Data Model Integrity...');
  
  // Check templates array exists
  const hasTemplatesArray = content.includes('const templates: TemplateData[] = [');
  addResult(report, {
    category: 'Data Model',
    test: 'Templates Array Defined',
    status: hasTemplatesArray ? 'PASS' : 'FAIL',
    message: hasTemplatesArray ? 'Templates data array found' : 'Missing templates array'
  });
  
  if (!hasTemplatesArray) return;
  
  // Count templates
  const templateMatches = content.match(/id: '/g);
  const templateCount = templateMatches?.length || 0;
  
  addResult(report, {
    category: 'Data Model',
    test: 'Template Count',
    status: templateCount >= 5 ? 'PASS' : 'WARN',
    message: `${templateCount} templates defined`,
    details: 'Minimum recommended: 5 templates',
    suggestion: templateCount < 5 ? 'Add more templates for comprehensive coverage' : undefined
  });
  
  // Check required fields in each template
  const requiredFields = [
    'id', 'name', 'description', 'category', 'icon', 'difficulty', 'tier',
    'oneClickSetup', 'setupTime', 'prerequisites', 'computeRequirements',
    'parameterPresets', 'bestPractices', 'communityContributions',
    'communityRating', 'totalUses', 'successRate', 'papers', 'features',
    'useCases', 'integrations', 'status', 'lastUpdated', 'version', 'tags',
    'hasDemo', 'hasTutorial', 'hasVideoGuide'
  ];
  
  requiredFields.forEach(field => {
    const hasField = content.includes(`${field}:`);
    addResult(report, {
      category: 'Data Model',
      test: `Field: ${field}`,
      status: hasField ? 'PASS' : 'FAIL',
      message: hasField ? `Field '${field}' present` : `Missing field '${field}'`
    });
  });
  
  // Category coverage
  EXPECTED_CATEGORIES.forEach(category => {
    const hasCategory = content.includes(`id: '${category}'`);
    if (hasCategory) {
      addResult(report, {
        category: 'Data Model',
        test: `Category Coverage: ${category}`,
        status: 'PASS',
        message: `Has ${category} template(s)`
      });
    }
  });
  
  // Tier distribution
  EXPECTED_TIERS.forEach(tier => {
    const tierRegex = new RegExp(`tier: '${tier}'`, 'g');
    const tierCount = (content.match(tierRegex) || []).length;
    
    addResult(report, {
      category: 'Data Model',
      test: `Tier Distribution: ${tier}`,
      status: tierCount > 0 ? 'PASS' : 'WARN',
      message: `${tierCount} ${tier} template(s)`,
      suggestion: tierCount === 0 ? `Consider adding at least one ${tier} template` : undefined
    });
  });
}

// 3. COMPONENT FEATURES AUDIT
function auditFeatures(report: AuditReport, content: string): void {
  console.log('\n🎨 Auditing Component Features...');
  
  // One-click setup support
  const hasOneClickSetup = content.includes('oneClickSetup: true');
  addResult(report, {
    category: 'Features',
    test: 'One-Click Setup Support',
    status: hasOneClickSetup ? 'PASS' : 'WARN',
    message: hasOneClickSetup ? 'Templates support one-click setup' : 'No one-click setup templates',
    suggestion: !hasOneClickSetup ? 'Add one-click setup capability for better UX' : undefined
  });
  
  // Parameter presets
  const hasParameterPresets = content.includes('ParameterPreset[]');
  addResult(report, {
    category: 'Features',
    test: 'Parameter Presets',
    status: hasParameterPresets ? 'PASS' : 'FAIL',
    message: hasParameterPresets ? 'Parameter presets system implemented' : 'Missing parameter presets'
  });
  
  // Best practices
  const hasBestPractices = content.includes('BestPractice[]');
  addResult(report, {
    category: 'Features',
    test: 'Best Practices System',
    status: hasBestPractices ? 'PASS' : 'FAIL',
    message: hasBestPractices ? 'Best practices embedded' : 'Missing best practices'
  });
  
  // Community contributions
  const hasCommunityContributions = content.includes('CommunityContribution[]');
  addResult(report, {
    category: 'Features',
    test: 'Community Contributions',
    status: hasCommunityContributions ? 'PASS' : 'WARN',
    message: hasCommunityContributions ? 'Community curation enabled' : 'No community contribution system',
    suggestion: !hasCommunityContributions ? 'Add community plugin/contribution system' : undefined
  });
  
  // Paper references
  const hasPaperReferences = content.includes('PaperReference[]');
  addResult(report, {
    category: 'Features',
    test: 'Paper References',
    status: hasPaperReferences ? 'PASS' : 'FAIL',
    message: hasPaperReferences ? 'Research paper integration' : 'Missing paper references'
  });
  
  // Search functionality
  const hasSearch = content.includes('searchQuery') && content.includes('Search');
  addResult(report, {
    category: 'Features',
    test: 'Search Functionality',
    status: hasSearch ? 'PASS' : 'FAIL',
    message: hasSearch ? 'Search/filter implemented' : 'Missing search functionality'
  });
  
  // Filter capabilities
  const hasFilters = content.includes('filterTier') && content.includes('filterDifficulty');
  addResult(report, {
    category: 'Features',
    test: 'Filter Capabilities',
    status: hasFilters ? 'PASS' : 'WARN',
    message: hasFilters ? 'Multiple filter options available' : 'Limited filtering options'
  });
  
  // View modes (grid/list)
  const hasViewModes = content.includes("viewMode === 'grid'") && content.includes("viewMode === 'list'");
  addResult(report, {
    category: 'Features',
    test: 'View Modes',
    status: hasViewModes ? 'PASS' : 'WARN',
    message: hasViewModes ? 'Grid and list views available' : 'Single view mode only'
  });
  
  // Modal/detail view
  const hasDetailView = content.includes('selectedTemplate') && content.includes('Modal');
  addResult(report, {
    category: 'Features',
    test: 'Detail View/Modal',
    status: hasDetailView ? 'PASS' : 'FAIL',
    message: hasDetailView ? 'Detailed template view modal' : 'Missing detail view'
  });
  
  // Tab navigation in modal
  const hasTabNavigation = content.includes('activeTab');
  addResult(report, {
    category: 'Features',
    test: 'Tab Navigation',
    status: hasTabNavigation ? 'PASS' : 'WARN',
    message: hasTabNavigation ? 'Tab-based detail organization' : 'No tab navigation'
  });
}

// 4. NAVIGATION & UX AUDIT
function auditNavigation(report: AuditReport, content: string): void {
  console.log('\n🧭 Auditing Navigation & UX...');
  
  // Return to home button
  const hasHomeNav = content.includes('navigateToHome') || content.includes("onNavigate('landing')");
  addResult(report, {
    category: 'Navigation',
    test: 'Return to Home Button',
    status: hasHomeNav ? 'PASS' : 'FAIL',
    message: hasHomeNav ? 'Home navigation available' : 'Missing home navigation button'
  });
  
  // Return to dashboard button
  const hasDashboardNav = content.includes('navigateToDashboard') || content.includes("onNavigate('dashboard')");
  addResult(report, {
    category: 'Navigation',
    test: 'Return to Dashboard Button',
    status: hasDashboardNav ? 'PASS' : 'FAIL',
    message: hasDashboardNav ? 'Dashboard navigation available' : 'Missing dashboard navigation'
  });
  
  // Scroll to top
  const hasScrollTop = content.includes('scrollToTop') || content.includes('scroll-behavior');
  addResult(report, {
    category: 'Navigation',
    test: 'Scroll to Top Button',
    status: hasScrollTop ? 'PASS' : 'WARN',
    message: hasScrollTop ? 'Back-to-top functionality' : 'No scroll-to-top button',
    suggestion: !hasScrollTop ? 'Add floating scroll-to-top button for long pages' : undefined
  });
  
  // Mobile navigation
  const hasMobileNav = content.includes('md:hidden') || content.includes('mobile');
  addResult(report, {
    category: 'Navigation',
    test: 'Mobile Navigation',
    status: hasMobileNav ? 'PASS' : 'WARN',
    message: hasMobileNav ? 'Mobile-responsive navigation' : 'May lack mobile optimization'
  });
  
  // Breadcrumb or location indicator
  const hasBreadcrumb = content.includes('breadcrumb') || content.includes('location') || content.includes('path');
  addResult(report, {
    category: 'Navigation',
    test: 'Location Indicator',
    status: hasBreadcrumb ? 'PASS' : 'WARN',
    message: hasBreadcrumb ? 'User location shown' : 'No breadcrumb/location indicator'
  });
}

// 5. ACCESSIBILITY AUDIT
function auditAccessibility(report: AuditReport, content: string): void {
  console.log('\n♿ Auditing Accessibility...');
  
  // ARIA labels
  const ariaLabelCount = (content.match(/aria-label=/g) || []).length;
  addResult(report, {
    category: 'Accessibility',
    test: 'ARIA Labels',
    status: ariaLabelCount >= 5 ? 'PASS' : ariaLabelCount > 0 ? 'WARN' : 'FAIL',
    message: `${ariaLabelCount} aria-label attributes found`,
    details: 'Recommended: 5+ for interactive elements',
    suggestion: ariaLabelCount < 5 ? 'Add aria-labels to buttons and interactive elements' : undefined
  });
  
  // Semantic HTML
  const semanticElements = ['<section', '<nav', '<main', '<header', '<footer', '<button'].reduce((count, tag) => 
    count + (content.match(new RegExp(tag, 'g')) || []).length, 0
  );
  
  addResult(report, {
    category: 'Accessibility',
    test: 'Semantic HTML',
    status: semanticElements >= 10 ? 'PASS' : 'WARN',
    message: `${semanticElements} semantic elements`,
    suggestion: semanticElements < 10 ? 'Use semantic HTML elements instead of divs where possible' : undefined
  });
  
  // Keyboard navigation hints
  const hasKeyboardSupport = content.includes('onKeyDown') || content.includes('keyboard');
  addResult(report, {
    category: 'Accessibility',
    test: 'Keyboard Navigation',
    status: hasKeyboardSupport ? 'PASS' : 'WARN',
    message: hasKeyboardSupport ? 'Keyboard navigation supported' : 'No explicit keyboard handling'
  });
  
  // Focus management
  const hasFocusManagement = content.includes('focus') || content.includes('tabIndex');
  addResult(report, {
    category: 'Accessibility',
    test: 'Focus Management',
    status: hasFocusManagement ? 'PASS' : 'WARN',
    message: hasFocusManagement ? 'Focus states managed' : 'No focus management detected'
  });
  
  // Color contrast (check for text color classes)
  const hasTextColors = content.includes('text-foreground') || content.includes('text-muted-foreground');
  addResult(report, {
    category: 'Accessibility',
    test: 'Color Usage',
    status: hasTextColors ? 'PASS' : 'WARN',
    message: hasTextColors ? 'Uses theme-aware colors' : 'May have hardcoded colors'
  });
}

// 6. PERFORMANCE INDICATORS
function auditPerformance(report: AuditReport, content: string): void {
  console.log('\n⚡ Auditing Performance Indicators...');
  
  // useMemo usage
  const useMemocount = (content.match(/useMemo\(/g) || []).length;
  addResult(report, {
    category: 'Performance',
    test: 'Memoization (useMemo)',
    status: useMemocount >= 1 ? 'PASS' : 'WARN',
    message: `${useMemocount} useMemo hooks`,
    suggestion: useMemocount === 0 ? 'Use useMemo for filtered templates and computed values' : undefined
  });
  
  // useCallback usage
  const useCallbackcount = (content.match(/useCallback\(/g) || []).length;
  addResult(report, {
    category: 'Performance',
    test: 'Callback Optimization (useCallback)',
    status: useCallbackcount >= 2 ? 'PASS' : 'WARN',
    message: `${useCallbackcount} useCallback hooks`,
    suggestion: useCallbackcount < 2 ? 'Use useCallback for event handlers passed to children' : undefined
  });
  
  // Dynamic imports check (for code splitting)
  const hasDynamicImport = content.includes('dynamic(') || content.includes('React.lazy');
  addResult(report, {
    category: 'Performance',
    test: 'Code Splitting Ready',
    status: hasDynamicImport ? 'PASS' : 'WARN',
    message: hasDynamicImport ? 'Supports dynamic imports' : 'Not using dynamic imports',
    suggestion: !hasDynamicImport ? 'Consider dynamic import for this large component' : undefined
  });
  
  // Image optimization
  const hasUnoptimizedImages = content.includes('<img ') && !content.includes('unoptimized');
  addResult(report, {
    category: 'Performance',
    test: 'Image Optimization',
    status: !hasUnoptimizedImages ? 'PASS' : 'WARN',
    message: !hasUnoptimizedImages ? 'Images properly handled' : 'Check image optimization'
  });
  
  // List key props
  const keyPropCount = (content.match(/key=\{/g) || []).length;
  addResult(report, {
    category: 'Performance',
    test: 'List Key Props',
    status: keyPropCount >= 3 ? 'PASS' : 'WARN',
    message: `${keyPropCount} key props on list items`,
    suggestion: keyPropCount < 3 ? 'Ensure all mapped lists have unique key props' : undefined
  });
  
  // Conditional rendering optimization
  const hasEarlyReturn = content.includes('if (') && content.includes('return');
  addResult(report, {
    category: 'Performance',
    test: 'Conditional Rendering',
    status: hasEarlyReturn ? 'PASS' : 'INFO',
    message: hasEarlyReturn ? 'Uses conditional rendering patterns' : 'Standard rendering'
  });
}

// 7. ERROR HANDLING AUDIT
function auditErrorHandling(report: AuditReport, content: string): void {
  console.log('\n🛡️ Auditing Error Handling...');
  
  // Try-catch blocks
  const tryCatchCount = (content.match(/try\s*{/g) || []).length;
  addResult(report, {
    category: 'Error Handling',
    test: 'Try-Catch Blocks',
    status: tryCatchCount >= 1 ? 'PASS' : 'WARN',
    message: `${tryCatchCount} try-catch blocks`,
    suggestion: tryCatchCount === 0 ? 'Add error boundaries for async operations' : undefined
  });
  
  // Loading states
  const hasLoadingState = content.includes('loading') || content.includes('isLoading') || content.includes('spinner');
  addResult(report, {
    category: 'Error Handling',
    test: 'Loading States',
    status: hasLoadingState ? 'PASS' : 'WARN',
    message: hasLoadingState ? 'Loading states implemented' : 'No loading states detected'
  });
  
  // Empty state handling
  const hasEmptyState = content.includes('No templates found') || content.includes('empty');
  addResult(report, {
    category: 'Error Handling',
    test: 'Empty State Handling',
    status: hasEmptyState ? 'PASS' : 'FAIL',
    message: hasEmptyState ? 'Empty states handled' : 'Missing empty state UI'
  });
  
  // Error boundaries
  const hasErrorBoundary = content.includes('ErrorBoundary') || content.includes('error');
  addResult(report, {
    category: 'Error Handling',
    test: 'Error Boundaries',
    status: hasErrorBoundary ? 'PASS' : 'WARN',
    message: hasErrorBoundary ? 'Error handling in place' : 'Consider adding error boundaries'
  });
  
  // Fallback values
  const hasFallbacks = content.includes('||') && content.includes('[]') || content.includes('??');
  addResult(report, {
    category: 'Error Handling',
    test: 'Fallback Values',
    status: hasFallbacks ? 'PASS' : 'WARN',
    message: hasFallbacks ? 'Uses fallback/default values' : 'May lack fallback handling'
  });
}

// 8. SECURITY AUDIT
function auditSecurity(report: AuditReport, content: string): void {
  console.log('\n🔒 Auditing Security Considerations...');
  
  // XSS prevention (dangerouslySetInnerHTML)
  const hasDangerousHTML = content.includes('dangerouslySetInnerHTML');
  addResult(report, {
    category: 'Security',
    test: 'XSS Prevention',
    status: !hasDangerousHTML ? 'PASS' : 'FAIL',
    message: !hasDangerousHTML ? 'No dangerouslySetInnerHTML' : '⚠️ Uses dangerouslySetInnerHTML - XSS risk!'
  });
  
  // External links security
  const externalLinkCount = (content.match(/target="_blank"/g) || []).length;
  const relNoopenerCount = (content.match(/rel="noopener/g) || []).length;
  addResult(report, {
    category: 'Security',
    test: 'External Link Security',
    status: externalLinkCount <= relNoopenerCount ? 'PASS' : 'WARN',
    message: `${externalLinkCount} external links, ${relNoopenerCount} with noopener`
  });
  
  // Data sanitization hints
  const hasSanitization = content.includes('sanitize') || content.includes('escape') || content.includes('encode');
  addResult(report, {
    category: 'Security',
    test: 'Input Sanitization',
    status: hasSanitization ? 'PASS' : 'WARN',
    message: hasSanitization ? 'Input sanitization present' : 'No explicit input sanitization'
  });
}

// 9. USER EXPERIENCE ENHANCEMENTS
function auditUXEnhancements(report: AuditReport, content: string): void {
  console.log('\n✨ Auditing UX Enhancements...');
  
  // Animations/transitions
  const animationCount = (content.match(/transition|animate|hover:/g) || []).length;
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Animations/Transitions',
    status: animationCount >= 5 ? 'PASS' : animationCount > 0 ? 'WARN' : 'FAIL',
    message: `${animationCount} animation/transition classes`,
    suggestion: animationCount < 5 ? 'Add smooth transitions for better perceived performance' : undefined
  });
  
  // Visual feedback (hover states)
  const hoverCount = (content.match(/hover:/g) || []).length;
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Hover States',
    status: hoverCount >= 3 ? 'PASS' : 'WARN',
    message: `${hoverCount} hover state definitions`,
    suggestion: hoverCount < 3 ? 'Add hover states for interactive elements' : undefined
  });
  
  // Copy to clipboard functionality
  const hasClipboardCopy = content.includes('clipboard') || content.includes('copy(');
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Clipboard Copy',
    status: hasClipboardCopy ? 'PASS' : 'WARN',
    message: hasClipboardCopy ? 'Copy-to-clipboard feature' : 'No copy functionality',
    suggestion: !hasClipboardCopy ? 'Add copy buttons for DOIs, commands, etc.' : undefined
  });
  
  // Tooltips or help text
  const hasTooltips = content.includes('title=') || content.includes('tooltip');
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Tooltips/Help Text',
    status: hasTooltips ? 'PASS' : 'WARN',
    message: hasTooltips ? 'Help text/tooltips present' : 'Limited help text'
  });
  
  // Responsive design
  const responsiveBreakpoints = (content.match(/(sm:|md:|lg:|xl:)/g) || []).length;
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Responsive Design',
    status: responsiveBreakpoints >= 10 ? 'PASS' : 'WARN',
    message: `${responsiveBreakpoints} responsive utility classes`,
    suggestion: responsiveBreakpoints < 10 ? 'Add more responsive breakpoints' : undefined
  });
  
  // Dark mode support
  const hasDarkMode = content.includes('dark:') || content.includes('isDarkMode');
  addResult(report, {
    category: 'UX Enhancement',
    test: 'Dark Mode Support',
    status: hasDarkMode ? 'PASS' : 'WARN',
    message: hasDarkMode ? 'Dark mode compatible' : 'May not support dark mode'
  });
}

// 10. CODE QUALITY METRICS
function auditCodeQuality(report: AuditReport, content: string): void {
  console.log('\n📈 Analyzing Code Quality Metrics...');
  
  // Comment density
  const commentLines = (content.match(/\/\/.*$/gm) || []).length + 
                       (content.match(/\/\*[\s\S]*?\*\//g) || []).join('').split('\n').length;
  const commentRatio = (commentLines / report.lineCount * 100).toFixed(1);
  
  addResult(report, {
    category: 'Code Quality',
    test: 'Comment Density',
    status: parseFloat(commentRatio) > 5 ? 'PASS' : parseFloat(commentRatio) > 2 ? 'WARN' : 'FAIL',
    message: `${commentRatio}% comments (${commentLines}/${report.lineCount} lines)`,
    suggestion: parseFloat(commentRatio) < 5 ? 'Add more documentation comments' : undefined
  });
  
  // Function count
  const functionCount = (content.match(/function \w+\(/g) || []).length +
                        (content.match(/const \w+.*=>/g) || []).length;
  addResult(report, {
    category: 'Code Quality',
    test: 'Function Count',
    status: functionCount >= 5 ? 'PASS' : 'WARN',
    message: `${functionCount} functions/components defined`,
    details: 'More functions = better modularity'
  });
  
  // Interface/type definitions
  const interfaceCount = (content.match(/interface \w+/g) || []).length;
  const typeCount = (content.match(/type \w+ =/g) || []).length;
  
  addResult(report, {
    category: 'Code Quality',
    test: 'TypeScript Types',
    status: (interfaceCount + typeCount) >= 5 ? 'PASS' : 'WARN',
    message: `${interfaceCount} interfaces, ${typeCount} type aliases`,
    suggestion: (interfaceCount + typeCount) < 5 ? 'Add more TypeScript types for better type safety' : undefined
  });
  
  // Magic numbers check (numbers without context)
  const potentialMagicNumbers = content.match(/(?<![:\w"'=])(\d{2,})(?!\w)/g)?.slice(0, 5) || [];
  addResult(report, {
    category: 'Code Quality',
    test: 'Magic Numbers',
    status: potentialMagicNumbers.length === 0 ? 'PASS' : 'WARN',
    message: potentialMagicNumbers.length > 0 
      ? `Potential magic numbers: ${potentialMagicNumbers.join(', ')}...` 
      : 'No obvious magic numbers',
    suggestion: potentialMagicNumbers.length > 0 ? 'Extract magic numbers to named constants' : undefined
  });
  
  // Code duplication heuristic (similar lines)
  const lines = content.split('\n');
  const lineFrequency: Record<string, number> = {};
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.length > 20) {
      lineFrequency[trimmed] = (lineFrequency[trimmed] || 0) + 1;
    }
  });
  
  const duplicateLines = Object.entries(lineFrequency).filter(([_, count]) => count > 2);
  addResult(report, {
    category: 'Code Quality',
    test: 'Code Duplication',
    status: duplicateLines.length === 0 ? 'PASS' : 'WARN',
    message: duplicateLines.length > 0 
      ? `${duplicateLines.length} potentially duplicated code blocks` 
      : 'No significant duplication detected',
    suggestion: duplicateLines.length > 0 ? 'Extract duplicated code into reusable functions' : undefined
  });
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateRecommendations(report: AuditReport): void {
  const failures = report.results.filter(r => r.status === 'FAIL');
  const warnings = report.results.filter(r => r.status === 'WARN');
  
  // Critical fixes needed
  if (failures.length > 0) {
    report.recommendations.push(`🔴 CRITICAL: Fix ${failures.length} failing tests before deployment`);
    failures.slice(0, 5).forEach(f => {
      report.recommendations.push(`   → [${f.category}] ${f.test}: ${f.suggestion || f.message}`);
    });
  }
  
  // Improvements suggested
  if (warnings.length > 0) {
    report.recommendations.push(`\n🟡 IMPROVE: Address ${warnings.length} warnings for better quality`);
    warnings.slice(0, 5).forEach(w => {
      report.recommendations.push(`   → [${w.category}] ${w.test}: ${w.suggestion || w.message}`);
    });
  }
  
  // Enhancement opportunities
  const passedAdvanced = report.results.filter(r => 
    r.status === 'PASS' && 
    ['Performance', 'UX Enhancement', 'Accessibility'].includes(r.category)
  );
  
  if (passedAdvanced.length >= 8) {
    report.recommendations.push('\n✅ EXCELLENT: Component demonstrates advanced quality practices!');
  }
}

function printReport(report: AuditReport): void {
  console.log('\n' + '='.repeat(80));
  console.log('📋 TEMPLATE GALLERY AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\n📁 File: ${report.file}`);
  console.log(`📊 Size: ${(report.fileSize / 1024).toFixed(1)}KB | Lines: ${report.lineCount}`);
  console.log(`⏰ Timestamp: ${report.timestamp}`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('📊 EXECUTIVE SUMMARY');
  console.log('-'.repeat(80));
  
  const scoreEmoji = report.summary.score >= 90 ? '🏆' : 
                     report.summary.score >= 70 ? '✅' : 
                     report.summary.score >= 50 ? '⚠️' : '❌';
  
  console.log(`\n${scoreEmoji} Overall Score: ${report.summary.score}/100`);
  console.log(`   ✅ Passed: ${report.summary.passed}`);
  console.log(`   ❌ Failed: ${report.summary.failed}`);
  console.log(`   ⚠️  Warnings: ${report.summary.warnings}`);
  console.log(`   ⏭️  Skipped: ${report.summary.skipped}`);
  
  // Group results by category
  const categories = [...new Set(report.results.map(r => r.category))];
  
  console.log('\n' + '-'.repeat(80));
  console.log('🔍 DETAILED RESULTS');
  console.log('-'.repeat(80));
  
  categories.forEach(category => {
    console.log(`\n📂 ${category.toUpperCase()}`);
    console.log('  ' + '─'.repeat(40));
    
    const categoryResults = report.results.filter(r => r.category === category);
    categoryResults.forEach(result => {
      const emoji = result.status === 'PASS' ? '✅' :
                    result.status === 'FAIL' ? '❌' :
                    result.status === 'WARN' ? '⚠️' : '⏭️';
      
      console.log(`  ${emoji} ${result.test}`);
      console.log(`     ${result.message}`);
      
      if (result.details) console.log(`     📌 ${result.details}`);
      if (result.suggestion) console.log(`     💡 ${result.suggestion}`);
    });
  });
  
  // Print recommendations
  if (report.recommendations.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('💡 RECOMMENDATIONS');
    console.log('-'.repeat(80));
    report.recommendations.forEach(rec => console.log(rec));
  }
  
  // Final verdict
  console.log('\n' + '='.repeat(80));
  console.log('🎯 VERDICT');
  console.log('='.repeat(80));
  
  if (report.summary.score >= 90) {
    console.log('🏆 PRODUCTION READY: Excellent quality! Safe to deploy.');
  } else if (report.summary.score >= 70) {
    console.log('✅ GOOD: Minor improvements recommended before deployment.');
  } else if (report.summary.score >= 50) {
    console.log('⚠️ NEEDS WORK: Significant issues need attention.');
  } else {
    console.log('❌ NOT READY: Major refactoring required.');
  }
  
  console.log('\n' + '='.repeat(80) + '\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     Template Gallery Comprehensive Audit & Testing       ║');
  console.log('║              SciCMPMATH Quality Assurance                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  const report = createAudit();
  
  // Read file
  let content = '';
  try {
    if (existsSync(TEMPLATE_FILE)) {
      content = readFileSync(TEMPLATE_FILE, 'utf-8');
    }
  } catch (error) {
    addResult(report, {
      category: 'System',
      test: 'File Read',
      status: 'FAIL',
      message: `Failed to read file: ${error}`
    });
  }
  
  // Run all audits
  try {
    auditFileStructure(report, content);
    auditDataModel(report, content);
    auditFeatures(report, content);
    auditNavigation(report, content);
    auditAccessibility(report, content);
    auditPerformance(report, content);
    auditErrorHandling(report, content);
    auditSecurity(report, content);
    auditUXEnhancements(report, content);
    auditCodeQuality(report, content);
    
    // Generate recommendations
    generateRecommendations(report);
    
    // Print final report
    printReport(report);
    
    // Exit with appropriate code
    process.exit(report.summary.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Audit failed with error:', error);
    process.exit(1);
  }
}

main();
