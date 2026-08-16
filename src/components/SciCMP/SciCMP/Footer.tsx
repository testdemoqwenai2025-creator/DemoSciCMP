'use client';

import { FlaskConical, Github, Twitter, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (pageId: string) => void;
}

const footerLinks = {
  Product: [
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'dashboard', label: 'Dashboard' },
  ],
  Company: [
    { id: 'about', label: 'About Us' },
    { id: 'about', label: 'Team' },
    { id: 'landing', label: 'Blog (Coming Soon)' },
  ],
  Resources: [
    { id: 'landing', label: 'Documentation' },
    { id: 'landing', label: 'API Reference' },
    { id: 'landing', label: 'Status Page' },
  ],
  Legal: [
    { id: 'landing', label: 'Privacy Policy' },
    { id: 'landing', label: 'Terms of Service' },
    { id: 'landing', label: 'Cookie Policy' },
  ],
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-8 h-8 text-primary" />
              <span className="font-bold text-lg">SciCMPMATH</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The GitHub for Scientific Computing. Democratizing discovery through unified computational platforms.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/testdemoqwenai2025-creator/SciCMPMATH"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:testdemoqwenai2025@gmail.com"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © 2026 Endeavor Science (AETH-1). Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            for science.
          </p>
          <p className="text-xs text-muted-foreground">
            Preview Demo • Built with Next.js & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
