'use client';

import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Github,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Target,
  Heart,
  Lightbulb,
  Users,
  Award,
  Rocket,
  CheckCircle2
} from 'lucide-react';

const team = [
  {
    name: 'testdemo',
    role: 'Founder & Chief Architect',
    bio: 'Multi-disciplinary expert with sciences knowledge beyond graduate level and full-stack software development skills ranging from big data down to low-level programming (Assembly, C, Fortran, JVM, functional programming). Building the future of scientific computing.',
    avatar: 'T',
    color: 'from-blue-500 to-purple-600',
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Reproducibility First',
    description: 'Every feature is designed with reproducibility at its core. We believe science must be verifiable and transparent.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Driven',
    description: 'Built by scientists, for scientists. Our roadmap is shaped by the needs of our research community.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Open When Possible',
    description: 'We support open science. Free tier for academics, open-source tools, and FAIR data principles.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Innovation Constant',
    description: 'Pushing boundaries with AI integration, novel interfaces, and cutting-edge compute infrastructure.',
  },
];

const milestones = [
  { date: 'Q4 2026', title: 'Platform Launch', desc: 'MVP release with core scientific computing features', status: 'completed' },
  { date: 'Q1 2027', title: 'Enterprise Beta', desc: 'SOC 2 certification, SSO, advanced compliance features', status: 'in-progress' },
  { date: 'Q2 2027', title: 'Marketplace Opening', desc: 'Third-party developer program and app marketplace', status: 'upcoming' },
  { date: 'Q4 2027', title: 'Global Expansion', desc: 'Multi-region deployment including China market entry', status: 'upcoming' },
  { date: '2028', title: 'AI Assistant "Aethel"', desc: 'Natural language to workflow execution powered by AI', status: 'upcoming' },
];

const stats = [
  { value: '$50B+', label: 'Total Addressable Market' },
  { value: '24%', label: 'CAGR (Scientific Computing)' },
  { value: '10K+', label: 'Target Researchers Year 1' },
  { value: '99.9%', label: 'Uptime SLA Commitment' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Mission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Democratizing{' '}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Scientific Discovery
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the GitHub for scientific computing—a unified platform where 
              researchers can discover, share, reproduce, and collaborate on computational 
              research at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Problem We're Solving</h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Scientific computing today is fragmented. Researchers juggle dozens of 
                  tools across different platforms, spend weeks setting up environments, 
                  and struggle to reproduce results—even their own.
                </p>
                
                <p>
                  A bioinformatician needs BLAST, a chemist needs docking software, a 
                  materials scientist needs DFT codes. Each tool has different installation 
                  requirements, dependency hell, and no standard way to share workflows.
                </p>
                
                <p>
                  Meanwhile, software developers have had GitHub for over 15 years. They 
                  can share code, reproduce builds, and collaborate seamlessly. Scientists 
                  deserve the same.
                </p>
                
                <p className="font-semibold text-foreground">
                  That's why we built SciCMPMATH (AETH-1)—the GitHub for Scientific Computing.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-card p-8 shadow-xl">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Our Vision
                </h3>
                <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4">
                  "To accelerate human knowledge discovery by removing technical barriers 
                  to scientific computation—making world-class computational resources 
                  accessible to every researcher, everywhere."
                </blockquote>
                <p className="mt-4 font-medium">— testdemo, Founder</p>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl transform translate-y-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet The Founder</h2>
            <p className="text-lg text-muted-foreground">
              The visionary behind SciCMPMATH's mission to democratize scientific computing.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="p-8 rounded-2xl border bg-card text-center hover:shadow-xl transition-shadow">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6`}>
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{member.bio}</p>
                
                <div className="flex justify-center gap-3">
                  <a
                    href="https://github.com/testdemoqwenai2025-creator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:testdemoqwenai2025@gmail.com"
                    className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}

            {/* Join Us CTA */}
            <div className="mt-12 p-8 rounded-2xl border-2 border-dashed border-primary/30 text-center">
              <h3 className="text-xl font-semibold mb-2">Join Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                We're looking for passionate individuals who want to accelerate scientific discovery.
              </p>
              <Button variant="outline" className="rounded-full">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Roadmap</h2>
            <p className="text-lg text-muted-foreground">
              Where we've been and where we're going.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                      'bg-gray-300'
                    }`} />
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`pb-8 ${index === milestones.length - 1 ? '' : ''}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{milestone.date}</span>
                      {milestone.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      {milestone.status === 'in-progress' && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          In Progress
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl overflow-hidden gradient-bg p-12 text-center text-white relative">
              <div className="absolute inset-0 bg-slate-900 opacity-10" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Let's Build the Future of Science Together
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                  Whether you're a researcher, institution, or investor—we'd love to hear from you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-8"
                    asChild
                  >
                    <a href="mailto:testdemoqwenai2025@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Email Us
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="https://github.com/testdemoqwenai2025-creator/SciCMPMATH" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      View on GitHub
                    </a>
                  </Button>
                </div>

                <p className="mt-8 text-sm opacity-75">
                  testdemoqwenai2025@gmail.com • San Francisco, CA (Remote-first)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
