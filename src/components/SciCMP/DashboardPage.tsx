'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  RotateCcw,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Cpu,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Package,
  GitBranch,
  Settings,
  Bell,
  ChevronRight,
  Zap,
  BarChart3,
  Layers,
  // Research Trends Icons
  Brain,
  LayoutTemplate,
  MousePointer2,
  Smartphone,
  Atom,
  Calculator,
  Database,
  FileOutput,
  Wifi,
  Glasses,
  Network,
  Tablet,
  Sparkles,
  Lock,
  Unlock,
  Star,
  Rocket,
  Target,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  Crown,
  Gift,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  Puzzle,
  MessageSquare,
  Eye
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
  icon: React.ReactNode;
  features: ResearchFeature[];
  vision: string;
}

const researchPhases: PhaseData[] = [
  {
    id: 'phase1',
    title: 'Phase 1',
    subtitle: 'Intelligent Workflows & Collaboration',
    timeline: 'Q4 2026 - Available Now',
    status: 'active',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    icon: <Brain className="w-6 h-6" />,
    vision: 'Empowering researchers with AI-assisted workflows and seamless collaboration tools that adapt to your research style.',
    features: [
      {
        id: 'ai-workflows',
        title: 'AI-Powered Workflow Recommendations',
        description: 'Intelligent suggestions based on your research patterns, automatically optimizing compute resources and suggesting next steps.',
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
        description: 'Pre-built, peer-reviewed templates for bioinformatics, cheminformatics, physics simulations, and more.',
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
        description: 'Real-time co-editing with live cursors, threaded comments, version history, and instant sharing.',
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
        description: 'Responsive design optimized for tablets and phones with offline support and push notifications.',
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
    timeline: 'Q1-Q2 2027 - Coming Soon',
    status: 'upcoming',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    icon: <Atom className="w-6 h-6" />,
    vision: 'Bridging classical and quantum computing with advanced analytics and seamless database integrations.',
    features: [
      {
        id: 'quantum-sim',
        title: 'Quantum Computing Simulation Mode',
        description: 'Simulate quantum algorithms on classical hardware, preparing for the quantum advantage era.',
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
        description: 'Industry-standard statistical tools with Bayesian methods, causal inference, and uncertainty quantification.',
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
        description: 'Seamless connectivity to PubMed, arXiv, PDB, UniProt, and other scientific repositories.',
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
        description: 'Transform results into publication-ready documents with one click, including figures, tables, and citations.',
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
    timeline: 'Q3-Q4 2027+ - Vision',
    status: 'future',
    color: 'rose',
    gradient: 'from-rose-500 to-orange-600',
    icon: <Rocket className="w-6 h-6" />,
    vision: 'Pioneering the next generation of scientific computing with quantum connectivity, immersive visualization, and federated intelligence.',
    features: [
      {
        id: 'quantum-live',
        title: 'Actual Quantum Compute Connectivity',
        description: 'Direct access to IBM Quantum, Google Quantum AI, Rigetti, and other quantum processing units.',
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
        description: 'Immersive 3D environments for molecular exploration, data visualization, and virtual lab experiences.',
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
        description: 'Train models across institutions without sharing sensitive data, enabling privacy-preserving collaboration.',
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
        description: 'Native iOS and Android applications with full platform capabilities, including job submission and monitoring.',
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
    available: { label: 'Available', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
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
    paper: { icon: <FileText className="w-3 h-3" />, color: 'text-orange-600' },
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
          
          {/* Expand/Collapse Button */}
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
              
              {/* Upgrade Prompt for Premium/Freemium */}
              {(feature.tier === 'premium' || feature.tier === 'freemium') && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Want full access?</span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1 text-xs h-8">
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
      
      {/* Always show resource count when collapsed */}
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
      class: 'border-emerald-500/30 bg-emerald-500/5'
    },
    upcoming: {
      badge: '🔮 Coming Soon',
      class: 'border-violet-500/30 bg-violet-500/5'
    },
    future: {
      badge: '🌟 Future Vision',
      class: 'border-rose-500/30 bg-rose-500/5'
    }
  };
  
  return (
    <div className={`${isLast ? '' : 'mb-8'}`}>
      {/* Phase Header */}
      <div
        className={`rounded-2xl border-2 p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${statusConfig[phase.status].class}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${phase.gradient} text-white shadow-lg`}>
              {phase.icon}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl md:text-3xl font-bold">{phase.title}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/80 backdrop-blur">
                  {statusConfig[phase.status].badge}
                </span>
              </div>
              <p className="text-lg text-muted-foreground font-medium">{phase.subtitle}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {phase.timeline}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm text-muted-foreground">Features</p>
              <p className="text-2xl font-bold text-primary">{phase.features.length}</p>
            </div>
            <div className={`p-2 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        {/* Vision Statement */}
        <div className="mt-6 p-4 rounded-xl bg-background/60 backdrop-blur border border-border/50">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              "{phase.vision}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Phase Features (Expandable) */}
      {isExpanded && (
        <div className="mt-6 grid gap-4 md:gap-6 animate-in slide-in-from-top-4 duration-300">
          {phase.features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
          
          {/* Phase CTA */}
          <div className={`rounded-xl p-6 bg-gradient-to-r ${phase.gradient} text-white`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg mb-1">
                  Ready to Explore {phase.title}?
                </h4>
                <p className="text-white/80 text-sm">
                  {phase.status === 'active' 
                    ? 'Start using these features today with our free tier.'
                    : phase.status === 'upcoming'
                    ? 'Join the waitlist for early access to these upcoming features.'
                    : 'Share your feedback to shape the future of scientific computing.'}
                </p>
              </div>
              
              <div className="flex gap-3">
                {phase.status === 'active' && (
                  <>
                    <Button variant="secondary" size="sm" className="gap-2 whitespace-nowrap">
                      <Play className="w-4 h-4" />
                      Get Started Free
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
                      <BookOpen className="w-4 h-4" />
                      View Documentation
                    </Button>
                  </>
                )}
                
                {phase.status === 'upcoming' && (
                  <>
                    <Button variant="secondary" size="sm" className="gap-2 whitespace-nowrap">
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
                      <Eye className="w-4 h-4" />
                      Preview Demo
                    </Button>
                  </>
                )}
                
                {phase.status === 'future' && (
                  <>
                    <Button variant="secondary" size="sm" className="gap-2 whitespace-nowrap">
                      <MessageSquare className="w-4 h-4" />
                      Share Feedback
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-white border-white/30 hover:bg-white/10 whitespace-nowrap">
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const sidebarItems = [
    { id: 'overview', icon: <BarChart3 className="w-5 h-5" />, label: 'Overview' },
    { id: 'workspaces', icon: <Layers className="w-5 h-5" />, label: 'Workspaces' },
    { id: 'jobs', icon: <Activity className="w-5 h-5" />, label: 'Jobs' },
    { id: 'packages', icon: <Package className="w-5 h-5" />, label: 'Packages' },
    { id: 'trends', icon: <TrendingUp className="w-5 h-5" />, label: 'Research Trends' },
    { id: 'terminal', icon: <Terminal className="w-5 h-5" />, label: 'Terminal' },
    { id: 'collaborators', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const workspaces = [
    { id: 'ws1', name: 'Protein Folding Analysis', files: 147, jobs: 892, updated: '2 hours ago', status: 'active' },
    { id: 'ws2', name: 'Drug Discovery Pipeline', files: 234, jobs: 1247, updated: '5 hours ago', status: 'active' },
    { id: 'ws3', name: 'Genome Sequencing Project', files: 89, jobs: 456, updated: '1 day ago', status: 'idle' },
    { id: 'ws4', name: 'Materials Simulation', files: 56, jobs: 234, updated: '3 days ago', status: 'completed' },
  ];

  const recentJobs = [
    { id: 'job1', name: 'BLAST+ Sequence Search', package: '@ncbi/blast-plus', status: 'completed', duration: '45 min', cost: '$0.45', time: '10 min ago' },
    { id: 'job2', name: 'Molecular Docking (Glide)', package: '@schrodinger/glide', status: 'running', progress: 67, duration: '2h 15m remaining', cost: '$12.30 so far', time: 'Running' },
    { id: 'job3', name: 'DFT Calculation (VASP)', package: '@vasp/vasp', status: 'queued', duration: '~8h estimated', cost: '$24.00 estimated', time: 'In queue' },
    { id: 'job4', name: 'ML Training (PyTorch)', package: '@pytorch/pytorch', status: 'failed', duration: '1h 20m', cost: '$8.50', time: '2 hours ago' },
    { id: 'job5', name: 'RNA-seq Analysis (DESeq2)', package: '@bioconductor/deseq2', status: 'completed', duration: '32 min', cost: '$0.22', time: '4 hours ago' },
  ];

  const packages = [
    { name: '@ncbi/blast-plus', version: '2.15.0', downloads: '125K', category: 'Bioinformatics' },
    { name: '@schrodinger/glide', version: '2024.2', downloads: '45K', category: 'Cheminformatics' },
    { name: '@vasp/vasp', version: '6.4.3', downloads: '32K', category: 'Materials Science' },
    { name: '@pytorch/pytorch', version: '2.1.0', downloads: '89K', category: 'Machine Learning' },
    { name: '@rdkit/rdkit', version: '2023.09', downloads: '56K', category: 'Cheminformatics' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'running': return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
      case 'failed': return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'queued': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FlaskConical className="w-8 h-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your research overview and future roadmap.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
              <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
            </Button>
            <Button size="sm" className="gradient-bg text-white border-0 gap-2">
              <Plus className="w-4 h-4" />
              New Workspace
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Workspaces', value: '4', icon: <Layers className="w-5 h-5" />, change: '+1 this week', color: 'text-blue-600' },
            { label: 'Jobs Completed', value: '2,829', icon: <CheckCircle2 className="w-5 h-5" />, change: '+127 this month', color: 'text-green-600' },
            { label: 'Compute Hours', value: '1,247', icon: <Cpu className="w-5 h-5" />, change: '-12% vs last month', color: 'text-purple-600' },
            { label: 'Total Cost (MTD)', value: '$342.50', icon: <TrendingUp className="w-5 h-5" />, change: '+8% vs budget', color: 'text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="lg:sticky lg:top-24 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'trends' && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 animate-pulse"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Research Trends Tab - NEW SECTION */}
            {activeTab === 'trends' && (
              <div className="space-y-8">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 md:p-12 text-white">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-500 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur border border-white/20">
                        Current Research Trends
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      The Future of Scientific Computing
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                      Explore our phased roadmap integrating cutting-edge AI, quantum computing simulation, 
                      and collaborative tools designed to accelerate your research journey.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm"><strong>Phase 1:</strong> Available Now</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm"><strong>Phase 2:</strong> Q1-Q2 2027</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur">
                        <Rocket className="w-4 h-4 text-rose-400" />
                        <span className="text-sm"><strong>Phase 3:</strong> Q3 2027+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Features', value: '12', icon: <Zap className="w-4 h-4" /> },
                    { label: 'Free Tier Items', value: '28+', icon: <Gift className="w-4 h-4" /> },
                    { label: 'In Development', value: '4', icon: <Loader2 className="w-4 h-4 animate-spin" /> },
                    { label: 'Community Votes', value: '1.2K', icon: <Users className="w-4 h-4" /> },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border bg-card text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary mb-2">
                        {stat.icon}
                      </div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Phase Sections */}
                {researchPhases.map((phase, idx) => (
                  <PhaseSection key={phase.id} phase={phase} isLast={idx === researchPhases.length - 1} />
                ))}

                {/* Bottom CTA */}
                <div className="rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center bg-gradient-to-b from-primary/5 to-transparent">
                  <div className="max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Have Ideas for Future Features?</h3>
                    <p className="text-muted-foreground mb-6">
                      We're building SciCMPMATH for researchers like you. Share your vision and help shape the platform's evolution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button size="lg" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Submit Feature Request
                      </Button>
                      <Button variant="outline" size="lg" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Join Community Discussion
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workspaces Tab */}
            {activeTab === 'workspaces' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Workspaces</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {workspaces.map((workspace) => (
                    <div
                      key={workspace.id}
                      className="p-6 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {workspace.name}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              workspace.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {workspace.status}
                            </span>
                          </div>
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" /> {workspace.files} files
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" /> {workspace.jobs} jobs
                            </span>
                            <span>Updated {workspace.updated}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Jobs</h2>
                  <Button size="sm" className="gradient-bg text-white border-0 gap-2">
                    <Play className="w-4 h-4" />
                    Submit New Job
                  </Button>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-semibold text-muted-foreground">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Job Name</div>
                    <div className="col-span-2">Package</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Duration / Cost</div>
                    <div className="col-span-2">Time</div>
                  </div>

                  {/* Table Rows */}
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job.id === selectedJob ? null : job.id)}
                      className={`grid grid-cols-12 gap-4 p-4 border-t items-center cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedJob === job.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="col-span-1">{getStatusIcon(job.status)}</div>
                      <div className="col-span-3 font-medium truncate">{job.name}</div>
                      <div className="col-span-2 text-sm text-muted-foreground truncate">{job.package}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                          {job.status === 'running' && (
                            <span className="ml-1">{job.progress}%</span>
                          )}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div>{job.duration}</div>
                        <div className="text-muted-foreground">{job.cost}</div>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{job.time}</div>
                    </div>
                  ))}
                </div>

                {/* Job Details Panel */}
                {selectedJob && (
                  <div className="p-6 rounded-xl border bg-card mt-4 animate-in slide-in-from-bottom-2">
                    <h3 className="font-semibold mb-4">Job Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Job ID</p>
                        <p className="font-mono">{selectedJob}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Workspace</p>
                        <p>Drug Discovery Pipeline</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Resources Used</p>
                        <p>16 CPU cores, 64GB RAM, GPU: T4 x1</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Environment</p>
                        <p>python-3.11-bio (Docker)</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Rerun Job
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" />
                        View Logs
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        Download Results
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">SciPKG Registry</h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Search className="w-4 h-4" />
                    Search Packages
                  </Button>
                </div>

                <div className="grid gap-4">
                  {packages.map((pkg, index) => (
                    <div key={index} className="p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                            {pkg.name.charAt(1).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{pkg.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>v{pkg.version}</span>
                              <span>•</span>
                              <span>{pkg.category}</span>
                              <span>•</span>
                              <span>{pkg.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Install
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Tab (Default) */}
            {(activeTab === 'overview' || !['workspaces', 'jobs', 'packages', 'trends'].includes(activeTab)) && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Run BLAST Search', desc: 'Sequence alignment against NCBI databases', icon: <Zap className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
                    { title: 'Start Docking', desc: 'Virtual screening with Glide/AutoDock', icon: <Cpu className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
                    { title: 'Launch Notebook', desc: 'Interactive Jupyter environment', icon: <Terminal className="w-5 h-5" />, color: 'from-orange-500 to-orange-600' },
                    { title: 'Upload Dataset', desc: 'Import FASTA, PDB, SDF files', icon: <HardDrive className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
                    { title: 'View Reports', desc: 'Generate publication-ready figures', icon: <FileText className="w-5 h-5" />, color: 'from-pink-500 to-pink-600' },
                    { title: 'Invite Collaborator', desc: 'Share workspace with team members', icon: <Users className="w-5 h-5" />, color: 'from-cyan-500 to-cyan-600' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="p-4 rounded-xl border bg-card hover:shadow-md transition-all text-left group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Recent Activity Feed */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      { action: 'Completed', item: 'BLAST+ job #2847', time: '10 minutes ago', type: 'success' },
                      { action: 'Started', item: 'Molecular docking batch', time: '25 minutes ago', type: 'info' },
                      { action: 'Invited', item: 'dr.sarah.chen@mit.edu to workspace', time: '1 hour ago', type: 'info' },
                      { action: 'Published', item: 'Custom pipeline v2.1', time: '3 hours ago', type: 'success' },
                      { action: 'Failed', item: 'DFT calculation (memory exceeded)', time: '5 hours ago', type: 'error' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card border">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <span className="font-medium">{activity.action}</span>{' '}
                          <span className="text-muted-foreground">{activity.item}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
