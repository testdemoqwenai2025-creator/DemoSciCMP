'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SciCMPHeader from '@/components/SciCMP/Header';
import SciCMPFooter from '@/components/SciCMP/Footer';

// Dynamic imports for code splitting
const LandingPage = dynamic(() => import('@/components/SciCMP/LandingPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const DashboardPage = dynamic(() => import('@/components/SciCMP/DashboardPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const FeaturesPage = dynamic(() => import('@/components/SciCMP/FeaturesPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const PricingPage = dynamic(() => import('@/components/SciCMP/PricingPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const AboutPage = dynamic(() => import('@/components/SciCMP/AboutPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const ResearchTrendsPage = dynamic(() => import('@/components/SciCMP/ResearchTrendsPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

type PageId = 'landing' | 'dashboard' | 'features' | 'research-trends' | 'pricing' | 'about';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = useCallback((pageId: string) => {
    if (pageId === currentPage) return;
    
    setIsTransitioning(true);
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      setCurrentPage(pageId as PageId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  }, [currentPage]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', !isDarkMode);
    }
  }, [isDarkMode]);

  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDarkMode]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'research-trends':
        return <ResearchTrendsPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <SciCMPHeader 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Main Content Area */}
        <main className={`flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {renderCurrentPage()}
        </main>

        {/* Footer */}
        <SciCMPFooter onNavigate={handleNavigate} />
      </div>

      {/* Page Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
        </div>
      )}
    </div>
  );
}
