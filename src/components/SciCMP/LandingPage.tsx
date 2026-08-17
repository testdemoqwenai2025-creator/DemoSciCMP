'use client';

import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Globe,
  Cpu,
  Database,
  FlaskConical,
  Users,
  Star,
  ChevronRight,
  Code2,
  ExternalLink,
  Atom,
  Target
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (pageId: string) => void;
}

const stats = [
  { value: '50B+', label: 'TAM Opportunity' },
  { value: '10K+', label: 'Researchers Target' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<3s', label: 'Job Start Time' },
];

const features = [
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: 'Unified Scientific Environment',
    description: 'One platform for bioinformatics, cheminformatics, materials science, physics, and more.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Cloud-Native Compute',
    description: 'From CPU clusters to GPU acceleration. Scale from simple scripts to HPC simulations.',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Reproducibility Engine',
    description: 'Every computation is fully traceable, versioned, and citable with DOIs.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II, HIPAA, GDPR compliant. Your data stays yours.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Collaboration',
    description: 'Work across institutions with real-time collaboration and shared workspaces.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'AI-Powered Assistance',
    description: 'Natural language to workflow execution. Let AI accelerate your research.',
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Postdoc, MIT Bioinformatics',
    content: 'Finally, a platform that understands scientists. My collaborators can actually reproduce my work now.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Sr. Computational Chemist, PharmaCorp',
    content: 'Cut our virtual screening time by 60%. The compliance features made audit preparation seamless.',
    rating: 5,
  },
  {
    name: 'Prof. Yuki Tanaka',
    role: 'Materials Science, Tokyo Tech',
    content: 'Managing my lab of 25 researchers has never been easier. Institutional memory is finally preserved.',
    rating: 5,
  },
];

const logos = [
  'MIT', 'Stanford', 'Harvard', 'Caltech', 'Oxford', 'Tokyo Tech', 'Tsinghua', 'ETH Zurich'
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 -z-10" />
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary">Now in Public Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
              GitHub for Scientific Computing
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Unify fragmented scientific tools into one collaborative workspace. 
            Discover, share, and reproduce computational research at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="gradient-bg text-white border-0 rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              onClick={() => onNavigate('dashboard')}
            >
              Try Dashboard Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-cyan-500/30 text-cyan-600 hover:bg-cyan-500/10 hover:text-cyan-700 transition-all"
              onClick={() => window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer')}
            >
              <Code2 className="mr-2 h-5 w-5" />
              Open in Studio IDE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => onNavigate('features')}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo (Coming Soon)
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by leading research institutions worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="text-xl sm:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need for{' '}
              <span className="text-primary">Scientific Discovery</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From sequence analysis to molecular dynamics, SciCMPMATH provides 
              the complete toolkit for modern computational research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('features')}
            >
              Explore All Features
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Researchers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what scientists are saying about their experience with SciCMPMATH.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border bg-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-bg opacity-90" />
            <div className="absolute inset-0 bg-slate-900 opacity-10" />
            
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Accelerate Your Research?
              </h2>
              <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Join thousands of scientists who are already using SciCMPMATH 
                to democratize scientific discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-8 py-6 text-lg font-semibold"
                  onClick={() => onNavigate('pricing')}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10"
                  onClick={() => onNavigate('about')}
                >
                  Contact Sales
                </Button>
              </div>
              
              {/* Trust signals */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free tier available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10K+ researchers trust us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Template Section - Direct Link to Docking */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <Atom className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Featured Template</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Try Our Most Popular Template
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Molecular Docking Workflow — AutoDock Vina pipeline for drug discovery research.
                One-click setup with pre-configured parameters.
              </p>
            </div>

            {/* Template Card */}
            <div className="bg-card border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Icon & Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                      🧬
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Molecular Docking Workflow</h3>
                      <p className="text-muted-foreground">Chemo-informatics • Advanced • AutoDock Vina</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-cyan-600">10K+</div>
                      <div className="text-xs text-muted-foreground">Compounds</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-cyan-600">&lt;3min</div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-cyan-600">99.2%</div>
                      <div className="text-xs text-muted-foreground">Reproducible</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-cyan-600">150+</div>
                      <div className="text-xs text-muted-foreground">Citations</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AutoDock Vina docking pipeline with ligand preparation, receptor setup, 
                    binding pose analysis, and scoring visualization for drug discovery research.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Button
                    onClick={() => window.open('/DemoSciCMP/templates/cheminformatics/docking.html', '_blank', 'noopener,noreferrer')}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Open Template
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer')}
                    className="w-full border-cyan-500/30 text-cyan-600 hover:bg-cyan-500/10 hover:text-cyan-700 transition-all"
                  >
                    <Code2 className="mr-2 h-4 w-4" />
                    Open in Studio IDE
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('template-gallery')}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    View All Templates →
                  </Button>
                </div>
              </div>
            </div>

            {/* Path indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Main Page</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-cyan-600 font-medium">Molecular Docking Template</span>
              <ChevronRight className="w-4 h-4" />
              <span>Studio IDE</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
