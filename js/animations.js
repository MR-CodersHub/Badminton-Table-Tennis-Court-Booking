/**
 * COURTLY - ANIMATIONS & SCROLL OBSERVER
 * Handles Intersection Observer reveals, animated statistic counters,
 * scroll progress bar, and floating element micro-parallax.
 */

(function () {
  'use strict';

  // 1. Scroll Progress Bar
  function initScrollProgress() {
    let progressBar = document.getElementById('courtly-scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'courtly-scroll-progress';
      progressBar.style.position = 'fixed';
      progressBar.style.top = '0';
      progressBar.style.left = '0';
      progressBar.style.height = '3px';
      progressBar.style.width = '0%';
      progressBar.style.background = 'linear-gradient(90deg, #287DDE, #20C9A6, #C6F36B)';
      progressBar.style.zIndex = '1100';
      progressBar.style.transition = 'width 0.1s ease-out';
      progressBar.style.pointerEvents = 'none';
      document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // 2. Intersection Observer for Scroll Reveals
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-init');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // 3. Animated Number Counters
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-count-number[data-target]');
    if (!counters.length) return;

    let countersTriggered = false;

    function runCounters() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease Out Quad
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentVal = Math.floor(easeProgress * target);

          counter.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            counter.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateNumber);
      });
    }

    const firstCounter = counters[0];
    if ('IntersectionObserver' in window && firstCounter) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersTriggered) {
            countersTriggered = true;
            runCounters();
          }
        });
      }, { threshold: 0.3 });

      statsObserver.observe(firstCounter.closest('.live-stats-bar') || firstCounter);
    } else {
      runCounters();
    }
  }

  // 4. Subtle Parallax for Hero Elements
  function initHeroParallax() {
    const heroVisual = document.querySelector('.hero-visual-composition');
    const float1 = document.querySelector('.floating-svg-shuttlecock');
    const float2 = document.querySelector('.floating-svg-pingpong');

    if (!heroVisual || window.innerWidth < 992) return;

    window.addEventListener('mousemove', (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

      if (float1) {
        float1.style.transform = `translate(${xPos * 1.5}px, ${yPos * 1.5}px)`;
      }
      if (float2) {
        float2.style.transform = `translate(${-xPos * 1.2}px, ${-yPos * 1.2}px)`;
      }
    }, { passive: true });
  }

  // Initialize all animation subsystems
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initScrollReveals();
    initStatCounters();
    initHeroParallax();
  });
})();
