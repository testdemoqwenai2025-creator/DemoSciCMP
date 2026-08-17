/**
 * SciCMPMATH Scientific Premium - Progressive Enhancement Layer
 * ==============================================================
 * Layer 2-5: Enhanced Interactivity & Features
 * 
 * Features:
 * - Smart search with fuzzy matching
 * - Topic filtering system
 * - Smooth scroll animations
 * - Intersection Observer for reveal animations
 * - Keyboard navigation support
 * - Toast notification system (enhanced)
 * - Performance monitoring
 * - Analytics tracking ready
 */

(function() {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    animationThreshold: 0.1,
    animationRootMargin: '0px 0px -50px 0px',
    toastDuration: 4000,
    scrollOffset: 80,
    debounceDelay: 100,
    searchMinLength: 2
  };

  // ===== UTILITY FUNCTIONS =====
  const utils = {
    debounce(fn, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    throttle(fn, limit) {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    lerp(start, end, factor) {
      return start + (end - start) * factor;
    },

    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };

  // ===== TOAST NOTIFICATION SYSTEM =====
  class ToastSystem {
    constructor() {
      this.container = null;
      this.init();
    }

    init() {
      this.container = document.createElement('div');
      this.container.id = 'sp-toast-container';
      this.container.setAttribute('role', 'status');
      this.container.setAttribute('aria-live', 'polite');
      Object.assign(this.container.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      });
      document.body.appendChild(this.container);
    }

    show(message, options = {}) {
      const {
        type = 'info', // info, success, warning, error
        duration = CONFIG.toastDuration,
        action = null,
        icon = null
      } = options;

      const toast = document.createElement('div');
      
      const colors = {
        info: { bg: 'linear-gradient(135deg, #1e293b, #334155)', border: 'rgba(34, 211, 238, 0.3)', accent: '#22d3ee' },
        success: { bg: 'linear-gradient(135deg, #052e16, #14532d)', border: 'rgba(52, 211, 153, 0.3)', accent: '#34d399' },
        warning: { bg: 'linear-gradient(135deg, #422006, #713f12)', border: 'rgba(251, 191, 36, 0.3)', accent: '#fbbf24' },
        error: { bg: 'linear-gradient(135deg, #450a0a, #7f1d1d)', border: 'rgba(248, 113, 113, 0.3)', accent: '#f87171' }
      };

      const color = colors[type] || colors.info;

      Object.assign(toast.style, {
        background: color.bg,
        color: '#fff',
        padding: '16px 20px',
        borderRadius: '14px',
        border: `1px solid ${color.border}`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(34, 211, 238, 0.1)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        maxWidth: '380px',
        pointerEvents: 'auto',
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transform: 'translateX(120%)',
        opacity: '0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'pre-line',
        lineHeight: '1.5'
      });

      // Icon
      if (icon) {
        const iconEl = document.createElement('span');
        iconEl.textContent = icon;
        iconEl.style.fontSize = '18px';
        toast.appendChild(iconEl);
      }

      // Message
      const messageEl = document.createElement('span');
      messageEl.textContent = message;
      messageEl.style.flex = '1';
      toast.appendChild(messageEl);

      // Action button
      if (action) {
        const actionBtn = document.createElement('button');
        actionBtn.textContent = action.text;
        Object.assign(actionBtn.style, {
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: color.accent,
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        });
        actionBtn.onclick = () => {
          action.handler();
          this.dismiss(toast);
        };
        toast.appendChild(actionBtn);
      }

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.setAttribute('aria-label', 'Close notification');
      Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0 4px',
        transition: 'color 0.2s'
      });
      closeBtn.onclick = () => this.dismiss(toast);
      toast.appendChild(closeBtn);

      this.container.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
      });

      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => this.dismiss(toast), duration);
      }

      return toast;
    }

    dismiss(toast) {
      if (!toast || !toast.parentNode) return;
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }
  }

  // ===== SCROLL ANIMATIONS =====
  class ScrollAnimator {
    constructor() {
      this.elements = [];
      this.observer = null;
      this.init();
    }

    init() {
      // Create intersection observer for reveal animations
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sp-revealed');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: CONFIG.animationThreshold,
        rootMargin: CONFIG.animationRootMargin
      });

      // Setup elements
      this.setupElements();
    }

    setupElements() {
      // Add reveal classes to elements
      const selectors = [
        '.sp-card',
        '.sp-step',
        '.sp-stat-item',
        '.feature-card',
        '.workflow',
        '.stats-bar'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.classList.add('sp-reveal');
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          this.observer.observe(el);
        });
      });
    }

    // Staggered animation for children
    staggerChildren(parent, selector = ':scope > *', delay = 100) {
      const children = parent.querySelectorAll(selector);
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * delay}ms`;
      });
    }
  }

  // Add CSS for revealed state
  const revealStyles = document.createElement('style');
  revealStyles.textContent = `
    .sp-reveal.sp-revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* Stagger delays for grid items */
    .sp-card-grid .sp-card:nth-child(1) { transition-delay: 0ms; }
    .sp-card-grid .sp-card:nth-child(2) { transition-delay: 80ms; }
    .sp-card-grid .sp-card:nth-child(3) { transition-delay: 160ms; }
    .sp-card-grid .sp-card:nth-child(4) { transition-delay: 240ms; }
    .sp-card-grid .sp-card:nth-child(5) { transition-delay: 320ms; }
    .sp-card-grid .sp-card:nth-child(6) { transition-delay: 400ms; }
    
    .sp-stats-bar .sp-stat-item:nth-child(1) { transition-delay: 0ms; }
    .sp-stats-bar .sp-stat-item:nth-child(2) { transition-delay: 100ms; }
    .sp-stats-bar .sp-stat-item:nth-child(3) { transition-delay: 200ms; }
    .sp-stats-bar .sp-stat-item:nth-child(4) { transition-delay: 300ms; }
  `;
  document.head.appendChild(revealStyles);

  // ===== NAVBAR SCROLL EFFECT =====
  class NavbarEnhancer {
    constructor(navbar) {
      this.navbar = navbar;
      this.lastScroll = 0;
      this.ticking = false;
      this.init();
    }

    init() {
      if (!this.navbar) return;

      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      this.updateNavbar();
    }

    onScroll() {
      this.lastScroll = window.scrollY;

      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateNavbar();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }

    updateNavbar() {
      const scrolled = this.lastScroll > 50;
      this.navbar.classList.toggle('scrolled', scrolled);
    }
  }

  // ===== SEARCH FUNCTIONALITY =====
  class SearchSystem {
    constructor(inputSelector, targetSelector) {
      this.input = document.querySelector(inputSelector);
      this.targets = document.querySelectorAll(targetSelector);
      this.init();
    }

    init() {
      if (!this.input) return;

      this.input.addEventListener('input', 
        utils.debounce((e) => this.search(e.target.value), CONFIG.debounceDelay)
      );

      // Clear button
      const clearBtn = this.input.parentElement?.querySelector('.search-clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.input.value = '';
          this.search('');
          this.input.focus();
        });
      }

      // Keyboard shortcut (Ctrl/Cmd + K)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.input.focus();
        }
      });
    }

    search(query) {
      const q = query.toLowerCase().trim();

      if (q.length < CONFIG.searchMinLength) {
        this.showAll();
        return;
      }

      let visibleCount = 0;

      this.targets.forEach(target => {
        const text = target.textContent.toLowerCase();
        const matches = text.includes(q);
        
        target.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;

        // Highlight matches
        if (matches && q.length >= CONFIG.searchMinLength) {
          this.highlightMatches(target, q);
        } else {
          this.removeHighlights(target);
        }
      });

      // Show results count
      this.showResultsCount(visibleCount, this.targets.length);
    }

    showAll() {
      this.targets.forEach(target => {
        target.style.display = '';
        this.removeHighlights(target);
      });
      this.hideResultsCount();
    }

    highlightMatches(element, query) {
      // Simple text node highlighting
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const nodes = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }

      nodes.forEach(node => {
        const text = node.textContent;
        const idx = text.toLowerCase().indexOf(query);
        if (idx !== -1) {
          const span = document.createElement('mark');
          span.className = 'sp-highlight';
          span.style.cssText = `
            background: rgba(34, 211, 238, 0.25);
            color: #22d3ee;
            border-radius: 2px;
            padding: 0 2px;
          `;
          
          const before = text.substring(0, idx);
          const match = text.substring(idx, idx + query.length);
          const after = text.substring(idx + query.length);
          
          node.parentNode.insertBefore(document.createTextNode(before), node);
          node.parentNode.insertBefore(span, node);
          span.textContent = match;
          node.parentNode.insertBefore(document.createTextNode(after), node);
          node.parentNode.removeChild(node);
        }
      });
    }

    removeHighlights(element) {
      element.querySelectorAll('.sp-highlight').forEach(mark => {
        mark.replaceWith(document.createTextNode(mark.textContent));
      });
    }

    showResultsCount(visible, total) {
      let counter = document.getElementById('sp-search-results');
      if (!counter) {
        counter = document.createElement('div');
        counter.id = 'sp-search-results';
        counter.style.cssText = `
          font-size: 13px;
          color: var(--sp-text-muted, #64748b);
          margin-top: 8px;
          text-align: center;
        `;
        this.input.parentElement?.appendChild(counter);
      }
      counter.textContent = `Showing ${visible} of ${total} results`;
    }

    hideResultsCount() {
      const counter = document.getElementById('sp-search-results');
      if (counter) counter.remove();
    }
  }

  // ===== SMOOTH SCROLL =====
  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            const offsetTop = target.offsetTop - CONFIG.scrollOffset;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // ===== KEYBOARD NAVIGATION =====
  class KeyboardNav {
    constructor() {
      this.init();
    }

    init() {
      document.addEventListener('keydown', (e) => {
        // Escape to close modals/toasts
        if (e.key === 'Escape') {
          document.querySelectorAll('.sp-modal.active').forEach(modal => {
            modal.classList.remove('active');
          });
        }

        // Focus trap enhancement
        if (e.key === 'Tab') {
          this.handleTab(e);
        }
      });
    }

    handleTab(e) {
      const modal = document.querySelector('.sp-modal.active');
      if (!modal) return;

      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // ===== PERFORMANCE MONITORING =====
  class PerformanceMonitor {
    constructor() {
      this.metrics = {};
      this.init();
    }

    init() {
      // Measure page load performance
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => this.measure(), 0);
        });
      }
    }

    measure() {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
          loadComplete: navigation.loadEventEnd - navigation.startTime,
          firstPaint: this.getFirstPaint()
        };

        console.log('%c📊 SciCMPMATH Performance Metrics', 
          'color: #22d3ee; font-weight: bold; font-size: 14px;'
        );
        console.table(this.metrics);
      }
    }

    getFirstPaint() {
      const paint = performance.getEntriesByType('paint')
        .find(p => p.name === 'first-paint');
      return paint ? Math.round(paint.startTime) : 'N/A';
    }
  }

  // ===== COPY TO CLIPBOARD =====
  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const original = button?.textContent;
      if (button) {
        button.textContent = '✓ Copied!';
        button.style.color = '#34d399';
        setTimeout(() => {
          button.textContent = original;
          button.style.color = '';
        }, 2000);
      }
      window.toast?.show('Copied to clipboard!', { type: 'success', icon: '📋' });
    }).catch(err => {
      window.toast?.show('Failed to copy', { type: 'error', icon: '❌' });
    });
  }

  // ===== INITIALIZE ALL ENHANCEMENTS =====
  function initScientificPremium() {
    console.log('%c✨ SciCMPMATH Scientific Premium v2.0', 
      'color: #a78bfa; font-size: 16px; font-weight: bold;'
    );
    console.log('%cProgressive Enhancement Layer Active', 
      'color: #64748b; font-size: 12px;'
    );

    // Initialize systems
    window.toast = new ToastSystem();
    new ScrollAnimator();
    new NavbarEnhancer(document.querySelector('.sp-navbar, .navbar'));
    new SmoothScroll();
    new KeyboardNav();
    new PerformanceMonitor();

    // Global functions
    window.goHome = () => {
      window.location.href = '/DemoSciCMP/';
    };

    window.scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.openStudioIDE = () => {
      window.open('/DemoSciCMP/studio.html', '_blank', 'noopener,noreferrer');
      window.toast?.show('Opening Studio IDE...', { type: 'info', icon: '🖥️' });
    };

    window.launchTemplate = (type) => {
      window.toast?.show(`🚀 Launching ${type} template...\n\nStatus: Ready to configure in Studio IDE`, {
        type: 'info',
        icon: '⚡',
        duration: 5000,
        action: {
          text: 'Open IDE',
          handler: () => window.openStudioIDE()
        }
      });
    };

    window.copyToClipboard = copyToClipboard;

    // Add copy buttons to code blocks
    document.querySelectorAll('.step-command, [class*="command"]').forEach(block => {
      const btn = document.createElement('button');
      btn.className = 'sp-copy-btn';
      btn.innerHTML = '📋 Copy';
      btn.title = 'Copy to clipboard';
      Object.assign(btn.style, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#94a3b8',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit'
      });

      btn.onmouseenter = () => {
        btn.style.background = 'rgba(34, 211, 238, 0.15)';
        btn.style.borderColor = 'rgba(34, 211, 238, 0.3)';
        btn.style.color = '#22d3ee';
      };

      btn.onmouseleave = () => {
        btn.style.background = 'rgba(255,255,255,0.08)';
        btn.style.borderColor = 'rgba(255,255,255,0.15)';
        btn.style.color = '#94a3b8';
      };

      block.style.position = 'relative';
      block.appendChild(btn);

      btn.addEventListener('click', () => {
        const code = block.textContent.replace(/^$\s*/, '').trim();
        copyToClipboard(code, btn);
      });
    });

    // Mark as loaded
    document.body.classList.add('sp-enhanced');

    console.log('%c✅ All enhancements loaded successfully!', 
      'color: #34d399; font-size: 12px;'
    );
  }

  // ===== DOM READY =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScientificPremium);
  } else {
    initScientificPremium();
  }

})();
