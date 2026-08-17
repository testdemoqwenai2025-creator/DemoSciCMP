'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Home, Code2 } from 'lucide-react';

/**
 * FloatingNavigationButtons - Provides global navigation on all pages
 * 
 * Features:
 * - "Back to Top" button (appears after scrolling 300px)
 * - "Return Home" button (always visible)
 * - "Open Studio IDE" quick access
 * - Smooth scroll animations
 * - Responsive design
 */
export default function FloatingNavigationButtons({ 
  onNavigate,
  showStudioIDE = true 
}: { 
  onNavigate?: (pageId: string) => void;
  showStudioIDE?: boolean;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Delay hiding for smooth transition
        setTimeout(() => setShowBackToTop(false), 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate to home
  const goHome = () => {
    if (onNavigate) {
      onNavigate('landing');
      // Also scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback for external use
      window.location.href = '/DemoSciCMP/';
    }
  };

  // Open Studio IDE
  const openStudioIDE = () => {
    window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Back to Top Button */}
      <div
        className={`transition-all duration-300 transform ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
          title="Back to Top"
        >
          <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </div>

      {/* Return Home Button */}
      <Button
        onClick={goHome}
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
        title="Return to Home"
      >
        <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </Button>

      {/* Studio IDE Quick Access */}
      {showStudioIDE && (
        <Button
          onClick={openStudioIDE}
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
          title="Open in Studio IDE"
        >
          <Code2 className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </Button>
      )}

      {/* Tooltip / Label (optional visual indicator) */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Quick Nav
        </div>
      </div>
    </div>
  );
}

/**
 * Alternative: Minimal version with just icons (for mobile)
 */
export function MinimalFloatingNav({ onNavigate }: { onNavigate?: (pageId: string) => void }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 md:hidden">
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={onNavigate ? () => onNavigate('landing') : undefined}
        className="w-10 h-10 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center"
      >
        <Home className="h-4 w-4" />
      </button>
    </div>
  );
}
