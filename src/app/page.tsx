'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SciCMPHeader from '@/components/SciCMP/Header';
import SciCMPFooter from '@/components/SciCMP/Footer';
import LoginModal from '@/components/SciCMP/LoginModal';
import { useAuthStore } from '@/lib/auth-store';

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

const TemplateGalleryPage = dynamic(() => import('@/components/SciCMP/TemplateGalleryPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

const MLResearchPage = dynamic(() => import('@/components/SciCMP/MLResearchPage'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

import FloatingNavigationButtons from '@/components/SciCMP/FloatingNavigationButtons';

type PageId = 'landing' | 'dashboard' | 'features' | 'template-gallery' | 'ml-research' | 'research-trends' | 'pricing' | 'about';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  // Initialize dark mode from localStorage or default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('scicmp-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme ? savedTheme === 'dark' : prefersDark || true;
    }
    return true; // Default to dark for SSR
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setShowLoginModal } = useAuthStore();

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
    setIsDarkMode(prev => {
      const newValue = !prev;
      // Persist theme preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('scicmp-theme', newValue ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newValue);
      }
      return newValue;
    });
  }, []);

  // Apply dark mode class to document on mount and when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

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

  const handleOpenLoginModal = useCallback(() => {
    setShowLoginModal(true);
  }, [setShowLoginModal]);

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
      case 'template-gallery':
        return <TemplateGalleryPage />;
      case 'ml-research':
        return <MLResearchPage />;
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
          onOpenLoginModal={handleOpenLoginModal}
        />

        {/* Main Content Area */}
        <main className={`flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {renderCurrentPage()}
        </main>

        {/* Footer */}
        <SciCMPFooter onNavigate={handleNavigate} />
      </div>

      {/* Floating Navigation Buttons - Visible on ALL pages */}
      <FloatingNavigationButtons 
        onNavigate={handleNavigate}
        showStudioIDE={true}
      />

      {/* Login Modal - Global */}
      <LoginModal />

      {/* Page Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
        </div>
      )}
    </div>
  );
}
