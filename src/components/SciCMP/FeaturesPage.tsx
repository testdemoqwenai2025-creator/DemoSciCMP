'use client';

import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  ArrowRight,
  FlaskConical,
  Cpu,
  Database,
  Shield,
  Globe,
  Zap,
  GitBranch,
  Users,
  Lock,
  Cloud,
  Code2,
  BarChart3,
  Puzzle,
  Atom,
  Dna,
  Microscope
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Core Platform',
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    features: [
      {
        name: 'Unified Workspace',
        description: 'One environment for all your scientific computing needs. No more switching between tools.',
        details: ['Integrated file browser', 'Multi-format support (FASTA, PDB, SDF, CSV)', 'Version control built-in', 'Smart search across all files'],
      },
      {
        name: 'SciPKG Package Manager',
        description: 'The npm for science. Discover, install, and share scientific software packages.',
        details: ['50,000+ pre-configured packages', 'Dependency resolution', 'Version pinning for reproducibility', 'Community ratings & reviews'],
      },
      {
        name: 'Cloud-Native Compute',
        description: 'From simple scripts to HPC simulations. Scale seamlessly without infrastructure management.',
        details: ['CPU, GPU, and high-memory instances', 'Auto-scaling based on workload', 'Spot instance optimization', 'Multi-region deployment'],
      },
    ],
  },
  {
    title: 'Reproducibility',
    icon: <Database className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    features: [
      {
        name: 'Environment Snapshots',
        description: 'Capture complete computational environments with one click.',
        details: ['Docker containerization', 'Conda environment export', 'Dependency lock files', 'Automatic versioning'],
      },
      {
        name: 'Execution Logging',
        description: 'Every computation is fully traceable and auditable.',
        details: ['Complete parameter logging', 'Input/output checksums', 'Timing & resource metrics', 'Citation-ready outputs'],
      },
      {
        name: 'DOI Assignment',
        description: 'Get persistent identifiers for your computations and datasets.',
        details: ['Zenodo integration', 'Automatic metadata generation', 'Citation text generation', 'FAIR compliance'],
      },
    ],
  },
  {
    title: 'Collaboration',
    icon: <Users className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    features: [
      {
        name: 'Real-Time Collaboration',
        description: 'Work together like you\'re in the same room, even when you\'re not.',
        details: ['Simultaneous editing', 'Presence indicators', 'Inline comments', 'Video calls integrated'],
      },
      {
        name: 'Organization Management',
        description: 'Manage teams, permissions, and resources at scale.',
        details: ['Role-based access control', 'Team workspaces', 'Resource quotas', 'SSO/SAML support'],
      },
      {
        name: 'Sharing & Publishing',
        description: 'Control who sees what. From private to public with granular controls.',
        details: ['Public/private/organization visibility', 'Forking & cloning', 'Embargo periods', 'License selection'],
      },
    ],
  },
  {
    title: 'Enterprise Features',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-orange-500 to-orange-600',
    features: [
      {
        name: 'Security & Compliance',
        description: 'Meet the strictest requirements without sacrificing productivity.',
        details: ['SOC 2 Type II certified', 'HIPAA BAA available', 'GDPR compliant', 'FDA 21 CFR Part 11 ready'],
      },
      {
        name: 'Audit Trails',
        description: 'Complete, immutable logs for every action on the platform.',
        details: ['User activity logging', 'Data access records', 'Electronic signatures', 'Exportable reports'],
      },
      {
        name: 'Integrations',
        description: 'Connect with your existing tools and workflows.',
        details: ['GitHub/GitLab sync', 'Slack/Teams notifications', 'LIMS integration', 'REST API & webhooks'],
      },
    ],
  },
];

const domainSupport = [
  { name: 'Bioinformatics', icon: <Dna className="w-8 h-8" />, tools: 'BLAST, BWA, GATK, DESeq2, CellRanger' },
  { name: 'Cheminformatics', icon: <Atom className="w-8 h-8" />, tools: 'RDKit, OpenBabel, Schrödinger, AutoDock' },
  { name: 'Materials Science', icon: <Microscope className="w-8 h-8" />, tools: 'VASP, Quantum ESPRESSO, LAMMPS, ASE' },
  { name: 'Physics', icon: <Zap className="w-8 h-8" />, tools: 'ROOT, Geant4, COMSOL, MATLAB' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Powerful Features for{' '}
              <span className="text-primary">Modern Science</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to accelerate discovery, ensure reproducibility, 
              and collaborate seamlessly—all in one unified platform.
            </p>
          </div>
        </div>
      </section>

      {/* Domain Support */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold mb-12">Built for Every Scientific Domain</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainSupport.map((domain, index) => (
              <div key={index} className="p-6 rounded-xl border bg-card text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  {domain.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{domain.name}</h3>
                <p className="text-sm text-muted-foreground">{domain.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, catIndex) => (
        <section key={catIndex} className={`py-24 ${catIndex % 2 === 1 ? 'bg-muted/30' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {category.features.map((feature, featIndex) => (
                <div key={featIndex} className="group p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* AI Features Highlight */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-background to-purple-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  Coming Soon
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  AI-Powered Scientific Assistant
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our upcoming AI assistant "Aethel" will transform how you interact with 
                  computational tools. Describe what you want in natural language, and let 
                  AI handle the complexity.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'Natural language to workflow translation',
                    'Intelligent error diagnosis & suggestions',
                    'Optimal parameter recommendations',
                    'Automated experiment design',
                    'Literature correlation mining',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" variant="outline" className="rounded-full">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="rounded-2xl border bg-card p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-sm text-muted-foreground">Aethel AI Terminal</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <p><span className="text-green-500">$</span> Run BLAST search against NR database</p>
                    <p className="text-muted-foreground">🔍 Parsing your request...</p>
                    <p className="text-muted-foreground">📦 Detected tool: NCBI BLAST+</p>
                    <p className="text-muted-foreground">🎯 Database: nr (non-redundant)</p>
                    <p className="text-muted-foreground">⚙️ Configuring parameters...</p>
                    <p><span className="text-cyan-400">✨ Ready to execute!</span></p>
                    <p className="text-muted-foreground">Estimated time: ~45 min | Cost: $0.45</p>
                    <p><span className="text-green-500">$</span> <span className="animate-pulse">▍</span></p>
                  </div>
                </div>
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl transform translate-y-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience SciCMPMATH?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your free trial today and see why thousands of researchers 
            are making the switch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-bg text-white border-0 rounded-full px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
