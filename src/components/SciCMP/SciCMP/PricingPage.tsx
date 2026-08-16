'use client';

import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Building2,
  Rocket,
  HelpCircle,
  Crown
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (pageId: string) => void;
}

const plans = [
  {
    name: 'Community',
    icon: <Rocket className="w-6 h-6" />,
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for individual researchers and students',
    highlighted: false,
    cta: 'Get Started Free',
    features: [
      { text: '5 workspaces', included: true },
      { text: '50GB storage', included: true },
      { text: 'Tier 1 compute (up to 4 CPU cores)', included: true },
      { text: 'Community support', included: true },
      { text: 'Public packages only', included: true },
      { text: 'Basic collaboration (up to 3 members)', included: true },
      { text: 'Reproducibility engine', included: true },
      { text: 'GPU access', included: false },
      { text: 'Priority job queue', included: false },
      { text: 'SSO/SAML authentication', included: false },
      { text: 'Audit logs & compliance', included: false },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    name: 'Professional',
    icon: <Zap className="w-6 h-6" />,
    price: { monthly: 49, annual: 39 },
    description: 'For active researchers and small teams',
    highlighted: true,
    cta: 'Start Free Trial',
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited workspaces', included: true },
      { text: '500GB storage', included: true },
      { text: 'Tier 2 compute (up to 16 CPU cores)', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Private packages', included: true },
      { text: 'Team collaboration (up to 25 members)', included: true },
      { text: 'Advanced reproducibility tools', included: true },
      { text: 'GPU access (T4 instances)', included: true },
      { text: 'Priority job queue', included: true },
      { text: 'SSO/SAML authentication', included: false },
      { text: 'Audit logs & compliance', included: false },
      { text: 'Dedicated success manager', included: false },
    ],
  },
  {
    name: 'Enterprise',
    icon: <Building2 className="w-6 h-6" />,
    price: { monthly: null, annual: null },
    description: 'For organizations with advanced needs',
    highlighted: false,
    cta: 'Contact Sales',
    badge: 'Custom Pricing',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Unlimited storage (PB-scale)', included: true },
      { text: 'Tier 3 compute (up to 128 cores + A100 GPUs)', included: true },
      { text: '24/7 phone & dedicated support', included: true },
      { text: 'Private registry with admin controls', included: true },
      { text: 'Unlimited collaboration', included: true },
      { text: 'Full reproducibility suite', included: true },
      { text: 'Premium GPU access (A100, V100)', included: true },
      { text: 'Dedicated compute pools', included: true },
      { text: 'SSO/SAML + MFA enforcement', included: true },
      { text: 'SOC 2, HIPAA, GDPR compliance', included: true },
      { text: 'Dedicated CSM & solution architect', included: true },
    ],
  },
];

const faqs = [
  {
    question: 'Is there really a free tier?',
    answer: 'Yes! Our Community plan is free forever for academic and personal use. No credit card required. You get access to core platform features with generous compute limits.',
  },
  {
    question: 'Can I switch plans at any time?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.',
  },
  {
    question: 'What counts as a "job" or computation?',
    answer: 'Any execution of a scientific package or custom script counts as a job. This includes BLAST searches, molecular docking, DFT calculations, ML training runs, and more.',
  },
  {
    question: 'Do you offer discounts for academics?',
    answer: 'Yes! We offer 50% off Professional plans for verified academic users. We also have special programs for underfunded institutions and researchers in developing countries.',
  },
  {
    question: 'How does billing work for compute resources?',
    answer: 'Each plan includes a base compute allocation. Additional usage is billed per compute-hour at transparent rates. Enterprise customers can opt for reserved capacity with predictable costs.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We\'re SOC 2 Type II certified and HIPAA compliant. Your data belongs to you—we never sell or share it.',
  },
];

export default function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Simple, Transparent{' '}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-muted">
              <span className="px-4 py-2 text-sm font-medium">Monthly</span>
              <button className="relative w-14 h-7 rounded-full bg-primary transition-colors">
                <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white transition-transform shadow-sm" />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-primary">
                Annual <span className="text-xs text-green-600">(Save 20%)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border bg-card overflow-hidden ${
                  plan.highlighted
                    ? 'border-primary shadow-xl shadow-primary/10 scale-105 z-10'
                    : 'hover:shadow-lg transition-shadow'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="gradient-bg text-white text-xs font-semibold px-4 py-1 rounded-bl-xl">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.highlighted ? 'bg-primary text-white' : 'bg-muted'
                    }`}>
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price.monthly !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${plan.price.annual}</span>
                        <span className="text-muted-foreground">/user/month</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold">Custom</div>
                    )}
                    {plan.price.monthly !== null && plan.price.annual !== plan.price.monthly && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually (${plan.price.monthly}/mo if monthly)
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full rounded-full py-6 text-base ${
                      plan.highlighted
                        ? 'gradient-bg text-white border-0'
                        : ''
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => onNavigate('about')}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* Features */}
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For large deployments, government contracts, or specialized requirements, 
              our enterprise team can build a tailored solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Contact Sales
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full px-8">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p class="text-muted-foreground">
                Everything you need to know about SciCMPMATH pricing
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group p-6 rounded-xl border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <summary className="font-semibold list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-4 text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Your Scientific Journey Today
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of researchers who are accelerating discovery with SciCMPMATH.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8 py-6 text-lg font-semibold"
            onClick={() => onNavigate('dashboard')}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
