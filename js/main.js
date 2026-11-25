/**
 * COURTLY - MAIN APPLICATION SCRIPT
 * Interactive time slot selector, live court filters, tournament countdown,
 * testimonial carousel controls, and booking modal workflows.
 */

(function () {
  'use strict';

  // Global State
  const AppState = {
    selectedSport: 'all',
    selectedTimeSlot: '08:00 AM',
    activeCourt: {
      id: 'court-01',
      name: 'Badminton Court 01 (Championship Wood)',
      sport: 'Badminton',
      price: 24,
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    }
  };

  // 1. Time Slot Selector Logic
  function initTimeSlotSelector() {
    const slotButtons = document.querySelectorAll('.timeslot-btn:not(.unavailable)');
    const selectedSlotDisplay = document.getElementById('selectedTimeSlotBadge');

    slotButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        slotButtons.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');

        const slotTime = this.getAttribute('data-slot') || this.querySelector('span').textContent;
        AppState.selectedTimeSlot = slotTime;

        if (selectedSlotDisplay) {
          selectedSlotDisplay.textContent = slotTime;
        }

        if (window.CourtlyNavbar && typeof window.CourtlyNavbar.showToast === 'function') {
          window.CourtlyNavbar.showToast(`Selected Slot: ${slotTime} – Ready for checkout`);
        }
      });
    });
  }

  // 2. Tournament Dynamic Countdown Timer
  function initTournamentCountdown() {
    // Set target date to 6 days, 14 hours, 28 minutes from current execution time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6);
    targetDate.setHours(targetDate.getHours() + 14);
    targetDate.setMinutes(targetDate.getMinutes() + 28);
    targetDate.setSeconds(targetDate.getSeconds() + 45);

    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 3. Testimonial Carousel Multi-Card Sliding Controls
  function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const items = document.querySelectorAll('.testimonial-carousel-item');
    const prevBtn = document.getElementById('prevTestimonialBtn');
    const nextBtn = document.getElementById('nextTestimonialBtn');
    const indicators = document.querySelectorAll('.carousel-indicator-dot');

    if (!track || !items.length) return;

    let currentIndex = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 991.98) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, items.length - getVisibleCount());
    }

    function updateCarousel() {
      const visible = getVisibleCount();
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      // Calculate translation offset based on item width and 1.5rem (24px) gap
      const firstItem = items[0];
      const gap = 24;
      const itemWidth = firstItem.offsetWidth;
      const shift = currentIndex * (itemWidth + gap);

      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      track.style.transform = isRtl ? `translateX(${shift}px)` : `translateX(-${shift}px)`;

      // Active card view highlight
      items.forEach((item, idx) => {
        const card = item.querySelector('.testimonial-card-item');
        if (card) {
          if (idx >= currentIndex && idx < currentIndex + visible) {
            card.classList.add('active-in-view');
          } else {
            card.classList.remove('active-in-view');
          }
        }
      });

      // Update indicator dots
      indicators.forEach((dot, idx) => {
        const isActive = idx === currentIndex || (idx === indicators.length - 1 && currentIndex === maxIndex);
        dot.classList.toggle('active', isActive);
        dot.style.background = isActive ? 'var(--color-teal)' : 'rgba(255, 255, 255, 0.2)';
        dot.style.width = isActive ? '24px' : '8px';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateCarousel();
      });
    }

    indicators.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = Math.min(idx, getMaxIndex());
        updateCarousel();
      });
    });

    window.addEventListener('resize', updateCarousel, { passive: true });
    updateCarousel();
  }

  // 4. Interactive Booking Modal Workflow
  function initBookingModal() {
    const bookButtons = document.querySelectorAll('[data-court-id]');
    const modalCourtName = document.getElementById('modalCourtName');
    const modalCourtSport = document.getElementById('modalCourtSport');
    const modalCourtPrice = document.getElementById('modalCourtPrice');
    const modalSlotSelect = document.getElementById('modalSlotSelect');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');

    bookButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const courtId = this.getAttribute('data-court-id');
        const courtName = this.getAttribute('data-court-name');
        const courtSport = this.getAttribute('data-court-sport');
        const courtPrice = this.getAttribute('data-court-price');

        if (modalCourtName) modalCourtName.textContent = courtName;
        if (modalCourtSport) modalCourtSport.textContent = courtSport;
        if (modalCourtPrice) modalCourtPrice.textContent = `$${courtPrice}/hr`;

        if (modalSlotSelect) {
          modalSlotSelect.value = AppState.selectedTimeSlot;
        }

        AppState.activeCourt = {
          id: courtId,
          name: courtName,
          sport: courtSport,
          price: parseInt(courtPrice, 10)
        };
      });
    });

    if (confirmBookingBtn) {
      confirmBookingBtn.addEventListener('click', () => {
        const playerNameInput = document.getElementById('bookingPlayerName');
        const playerEmailInput = document.getElementById('bookingPlayerEmail');

        const playerName = playerNameInput ? playerNameInput.value.trim() : 'Player';
        const playerEmail = playerEmailInput ? playerEmailInput.value.trim() : '';

        if (!playerEmail) {
          alert('Please enter your email address to receive court access pass.');
          return;
        }

        // Close modal via Bootstrap instance
        const bookingModalEl = document.getElementById('bookingModal');
        if (bookingModalEl && window.bootstrap) {
          const modalInstance = bootstrap.Modal.getInstance(bookingModalEl);
          if (modalInstance) modalInstance.hide();
        }

        if (window.CourtlyNavbar && typeof window.CourtlyNavbar.showToast === 'function') {
          window.CourtlyNavbar.showToast(`Booking Confirmed! Match ticket sent to ${playerEmail}`);
        }
      });
    }
  }

  // 5. Auth Modal (Login / Signup tab toggle)
  function initAuthModal() {
    const authModalEl = document.getElementById('authModal');
    if (!authModalEl) return;

    const loginTab = document.getElementById('tabAuthLogin');
    const signupTab = document.getElementById('tabAuthSignup');
    const formLogin = document.getElementById('formAuthLogin');
    const formSignup = document.getElementById('formAuthSignup');

    if (loginTab && signupTab && formLogin && formSignup) {
      loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        formLogin.classList.remove('d-none');
        formSignup.classList.add('d-none');
      });

      signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        formSignup.classList.remove('d-none');
        formLogin.classList.add('d-none');
      });

      // Listen for trigger mode
      authModalEl.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        if (button) {
          const mode = button.getAttribute('data-auth-mode');
          if (mode === 'signup') {
            signupTab.click();
          } else {
            loginTab.click();
          }
        }
      });

      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalInstance = bootstrap.Modal.getInstance(authModalEl);
        if (modalInstance) modalInstance.hide();
        if (window.CourtlyNavbar && typeof window.CourtlyNavbar.showToast === 'function') {
          window.CourtlyNavbar.showToast('Welcome back, Athlete! Dashboard unlocked.');
        }
      });

      formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalInstance = bootstrap.Modal.getInstance(authModalEl);
        if (modalInstance) modalInstance.hide();
        if (window.CourtlyNavbar && typeof window.CourtlyNavbar.showToast === 'function') {
          window.CourtlyNavbar.showToast('Account created! Welcome to Courtly Arena.');
        }
      });
    }
  }

  // 6. Automatic 4-Step Booking Journey Animation (Step 1 to Step 4 Auto-Flow)
  function initBookingJourneyAutoAnimation() {
    const journeyWrapper = document.getElementById('journeyTrackWrapper');
    const stepCards = document.querySelectorAll('.journey-step-card[data-step]');
    const progressLine = document.getElementById('journeyProgressLine');
    const stepBadgeText = document.getElementById('journeyStepBadgeText');

    if (!stepCards.length) return;

    const stepTitles = [
      'Step 1: Choose Your Sport (Badminton or Table Tennis)',
      'Step 2: Select Your Court (Championship Wood or BWF Mat)',
      'Step 3: Pick Your Time (Morning, Peak or Late-Night Slot)',
      'Step 4: Confirm Booking (Instant QR Pass on Your Phone)'
    ];

    // Progress widths connecting column centers (0%, 25%, 50%, 75% of total span)
    const progressWidths = ['0%', '25%', '50%', '75%'];

    let currentStep = 0;
    let autoInterval = null;
    let isPaused = false;

    function applyStep(stepIndex) {
      currentStep = stepIndex % stepCards.length;

      stepCards.forEach((card, idx) => {
        if (idx === currentStep) {
          card.classList.add('active');
          card.classList.remove('completed');
        } else if (idx < currentStep) {
          card.classList.remove('active');
          card.classList.add('completed');
        } else {
          card.classList.remove('active');
          card.classList.remove('completed');
        }
      });

      if (progressLine) {
        progressLine.style.width = progressWidths[currentStep];
      }

      if (stepBadgeText) {
        stepBadgeText.textContent = stepTitles[currentStep];
      }
    }

    function startAutoTimer() {
      if (autoInterval) clearInterval(autoInterval);
      autoInterval = setInterval(() => {
        if (!isPaused) {
          applyStep(currentStep + 1);
        }
      }, 2500); // 2.5 seconds per step
    }

    // Interactive step clicks
    stepCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        applyStep(idx);
        startAutoTimer(); // Reset timer cycle from user's chosen step
      });
    });

    // Pause on hover so the user can read details comfortably
    if (journeyWrapper) {
      journeyWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
      });
      journeyWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
      });
    }

    // Initial trigger
    applyStep(0);
    startAutoTimer();
  }

  // 7. Smooth In-Page Anchor Scrolling
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.startsWith('#login') || targetId.startsWith('#signup')) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initTimeSlotSelector();
    initTournamentCountdown();
    initTestimonialCarousel();
    initBookingJourneyAutoAnimation();
    initBookingModal();
    initAuthModal();
    initSmoothAnchors();
  });
})();
