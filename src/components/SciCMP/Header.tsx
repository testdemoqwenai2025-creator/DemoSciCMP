'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FlaskConical, 
  ChevronDown,
  Github,
  Twitter,
  Code2,
  ArrowUp,
  Home
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const navItems = [
  { id: 'landing', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'template-gallery', label: 'Templates' },
  { id: 'ml-research', label: 'ML Research ⭐' },
  { id: 'research-trends', label: 'Research Trends' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
];

export default function Header({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-10 h-10">
                <FlaskConical className="w-10 h-10 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  SciCMPMATH
                </h1>
                <p className="text-[10px] text-muted-foreground -mt-1">by Endeavor Science</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>

            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex rounded-full"
              asChild
            >
              <a
                href="https://github.com/testdemoqwenai2025-creator/SciCMPMATH"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* Studio IDE Button - Visible on ALL pages */}
            <Button
              onClick={() => window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer')}
              className="hidden md:flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full px-4 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              title="Open in Studio IDE"
            >
              <Code2 className="mr-1.5 h-4 w-4" />
              <span className="hidden lg:inline">Studio IDE</span>
            </Button>

            {/* CTA Button */}
            <Button
              className="hidden sm:flex gradient-bg text-white border-0 rounded-full px-5"
              onClick={() => onNavigate('pricing')}
            >
              Get Started
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={onToggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 p-2 bg-card rounded-xl border shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t mt-2 pt-2">
                <Button
                  className="w-full gradient-bg text-white border-0 rounded-lg"
                  onClick={() => onNavigate('pricing')}
                >
                  Get Started Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
