/**
 * COURTLY PLAYER DASHBOARD - Membership Script
 */
(function () {
  'use strict';

  const PLAN_HOURS = { 'starter': 4, 'pro-athlete': 10, 'elite-player': 20 };

  function getPlans() {
    return (window.COURTLY_DATA && window.COURTLY_DATA.membershipPlans) || [
      { id: 'starter', name: 'Starter', price: '₹499', numericPrice: 499, period: '/ month', benefits: ['4 court booking hours', 'Standard booking access', 'Basic player dashboard', 'Community event updates'] },
      { id: 'pro-athlete', name: 'Pro Athlete', price: '₹999', numericPrice: 999, period: '/ month', badge: 'MOST POPULAR', benefits: ['10 court booking hours', 'Priority booking access', 'Tournament registration benefits', 'Exclusive member offers'] },
      { id: 'elite-player', name: 'Elite Player', price: '₹1,799', numericPrice: 1799, period: '/ month', badge: 'VIP ACCESS', benefits: ['20 court booking hours', 'Premium booking access', 'Special tournament benefits', 'Exclusive member privileges'] }
    ];
  }

  function renderSpotlight() {
    const wrap = document.getElementById('currentMembershipSpotlight');
    if (!wrap) return;
    const state = window.COURTLY_USER.getState();
    const m = state.membership;
    const remaining = Math.max(0, m.includedHours - m.usedHours);
    const pct = Math.min(100, Math.round((m.usedHours / Math.max(m.includedHours, 1)) * 100));

    wrap.innerHTML = `
      <div class="row g-4 align-items-center">
        <div class="col-12 col-lg-7">
          <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span class="user-demo-pill">CURRENT DEMO PASS</span>
            <span class="status-badge active">${m.status}</span>
          </div>
          <h2 class="h4 fw-bold mb-1">${m.planName} — ${window.COURTLY_USER.formatINR(m.price)}/month</h2>
          <p class="small text-muted mb-0">Sample renewal date: <strong>${m.renewalDate}</strong> (No real billing active)</p>
        </div>
        <div class="col-12 col-lg-5">
          <div class="d-flex justify-content-between small mb-1">
            <span>Included: <strong>${m.includedHours} hrs</strong> &bull; Used: <strong>${m.usedHours} hrs</strong></span>
            <strong class="text-teal">${remaining} hrs left</strong>
          </div>
          <div class="user-progress-track">
            <div class="user-progress-fill user-progress-animate" style="width:${pct}%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlans() {
    const grid = document.getElementById('userPlansGrid');
    if (!grid) return;
    const state = window.COURTLY_USER.getState();
    const plans = getPlans();

    grid.innerHTML = plans.map(p => {
      const isCurrent = state.membership.planId === p.id;
      return `
        <div class="col-12 col-md-4">
          <div class="user-card user-card-hover h-100 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h3 class="h5 fw-bold mb-0">${p.name}</h3>
              ${p.badge ? `<span class="user-demo-pill">${p.badge}</span>` : ''}
            </div>
            <div class="fs-3 fw-bold text-teal mb-3">${p.price} <span class="fs-6 text-muted fw-normal">${p.period}</span></div>
            <ul class="list-unstyled small text-muted d-flex flex-column gap-2 mb-4 flex-grow-1">
              ${p.benefits.map(b => `<li class="d-flex align-items-center gap-2"><span style="width:6px;height:6px;border-radius:50%;background:var(--color-lime);flex-shrink:0;"></span><span>${b}</span></li>`).join('')}
            </ul>
            <div class="d-flex gap-2 mt-auto">
              <button type="button" class="btn-user-outline btn-sm flex-fill plan-ben-btn" data-id="${p.id}">View Benefits</button>
              <button type="button" class="${isCurrent ? 'btn-user-primary' : 'btn-user-lime'} btn-sm flex-fill plan-choose-btn" data-id="${p.id}" ${isCurrent ? 'disabled' : ''}>
                ${isCurrent ? 'Current Plan' : 'Choose Plan (Demo)'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.plan-ben-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = plans.find(x => x.id === btn.dataset.id);
        if (!p) return;
        document.getElementById('planBenefitsTitle').textContent = `${p.name} (${p.price}/month)`;
        document.getElementById('planBenefitsBody').innerHTML = `
          <ul class="small d-flex flex-column gap-2 mb-0">
            ${p.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
        `;
        new bootstrap.Modal(document.getElementById('planBenefitsModal')).show();
      });
    });

    grid.querySelectorAll('.plan-choose-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = plans.find(x => x.id === btn.dataset.id);
        if (!p) return;
        const st = window.COURTLY_USER.getState();
        st.membership.planId = p.id;
        st.membership.planName = p.name;
        st.membership.price = p.numericPrice || 999;
        st.membership.includedHours = PLAN_HOURS[p.id] || 10;
        st.membership.usedHours = Math.min(st.membership.usedHours, st.membership.includedHours);
        window.COURTLY_USER.saveState(st);
        renderSpotlight();
        renderPlans();
        window.COURTLY_USER.showToast(`Demo plan switched to ${p.name} (no real payment processed).`);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSpotlight();
    renderPlans();
  });
})();
