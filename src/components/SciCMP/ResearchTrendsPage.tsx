'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  // Hero & Navigation Icons
  Brain,
  Atom,
  Rocket,
  TrendingUp,
  Sparkles,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  
  // Feature Icons
  LayoutTemplate,
  Users,
  Smartphone,
  Calculator,
  Database,
  FileOutput,
  Wifi,
  Glasses,
  Network,
  Tablet,
  
  // Resource Icons
  BookOpen,
  Code2,
  Puzzle,
  Gift,
  Lock,
  Unlock,
  Crown,
  Star,
  
  // Status Icons
  CheckCircle2,
  Clock,
  Zap,
  Target,
  MessageSquare,
  Eye,
  Bell,
  Play
} from 'lucide-react';

// Research Trends Data Structure
interface ResearchFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'beta' | 'coming-soon' | 'planned';
  tier: 'free' | 'freemium' | 'premium';
  freeResources?: {
    title: string;
    url: string;
    type: 'tutorial' | 'template' | 'api-doc' | 'paper' | 'tool';
  }[];
  capabilities: string[];
  useCases: string[];
}

interface PhaseData {
  id: string;
  title: string;
  subtitle: string;
  timeline: string;
  status: 'active' | 'upcoming' | 'future';
  color: string;
  gradient: string;
  gradientLight: string;
  icon: React.ReactNode;
  vision: string;
  highlights: string[];
  features: ResearchFeature[];
}

const researchPhases: PhaseData[] = [
  {
    id: 'phase1',
    title: 'Phase 1',
    subtitle: 'Intelligent Workflows & Collaboration',
    timeline: 'Q4 2026 — Available Now',
    status: 'active',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    gradientLight: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    icon: <Brain className="w-6 h-6" />,
    vision: 'Empowering researchers with AI-assisted workflows and seamless collaboration tools that adapt to your unique research style.',
    highlights: ['AI-Powered Recommendations', 'Template Gallery', 'Real-time Collaboration', 'Mobile-First Design'],
    features: [
      {
        id: 'ai-workflows',
        title: 'AI-Powered Workflow Recommendations',
        description: 'Intelligent suggestions based on your research patterns, automatically optimizing compute resources and suggesting next steps. Our AI learns from millions of research workflows to accelerate your discoveries.',
        icon: <Sparkles className="w-5 h-5" />,
        status: 'available',
        tier: 'freemium',
        freeResources: [
          { title: 'Getting Started Guide', url: '#/docs/ai-workflows/intro', type: 'tutorial' },
          { title: 'Basic Workflow Templates (5)', url: '#/templates/ai-workflows/free', type: 'template' },
          { title: 'API Documentation', url: '#/api/workflow-ai/basic', type: 'api-doc' }
        ],
        capabilities: ['Pattern recognition', 'Resource optimization', 'Smart suggestions', 'Auto-complete pipelines'],
        useCases: ['Repetitive analysis automation', 'Beginner-friendly guidance', 'Expert workflow acceleration']
      },
      {
        id: 'template-gallery',
        title: 'Template Gallery for Common Analyses',
        description: 'Pre-built, peer-reviewed templates for bioinformatics, cheminformatics, physics simulations, and more. Each template follows best practices and is optimized for reproducibility.',
        icon: <LayoutTemplate className="w-5 h-5" />,
        status: 'available',
        tier: 'free',
        freeResources: [
          { title: 'BLAST+ Sequence Analysis', url: '#/templates/bioinformatics/blast', type: 'template' },
          { title: 'Molecular Docking Setup', url: '#/templates/cheminformatics/docking', type: 'template' },
          { title: 'ML Model Training Pipeline', url: '#/templates/ml/training', type: 'template' },
          { title: 'Statistical Analysis Suite', url: '#/templates/statistics/basic', type: 'template' },
          { title: 'Visualization Templates', url: '#/templates/viz/publication-ready', type: 'template' },
          { title: 'Create Your Template Guide', url: '#/docs/templates/create', type: 'tutorial' }
        ],
        capabilities: ['One-click setup', 'Parameter presets', 'Best practices embedded', 'Community curated'],
        useCases: ['Quick start projects', 'Teaching & training', 'Standardization across labs']
      },
      {
        id: 'collaboration',
        title: 'Enhanced Collaboration Features',
        description: 'Real-time co-editing with live cursors, threaded comments, version history, and instant sharing. Work together seamlessly, whether across the hall or across the globe.',
        icon: <Users className="w-5 h-5" />,
        status: 'beta',
        tier: 'freemium',
        freeResources: [
          { title: 'Real-time Editing Basics', url: '#/docs/collab/realtime', type: 'tutorial' },
          { title: 'Commenting System Guide', url: '#/docs/collab/comments', type: 'api-doc' },
          { title: 'Free Tier: 3 Collaborators', url: '#/pricing#collaboration', type: 'tool' }
        ],
        capabilities: ['Live cursors', 'Threaded comments', '@mentions', 'Activity feeds'],
        useCases: ['Remote team collaboration', 'Peer review workflows', 'Shared lab notebooks']
      },
      {
        id: 'mobile-experience',
        title: 'Improved Mobile Experience',
        description: 'Responsive design optimized for tablets and phones with offline support and push notifications. Monitor jobs, review results, and collaborate from anywhere.',
        icon: <Smartphone className="w-5 h-5" />,
        status: 'beta',
        tier: 'free',
        freeResources: [
          { title: 'Mobile App Download (iOS)', url: '#/download/ios', type: 'tool' },
          { title: 'Mobile App Download (Android)', url: '#/download/android', type: 'tool' },
          { title: 'Mobile Features Overview', url: '#/docs/mobile/features', type: 'tutorial' }
        ],
        capabilities: ['Responsive UI', 'Offline mode', 'Push notifications', 'Touch gestures'],
        useCases: ['Field research monitoring', 'Quick job checks', 'On-the-go collaboration']
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2',
    subtitle: 'Quantum Simulation & Advanced Analytics',
    timeline: 'Q1-Q2 2027 — Coming Soon',
    status: 'upcoming',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    gradientLight: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    icon: <Atom className="w-6 h-6" />,
    vision: 'Bridging classical and quantum computing with advanced analytics and seamless database integrations for the next generation of scientific discovery.',
    highlights: ['Quantum Simulation Mode', 'Advanced Statistics', 'Database Integration', 'Auto Report Generation'],
    features: [
      {
        id: 'quantum-sim',
        title: 'Quantum Computing Simulation Mode',
        description: 'Simulate quantum algorithms on classical hardware using Qiskit and Cirq integrations. Prepare your research for the quantum advantage era with our intuitive simulation environment.',
        icon: <Atom className="w-5 h-5" />,
        status: 'coming-soon',
        tier: 'freemium',
        freeResources: [
          { title: 'Quantum Computing Primer', url: '#/learn/quantum/intro', type: 'tutorial' },
          { title: 'Qiskit Integration Docs', url: '#/integrations/qiskit', type: 'api-doc' },
          { title: 'Free: 10 Qubit Simulations/day', url: '#/pricing#quantum', type: 'tool' },
          { title: 'Research Paper: Quantum in Biology', url: '#/papers/quantum-bio-2026', type: 'paper' }
        ],
        capabilities: ['Qiskit/Cirq integration', 'Circuit visualization', 'Noise modeling', 'Hybrid algorithms'],
        useCases: ['Algorithm prototyping', 'Education & training', 'Proof-of-concept studies']
      },
      {
        id: 'stats-packages',
        title: 'Advanced Statistical Analysis Packages',
        description: 'Industry-standard statistical tools with Bayesian methods, causal inference, and uncertainty quantification. Bridge R and Python seamlessly in your analyses.',
        icon: <Calculator className="w-5 h-5" />,
        status: 'coming-soon',
        tier: 'free',
        freeResources: [
          { title: 'R/Python Bridge Documentation', url: '#/docs/stats/r-python', type: 'api-doc' },
          { title: 'Bayesian Analysis Tutorial', url: '#/learn/stats/bayesian', type: 'tutorial' },
          { title: 'Free Statistical Templates (12)', url: '#/templates/stats/free', type: 'template' },
          { title: 'Uncertainty Quantification Guide', url: '#/learn/stats/uq', type: 'tutorial' }
        ],
        capabilities: ['Bayesian inference', 'Causal analysis', 'UQ frameworks', 'Reproducible reports'],
        useCases: ['Clinical trial analysis', 'Experimental validation', 'Meta-analysis']
      },
      {
        id: 'db-integration',
        title: 'Integration with Major Databases',
        description: 'Seamless connectivity to PubMed, arXiv, PDB, UniProt, and other scientific repositories. Search, fetch, and cite without leaving your workspace.',
        icon: <Database className="w-5 h-5" />,
        status: 'coming-soon',
        tier: 'freemium',
        freeResources: [
          { title: 'PubMed Query Builder', url: '#/tools/pubmed-query', type: 'tool' },
          { title: 'arXiv API Integration', url: '#/integrations/arxiv', type: 'api-doc' },
          { title: 'PDB Structure Fetcher', url: '#/tools/pdb-fetch', type: 'tool' },
          { title: 'Free: 100 Queries/day', url: '#/pricing#databases', type: 'tool' }
        ],
        capabilities: ['Unified search', 'Auto-citation', 'Live data sync', 'API aggregation'],
        useCases: ['Literature reviews', 'Dataset discovery', 'Automated referencing']
      },
      {
        id: 'auto-reports',
        title: 'Automated Report Generation',
        description: 'Transform results into publication-ready documents with one click. Generate figures, tables, and citations formatted for Nature, Science, Cell, and more.',
        icon: <FileOutput className="w-5 h-5" />,
        status: 'coming-soon',
        tier: 'premium',
        freeResources: [
          { title: 'Report Templates (3 Free)', url: '#/templates/reports/free', type: 'template' },
          { title: 'LaTeX Export Guide', url: '#/docs/export/latex', type: 'tutorial' },
          { title: 'Figure Generation Basics', url: '#/docs/figures/create', type: 'tutorial' }
        ],
        capabilities: ['One-click PDF', 'Journal formatting', 'Auto-figures', 'Citation management'],
        useCases: ['Paper submissions', 'Grant reports', 'Lab documentation']
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3',
    subtitle: 'Future Frontier Technologies',
    timeline: 'Q3-Q4 2027+ — Vision',
    status: 'future',
    color: 'rose',
    gradient: 'from-rose-500 to-orange-600',
    gradientLight: 'from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30',
    icon: <Rocket className="w-6 h-6" />,
    vision: 'Pioneering the next generation of scientific computing with quantum connectivity, immersive visualization, and federated intelligence.',
    highlights: ['Live Quantum Access', 'AR/VR Visualization', 'Federated Learning', 'Native Mobile Apps'],
    features: [
      {
        id: 'quantum-live',
        title: 'Actual Quantum Compute Connectivity',
        description: 'Direct access to IBM Quantum, Google Quantum AI, Rigetti, and other quantum processing units. Run real quantum experiments alongside classical computations.',
        icon: <Wifi className="w-5 h-5" />,
        status: 'planned',
        tier: 'premium',
        freeResources: [
          { title: 'Quantum Hardware Comparison', url: '#/learn/quantum/hardware', type: 'tutorial' },
          { title: 'Free: Monthly Quantum Credits', url: '#/pricing#quantum-live', type: 'tool' },
          { title: 'Roadmap & Waitlist', url: '#/roadmap/quantum', type: 'api-doc' }
        ],
        capabilities: ['Real QPU access', 'Queue management', 'Result caching', 'Error mitigation'],
        useCases: ['Production quantum experiments', 'Quantum ML training', 'Optimization problems']
      },
      {
        id: 'ar-vr',
        title: 'AR/VR Visualization Modes',
        description: 'Immersive 3D environments for molecular exploration, data visualization, and virtual lab experiences. Step inside your data like never before.',
        icon: <Glasses className="w-5 h-5" />,
        status: 'planned',
        tier: 'freemium',
        freeResources: [
          { title: 'VR Preview Demo', url: '#/demo/vr-molecule', type: 'tool' },
          { title: 'AR Setup Guide', url: '#/docs/arvr/setup', type: 'tutorial' },
          { title: 'Free: Basic VR Viewer', url: '#/pricing#arvr', type: 'tool' },
          { title: 'Use Cases Gallery', url: '#/showcase/arvr', type: 'tutorial' }
        ],
        capabilities: ['Molecular VR', 'Data immersion', 'Virtual labs', 'Collaborative spaces'],
        useCases: ['Drug design review', 'Structure analysis', 'Education & outreach']
      },
      {
        id: 'federated-learning',
        title: 'Federated Learning Framework',
        description: 'Train models across institutions without sharing sensitive data. Enable privacy-preserving collaboration while maintaining data sovereignty.',
        icon: <Network className="w-5 h-5" />,
        status: 'planned',
        tier: 'premium',
        freeResources: [
          { title: 'Federated Learning Whitepaper', url: '#/papers/federated-2027', type: 'paper' },
          { title: 'Privacy Framework Docs', url: '#/docs/federated/privacy', type: 'api-doc' },
          { title: 'Free: Small-scale FL (≤5 nodes)', url: '#/pricing#federated', type: 'tool' }
        ],
        capabilities: ['Differential privacy', 'Secure aggregation', 'Multi-site training', 'Audit trails'],
        useCases: ['Healthcare consortia', 'Competitive collaboration', 'Regulatory compliance']
      },
      {
        id: 'mobile-apps',
        title: 'Cross-Platform Mobile Apps',
        description: 'Native iOS and Android applications with full platform capabilities including job submission, result monitoring, and team communication on the go.',
        icon: <Tablet className="w-5 h-5" />,
        status: 'planned',
        tier: 'free',
        freeResources: [
          { title: 'App Store Preview', url: '#/download/apps', type: 'tool' },
          { title: 'Mobile API Documentation', url: '#/api/mobile', type: 'api-doc' },
          { title: 'Full Feature List', url: '#/features/mobile-full', type: 'tutorial' }
        ],
        capabilities: ['Native performance', 'Biometric auth', 'Background sync', 'Widgets'],
        useCases: ['Field data collection', 'Lab management', 'Conference presentations']
      }
    ]
  }
];

// Sub-components
function TierBadge({ tier }: { tier: 'free' | 'freemium' | 'premium' }) {
  const config = {
    free: { icon: <Gift className="w-3 h-3" />, label: 'Free', bg: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    freemium: { icon: <Star className="w-3 h-3" />, label: 'Freemium', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    premium: { icon: <Crown className="w-3 h-3" />, label: 'Premium', bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
  };
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config[tier].bg}`}>
      {config[tier].icon}
      {config[tier].label}
    </span>
  );
}

function StatusBadge({ status }: { status: 'available' | 'beta' | 'coming-soon' | 'planned' }) {
  const config = {
    available: { label: 'Available Now', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    beta: { label: 'Beta', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    'coming-soon': { label: 'Coming Soon', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    planned: { label: 'Planned', class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' }
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config[status].class}`}>
      {config[status].label}
    </span>
  );
}

function ResourceLink({ resource }: { resource: ResearchFeature['freeResources'][0] }) {
  const typeConfig = {
    tutorial: { icon: <BookOpen className="w-3 h-3" />, color: 'text-blue-600' },
    template: { icon: <LayoutTemplate className="w-3 h-3" />, color: 'text-emerald-600' },
    'api-doc': { icon: <Code2 className="w-3 h-3" />, color: 'text-purple-600' },
    paper: { icon: <FileOutput className="w-3 h-3" />, color: 'text-orange-600' },
    tool: { icon: <Puzzle className="w-3 h-3" />, color: 'text-pink-600' }
  };
  
  const config = typeConfig[resource.type];
  
  return (
    <a
      href={resource.url}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group ${config.color}`}
    >
      <span className="opacity-70 group-hover:opacity-100">{config.icon}</span>
      <span className="text-sm font-medium flex-1">{resource.title}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function FeatureCard({ feature }: { feature: ResearchFeature }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Card Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-base">{feature.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={feature.status} />
                <TierBadge tier={feature.tier} />
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-accent transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          {/* Capabilities */}
          <div>
            <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Core Capabilities
            </h5>
            <div className="flex flex-wrap gap-2">
              {feature.capabilities.map((cap) => (
                <span key={cap} className="px-2 py-1 rounded-md bg-primary/5 text-xs font-medium text-primary border border-primary/10">
                  {cap}
                </span>
              ))}
            </div>
          </div>
          
          {/* Use Cases */}
          <div>
            <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-secondary" />
              Use Cases
            </h5>
            <ul className="space-y-1">
              {feature.useCases.map((useCase) => (
                <li key={useCase} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="w-3 h-3" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Free Resources Section */}
          {feature.freeResources && feature.freeResources.length > 0 && (
            <div className="rounded-lg bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-4 border border-dashed border-primary/20">
              <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Unlock className="w-4 h-4 text-green-600" />
                Free Tier Resources
                <span className="text-xs font-normal text-muted-foreground">
                  ({feature.freeResources.length} available)
                </span>
              </h5>
              
              <div className="space-y-2">
                {feature.freeResources.map((resource, idx) => (
                  <ResourceLink key={idx} resource={resource} />
                ))}
              </div>
              
              {/* Upgrade Prompt */}
              {(feature.tier === 'premium' || feature.tier === 'freemium') && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Want full access?</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 text-xs h-8"
                      onClick={() => {
                        const msg = feature.tier === 'premium' 
                          ? '💎 Upgrading to Pro tier...\n\nThis would:\n• Unlock all premium features\n• Enable advanced tools\n• Provide priority support'
                          : '📋 Viewing available plans...';
                        alert(msg);
                      }}
                    >
                      <Crown className="w-3 h-3" />
                      {feature.tier === 'premium' ? 'Upgrade to Pro' : 'View Plans'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Collapsed State - Show Resource Count */}
      {!isExpanded && feature.freeResources && feature.freeResources.length > 0 && (
        <div className="px-5 pb-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm text-primary font-medium"
          >
            <Gift className="w-4 h-4" />
            View {feature.freeResources.length} Free Resources
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function PhaseSection({ phase, isLast }: { phase: PhaseData; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(phase.status === 'active');
  
  const statusConfig = {
    active: {
      badge: '🚀 Active Development',
      badgeClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    },
    upcoming: {
      badge: '🔮 Coming Soon',
      badgeClass: 'bg-violet-500/10 text-violet-600 border-violet-500/20'
    },
    future: {
      badge: '🌟 Future Vision',
      badgeClass: 'bg-rose-500/10 text-rose-600 border-rose-500/20'
    }
  };
  
  return (
    <div className={`${isLast ? '' : 'mb-12'}`}>
      {/* Phase Header */}
      <div
        className={`rounded-2xl border-2 p-8 md:p-10 cursor-pointer transition-all duration-300 hover:shadow-xl ${
          phase.status === 'active' 
            ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5'
            : phase.status === 'upcoming'
            ? 'border-violet-500/30 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5'
            : 'border-rose-500/30 bg-gradient-to-br from-rose-500/5 via-transparent to-orange-500/5'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${phase.gradient} text-white shadow-xl transform hover:scale-105 transition-transform`}>
              {phase.icon}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl md:text-4xl font-bold">{phase.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[phase.status].badgeClass}`}>
                  {statusConfig[phase.status].badge}
                </span>
              </div>
              <p className="text-xl text-muted-foreground font-medium mb-2">{phase.subtitle}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {phase.timeline}
              </p>
              
              {/* Highlights Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {phase.highlights.map((highlight) => (
                  <span key={highlight} className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur border border-border/50">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center hidden lg:block px-6 py-4 rounded-xl bg-background/60 backdrop-blur border">
              <p className="text-sm text-muted-foreground">Features</p>
              <p className="text-3xl font-bold text-primary">{phase.features.length}</p>
            </div>
            <div className={`p-3 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-primary/10' : 'bg-muted'}`}>
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        {/* Vision Statement */}
        <div className="mt-8 p-5 rounded-xl bg-background/60 backdrop-blur border border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
              <Lightbulb className="w-5 h-5" />
            </div>
            <p className="text-base italic text-muted-foreground leading-relaxed">
              "{phase.vision}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Phase Features (Expandable) */}
      {isExpanded && (
        <div className="mt-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="grid md:grid-cols-2 gap-6">
            {phase.features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
          
          {/* Phase CTA */}
          <div className={`rounded-2xl p-8 bg-gradient-to-r ${phase.gradient} text-white`}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-2xl mb-2">
                  Ready to Explore {phase.title}?
                </h4>
                <p className="text-white/80 text-base max-w-xl">
                  {phase.status === 'active' 
                    ? 'Start using these features today with our generous free tier.'
                    : phase.status === 'upcoming'
                    ? 'Join the waitlist for early access to these upcoming features.'
                    : 'Share your feedback to help shape the future of scientific computing.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {phase.status === 'active' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => alert('🚀 Starting with free tier...\n\nRedirecting to template gallery!')}
                    >
                      <Play className="w-4 h-4" />
                      Get Started Free
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('📖 Opening documentation...\n\nLoading user guides and API docs.')}
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </Button>
                  </>
                )}
                
                {phase.status === 'upcoming' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => {
                        alert('🔔 Joining waitlist...\n\nYou will be notified when these features are available!\n\nPhase: ' + phase.title);
                      }}
                    >
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('👁️ Loading preview demo...\n\nShowing sneak peek of upcoming features.')}
                    >
                      <Eye className="w-4 h-4" />
                      Preview Demo
                    </Button>
                  </>
                )}
                
                {phase.status === 'future' && (
                  <>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="gap-2 whitespace-nowrap"
                      onClick={() => {
                        alert('💬 Opening feedback form...\n\nYour input helps shape the future of SciCMP!');
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Share Feedback
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
                      onClick={() => alert('🗺️ Viewing full roadmap...\n\nShowing timeline for all planned features.')}
                    >
                      <Rocket className="w-4 h-4" />
                      View Roadmap
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Page Component
export default function ResearchTrendsPage() {
  const totalFeatures = researchPhases.reduce((acc, phase) => acc + phase.features.length, 0);
  const totalFreeResources = researchPhases.reduce(
    (acc, phase) => acc + phase.features.reduce((featAcc, feat) => featAcc + (feat.freeResources?.length || 0), 0), 
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[128px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500 rounded-full blur-[128px]"></div>
          </div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Current Research Trends</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Future of{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Scientific Computing
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore our phased roadmap integrating cutting-edge AI, quantum computing simulation, 
              and collaborative tools designed to accelerate your research journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gap-2 bg-white text-slate-900 hover:bg-white/90 font-semibold px-8 h-12">
                <Sparkles className="w-5 h-5" />
                Explore All Phases
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-white border-white/30 hover:bg-white/10 px-8 h-12">
                <ExternalLink className="w-5 h-5" />
                View Source Analysis
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Development Phases', value: '3', icon: <Brain className="w-4 h-4" /> },
                { label: 'Total Features', value: String(totalFeatures), icon: <Zap className="w-4 h-4" /> },
                { label: 'Free Resources', value: `${totalFreeResources}+`, icon: <Gift className="w-4 h-4" /> },
                { label: 'Timeline Span', value: '12+ mo', icon: <Clock className="w-4 h-4" /> },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 mb-2 text-white/80">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Strategic{' '}
            <span className="text-primary">Roadmap</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Based on comprehensive analysis of current research trends from ScienceDaily, arXiv, 
            and industry reports, we've crafted a three-phase approach to revolutionize how scientists 
            compute, collaborate, and discover.
          </p>
        </div>

        {/* Phase Sections */}
        <div className="max-w-6xl mx-auto space-y-12">
          {researchPhases.map((phase, idx) => (
            <PhaseSection key={phase.id} phase={phase} isLast={idx === researchPhases.length - 1} />
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-3">Development Timeline</h3>
            <p className="text-muted-foreground">Our commitment to continuous innovation</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-violet-500 to-rose-500 rounded-full transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { time: 'Q4 2026', phase: 'Phase 1', desc: 'Available Now', color: 'from-emerald-500 to-teal-500', active: true },
                { time: 'Q1-Q2 2027', phase: 'Phase 2', desc: 'In Development', color: 'from-violet-500 to-purple-500', active: false },
                { time: 'Q3-Q4 2027+', phase: 'Phase 3', desc: 'Future Vision', color: 'from-rose-500 to-orange-500', active: false },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className={`p-6 rounded-2xl border-2 bg-card text-center ${
                    item.active ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-transparent shadow-md'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mx-auto mb-4 ${item.active ? 'ring-4 ring-offset-2 ring-offset-background ring-emerald-500/30' : ''}`}>
                      {idx === 0 ? <Brain className="w-7 h-7" /> : idx === 1 ? <Atom className="w-7 h-7" /> : <Rocket className="w-7 h-7" />}
                    </div>
                    <div className="text-sm font-semibold text-primary mb-1">{item.time}</div>
                    <div className="text-lg font-bold mb-1">{item.phase}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                    
                    {item.active && (
                      <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Current Focus
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-24 rounded-3xl border-2 border-dashed border-primary/30 p-8 md:p-12 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
              <Lightbulb className="w-10 h-10" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Shape the Future With Us
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're building SciCMPMATH for researchers like you. Share your ideas, vote on features, 
              and help us prioritize what matters most to the scientific community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 px-8">
                <MessageSquare className="w-5 h-5" />
                Submit Feature Request
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <ExternalLink className="w-5 h-5" />
                Join Community Discussion
              </Button>
              <Button size="lg" variant="ghost" className="gap-2 px-8">
                <Eye className="w-5 h-5" />
                View Public Roadmap
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-border/50">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>1,200+ Researchers Engaged</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>350+ Feature Suggestions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Open Development Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
