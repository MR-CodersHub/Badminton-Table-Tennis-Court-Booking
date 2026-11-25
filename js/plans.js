/**
 * COURTLY - PLANS & MEMBERSHIP PAGE SCRIPT
 * Renders membership plans from centralized COURTLY_DATA,
 * handles Interactive Membership Recommender, and FAQ Accordion.
 */

(function () {
  'use strict';

  const FALLBACK_PLANS = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹499',
      numericPrice: 499,
      period: '/ month',
      popular: false,
      description: 'Your starting point for a more active and enjoyable playing routine.',
      benefits: [
        '4 court booking hours',
        'Standard booking access',
        'Basic player dashboard',
        'Community event updates'
      ],
      ctaText: 'Choose Starter'
    },
    {
      id: 'pro-athlete',
      name: 'Pro Athlete',
      price: '₹999',
      numericPrice: 999,
      period: '/ month',
      popular: true,
      badge: 'MOST POPULAR',
      description: 'For regular players who want more flexibility and better access.',
      benefits: [
        '10 court booking hours',
        'Priority booking access',
        'Tournament registration benefits',
        'Exclusive member offers'
      ],
      ctaText: 'Choose Pro Athlete'
    },
    {
      id: 'elite-player',
      name: 'Elite Player',
      price: '₹1,799',
      numericPrice: 1799,
      period: '/ month',
      popular: false,
      description: 'For dedicated players looking for a more premium playing experience.',
      benefits: [
        '20 court booking hours',
        'Premium booking access',
        'Special tournament benefits',
        'Exclusive member privileges'
      ],
      ctaText: 'Choose Elite'
    }
  ];

  function getPlans() {
    return (window.COURTLY_DATA && Array.isArray(window.COURTLY_DATA.membershipPlans))
      ? window.COURTLY_DATA.membershipPlans
      : FALLBACK_PLANS;
  }

  // 1. Render Section 3 Pricing Cards from Central Data
  function renderPricingCards() {
    const grid = document.getElementById('plansPricingGrid');
    if (!grid) return;

    const plans = getPlans();

    grid.innerHTML = plans.map(plan => {
      const isPro = !!plan.popular;
      const numeric = plan.numericPrice || plan.price.replace(/[^\d]/g, '');
      return `
        <div class="col-12 col-lg-4">
          <div class="pln-pricing-card ${isPro ? 'featured-pro' : ''}" id="plan-card-${plan.id}">
            ${isPro ? '<span class="pln-popular-pill">MOST POPULAR</span>' : ''}
            <span class="${isPro ? 'text-lime' : 'text-muted'} small fw-bold text-uppercase mb-1">
              ${plan.id === 'starter' ? 'Foundation Pass' : (isPro ? 'Competitor Pass' : 'VIP Pass')}
            </span>
            <h3 class="plan-tier-name ${isPro ? 'text-gradient-lime-teal' : ''}">${plan.name.toUpperCase()}</h3>
            <p class="text-muted small">${plan.description}</p>

            <div class="plan-price-wrap">
              <span class="plan-price-currency ${isPro ? 'text-lime' : ''}">₹</span>
              <span class="plan-price-amount ${isPro ? 'text-lime' : ''}">${plan.price.replace('₹', '')}</span>
              <span class="plan-price-period">${plan.period}</span>
            </div>

            <ul class="plan-features-list">
              ${plan.benefits.map(b => `
                <li class="plan-feature-item">
                  <i class="fa-solid fa-circle-check ${isPro ? 'text-lime' : 'feature-check-icon'}"></i>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>

            <button type="button"
              class="${isPro ? 'btn-courtly-lime' : 'btn-courtly-outline'} mt-auto w-100"
              data-bs-toggle="modal" data-bs-target="#bookingModal"
              data-court-id="plan-${plan.id}"
              data-court-name="${plan.name} Membership"
              data-court-sport="Membership"
              data-court-price="${numeric}">
              <span>${plan.ctaText}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Wire modal data dynamically
    grid.querySelectorAll('[data-court-id]').forEach(btn => {
      btn.addEventListener('click', function () {
        const modalCourtName = document.getElementById('modalCourtName');
        const modalCourtSport = document.getElementById('modalCourtSport');
        const modalCourtPrice = document.getElementById('modalCourtPrice');
        if (modalCourtName) modalCourtName.textContent = this.getAttribute('data-court-name');
        if (modalCourtSport) modalCourtSport.textContent = this.getAttribute('data-court-sport');
        if (modalCourtPrice) modalCourtPrice.textContent = `₹${this.getAttribute('data-court-price')}/month`;
      });
    });
  }

  // 2. Section 5: Interactive Membership Recommender
  function initRecommender() {
    const profileBtns = document.querySelectorAll('.pln-profile-option[data-recommend]');
    const panel = document.getElementById('plnRecommendPanel');
    const profileLabel = document.getElementById('recProfileLabel');
    const planNameEl = document.getElementById('recPlanName');
    const planPriceEl = document.getElementById('recPlanPrice');
    const benefitsEl = document.getElementById('recPlanBenefits');
    const viewBtn = document.getElementById('recViewPlanBtn');

    if (!profileBtns.length || !panel) return;

    const plans = getPlans();
    const profileLabels = {
      'starter': 'For Casual Players',
      'pro-athlete': 'For Regular Players',
      'elite-player': 'For Dedicated Players'
    };

    function selectRecommendation(planId) {
      const plan = plans.find(p => p.id === planId) || plans[1];

      profileBtns.forEach(btn => {
        const active = btn.getAttribute('data-recommend') === planId;
        btn.classList.toggle('active', active);
        const chevron = btn.querySelector('.fa-chevron-right');
        if (chevron) {
          chevron.classList.toggle('text-lime', active);
          chevron.classList.toggle('text-muted', !active);
        }
      });

      panel.style.opacity = '0.5';
      setTimeout(() => {
        if (profileLabel) profileLabel.textContent = profileLabels[planId] || 'Recommended';
        if (planNameEl) planNameEl.textContent = plan.name;
        if (planPriceEl) planPriceEl.textContent = plan.price;
        if (benefitsEl) {
          benefitsEl.innerHTML = plan.benefits.map(b => `
            <li class="plan-feature-item">
              <i class="fa-solid fa-circle-check text-lime"></i>
              <span>${b}</span>
            </li>
          `).join('');
        }
        if (viewBtn) {
          viewBtn.setAttribute('href', `#plan-card-${plan.id}`);
        }
        panel.style.opacity = '1';
      }, 140);
    }

    profileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectRecommendation(btn.getAttribute('data-recommend'));
      });
    });

    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = viewBtn.getAttribute('href').replace('#', '');
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.style.boxShadow = '0 0 0 3px #C6F36B, 0 20px 50px rgba(198,243,107,0.3)';
          setTimeout(() => { targetCard.style.boxShadow = ''; }, 1600);
        }
      });
    }

    selectRecommendation('pro-athlete');
  }

  // 3. Section 8: Accessible Single-Open FAQ Accordion
  function initFaqAccordion() {
    const items = document.querySelectorAll('#plnFaqAccordion .pln-faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const trigger = item.querySelector('.pln-faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        items.forEach(other => {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.pln-faq-trigger');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderPricingCards();
    initRecommender();
    initFaqAccordion();
  });
})();
