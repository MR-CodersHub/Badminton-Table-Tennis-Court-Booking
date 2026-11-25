/**
 * COURTLY - ABOUT PAGE INTERACTIVE SCRIPT
 * Handles Timeline Progression, Impact Stat Counters,
 * Editorial Testimonial Rotation, Facility Hotspots, and Story Line.
 */

(function () {
  'use strict';

  // 1. Interactive Journey Timeline (Section 5)
  function initTimeline() {
    const timelineWrapper = document.getElementById('journeyTimeline');
    const progressLine = document.getElementById('timelineProgressLine');
    const milestones = document.querySelectorAll('.abt-milestone-card');

    if (!timelineWrapper || !milestones.length) return;

    let currentIndex = 0;
    let autoTimer = null;
    let isHovered = false;

    function setActiveMilestone(index) {
      currentIndex = index;
      milestones.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });

      if (progressLine) {
        const percentage = (index / (milestones.length - 1)) * 100;
        progressLine.style.width = `${percentage}%`;
      }
    }

    function startAutoPlay() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        if (!isHovered) {
          const next = (currentIndex + 1) % milestones.length;
          setActiveMilestone(next);
        }
      }, 3200);
    }

    milestones.forEach((card, index) => {
      card.addEventListener('click', () => {
        setActiveMilestone(index);
        startAutoPlay();
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveMilestone(index);
          startAutoPlay();
        }
      });
    });

    timelineWrapper.addEventListener('mouseenter', () => { isHovered = true; });
    timelineWrapper.addEventListener('mouseleave', () => { isHovered = false; });

    // Start when section enters viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveMilestone(0);
          startAutoPlay();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(timelineWrapper);
  }

  // 2. Animated Impact Stat Counters (Section 7)
  function initImpactCounters() {
    const impactSection = document.getElementById('about-impact');
    const counters = document.querySelectorAll('.abt-impact-number[data-target]');

    if (!impactSection || !counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOutExpo(progress) * target);
        el.textContent = `${value}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(impactSection);
  }

  // 3. Player Feedback Carousel (Section 8)
  function initTestimonialCarousel() {
    const reviews = (window.COURTLY_DATA && window.COURTLY_DATA.aboutTestimonials) || [
      {
        name: 'Ethan Brooks',
        sport: 'Badminton',
        rating: 5,
        review: 'The courts are well maintained and the booking experience makes planning my weekly games so convenient.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Olivia Parker',
        sport: 'Table Tennis',
        rating: 5,
        review: 'A welcoming environment with great facilities. I enjoy coming here for regular matches with friends.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Noah Bennett',
        sport: 'Badminton',
        rating: 5,
        review: 'Great place to practise, meet other players and enjoy competitive matches. The overall experience is excellent.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Ava Thompson',
        sport: 'Table Tennis',
        rating: 5,
        review: 'I love the atmosphere and the convenience of finding a suitable playing session. It makes staying active enjoyable.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
      }
    ];

    const quoteEl = document.getElementById('abtFeaturedQuote');
    const nameEl = document.getElementById('abtFeaturedName');
    const sportEl = document.getElementById('abtFeaturedSport');
    const avatarEl = document.getElementById('abtFeaturedAvatar');
    const starsEl = document.getElementById('abtFeaturedStars');
    const counterEl = document.getElementById('abtReviewCounter');
    const prevBtn = document.getElementById('abtPrevBtn');
    const nextBtn = document.getElementById('abtNextBtn');

    if (!quoteEl || !nameEl) return;

    let currentIndex = 0;

    function renderReview(index) {
      if (index < 0) currentIndex = reviews.length - 1;
      else if (index >= reviews.length) currentIndex = 0;
      else currentIndex = index;

      const item = reviews[currentIndex];
      quoteEl.style.opacity = '0';

      setTimeout(() => {
        quoteEl.textContent = `"${item.review}"`;
        nameEl.textContent = item.name;
        if (sportEl) sportEl.textContent = `${item.sport} Player`;
        if (avatarEl) {
          avatarEl.src = item.image;
          avatarEl.alt = item.name;
        }
        if (starsEl) {
          starsEl.innerHTML = Array(item.rating || 5).fill('<i class="fa-solid fa-star"></i>').join('');
        }
        if (counterEl) {
          counterEl.textContent = `0${currentIndex + 1} / 0${reviews.length}`;
        }
        quoteEl.style.opacity = '1';
      }, 180);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => renderReview(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => renderReview(currentIndex + 1));

    setInterval(() => renderReview(currentIndex + 1), 6500);
    renderReview(0);
  }

  // 4. Interactive Facility Info Points (Section 9)
  function initFacilityInfoPoints() {
    const showcase = document.getElementById('facilityShowcase');
    const points = document.querySelectorAll('.abt-info-point[data-info]');
    const descs = document.querySelectorAll('.abt-info-desc');

    if (!showcase || !points.length) return;

    function activatePoint(id) {
      points.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-info') === id);
      });
      descs.forEach(d => {
        d.classList.toggle('visible', d.id === `info-desc-${id}`);
      });
    }

    points.forEach(point => {
      const id = point.getAttribute('data-info');

      point.addEventListener('click', (e) => {
        e.stopPropagation();
        const isAlreadyActive = point.classList.contains('active');
        if (isAlreadyActive) {
          point.classList.remove('active');
          const desc = document.getElementById(`info-desc-${id}`);
          if (desc) desc.classList.remove('visible');
        } else {
          activatePoint(id);
        }
      });

      point.addEventListener('mouseenter', () => {
        activatePoint(id);
      });
    });

    document.addEventListener('click', (e) => {
      if (!showcase.contains(e.target)) {
        points.forEach(p => p.classList.remove('active'));
        descs.forEach(d => d.classList.remove('visible'));
      }
    });
  }

  // 5. Story in Motion Scroll Line (Section 2)
  function initStoryTimeline() {
    const storySection = document.getElementById('about-story');
    const storyLine = document.getElementById('abtStoryLine');

    if (!storySection || !storyLine) return;

    let ticking = false;

    function updateLine() {
      const rect = storySection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const progress = Math.min(Math.max((windowH - rect.top) / total, 0.12), 1);
      storyLine.style.transform = `scaleY(${progress})`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateLine);
        ticking = true;
      }
    }, { passive: true });
  }

  // Initialize all About page modules
  document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initImpactCounters();
    initTestimonialCarousel();
    initFacilityInfoPoints();
    initStoryTimeline();
  });
})();
