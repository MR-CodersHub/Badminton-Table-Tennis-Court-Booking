/**
 * COURTLY - HOME 2 INTERACTIVE SCRIPT
 * Handles Player-Type Selector, Editorial Testimonial Carousel,
 * and 3D Dashboard Mockup interactions.
 */

(function () {
  'use strict';

  // 1. Dynamic Player-Type Selector (Section 4)
  function initPlayerTypeSelector() {
    const tabButtons = document.querySelectorAll('.player-tab-btn[data-player-type]');
    const showcaseBox = document.getElementById('playerShowcaseBox');
    const badgeEl = document.getElementById('playerTypeBadge');
    const titleEl = document.getElementById('playerTypeTitle');
    const taglineEl = document.getElementById('playerTypeTagline');
    const sportEl = document.getElementById('playerTypeSport');
    const expEl = document.getElementById('playerTypeExp');
    const formatEl = document.getElementById('playerTypeFormat');
    const courtEl = document.getElementById('playerTypeCourt');
    const membershipEl = document.getElementById('playerTypeMembership');
    const ctaBtn = document.getElementById('playerTypeCta');
    const imgEl = document.getElementById('playerTypeImg');

    if (!tabButtons.length || !showcaseBox || !window.COURTLY_DATA) return;

    const data = window.COURTLY_DATA.playerTypes;

    function selectPlayerType(typeKey) {
      const info = data[typeKey];
      if (!info) return;

      // Update active tab buttons
      tabButtons.forEach(btn => {
        const isMatch = btn.getAttribute('data-player-type') === typeKey;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Subtle fade transition
      showcaseBox.style.opacity = '0.4';
      showcaseBox.style.transform = 'translateY(8px)';

      setTimeout(() => {
        if (badgeEl) badgeEl.textContent = info.badge;
        if (titleEl) titleEl.textContent = info.title;
        if (taglineEl) taglineEl.textContent = info.tagline;
        if (sportEl) sportEl.textContent = info.recommendedSport;
        if (expEl) expEl.textContent = info.suggestedExperience;
        if (formatEl) formatEl.textContent = info.sessionFormat;
        if (courtEl) courtEl.textContent = info.courtType;
        if (membershipEl) membershipEl.textContent = info.suitableMembership;
        if (ctaBtn) {
          ctaBtn.innerHTML = `<span>${info.cta}</span> <i class="fa-solid fa-arrow-right ms-2"></i>`;
        }
        if (imgEl) {
          imgEl.src = info.image;
          imgEl.alt = `${info.title} playing at Courtly`;
        }

        showcaseBox.style.opacity = '1';
        showcaseBox.style.transform = 'translateY(0)';
      }, 180);
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const type = this.getAttribute('data-player-type');
        selectPlayerType(type);
      });
    });

    // Default to beginners
    selectPlayerType('beginners');
  }

  // 2. Editorial Testimonials Carousel (Section 7)
  function initEditorialTestimonials() {
    const reviews = [
      {
        quote: "The shock-absorption on Court 01 is unmatched. As someone who plays 4 nights a week, knee fatigue is a real issue on ordinary hard courts. Courtly's Olympic flooring has completely eliminated soreness.",
        name: "Marcus Vance",
        sport: "Badminton Semi-Pro",
        tier: "Member for 2 yrs",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
      },
      {
        quote: "Booking a 7 AM table tennis table takes literally three clicks. The automatic ball feeder machines in Arena 02 have elevated my backhand topspin drills faster than 6 months of club coaching.",
        name: "Elena Rostova",
        sport: "Table Tennis State Finalist",
        tier: "Pro Athlete Tier",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
      },
      {
        quote: "The lighting canopy is what sold me. Traditional halls have blinding fluorescent fixtures right above the net. At Courtly, the asymmetric LED arrays provide crisp visibility without glare during high smashes.",
        name: "Devon Harris",
        sport: "Doubles League Captain",
        tier: "Elite Master Tier",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
      },
      {
        quote: "The community leagues here are exceptionally organized. The live bracket telemetry and seamless rescheduling give it the feel of a professional ATP or BWF circuit. Highly recommended for every competitive player!",
        name: "Sophia Chen",
        sport: "Collegiate Badminton Champion",
        tier: "Pro Athlete Tier",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
      }
    ];

    const quoteEl = document.getElementById('h2TestimonialQuote');
    const nameEl = document.getElementById('h2TestimonialName');
    const roleEl = document.getElementById('h2TestimonialRole');
    const avatarEl = document.getElementById('h2TestimonialAvatar');
    const prevBtn = document.getElementById('h2PrevTestimonialBtn');
    const nextBtn = document.getElementById('h2NextTestimonialBtn');
    const counterEl = document.getElementById('h2TestimonialCounter');

    if (!quoteEl || !nameEl) return;

    let currentIndex = 0;

    function renderReview(index) {
      if (index < 0) currentIndex = reviews.length - 1;
      else if (index >= reviews.length) currentIndex = 0;
      else currentIndex = index;

      const review = reviews[currentIndex];

      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = `"${review.quote}"`;
        nameEl.textContent = review.name;
        roleEl.textContent = `${review.sport} • ${review.tier}`;
        if (avatarEl) avatarEl.src = review.image;
        if (counterEl) counterEl.textContent = `0${currentIndex + 1} / 0${reviews.length}`;
        quoteEl.style.opacity = '1';
      }, 160);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => renderReview(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => renderReview(currentIndex + 1));
    }

    // Auto slide every 7 seconds
    setInterval(() => {
      renderReview(currentIndex + 1);
    }, 7000);

    renderReview(0);
  }

  // 3. Dashboard / Athlete Hub clock (Section 5)
  function initDashboardMockup() {
    // Legacy clock element (kept for compatibility)
    const liveClockEl = document.getElementById('dashboardLiveClock');
    // Athlete Hub live clock
    const ahClockEl   = document.getElementById('ah-live-clock');

    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      if (liveClockEl) liveClockEl.textContent = timeStr;
      if (ahClockEl)   ahClockEl.textContent   = timeStr;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Initialize all Home 2 components
  document.addEventListener('DOMContentLoaded', () => {
    initPlayerTypeSelector();
    initEditorialTestimonials();
    initDashboardMockup();
  });
})();
