/**
 * COURTLY ADMIN - Membership Management Script
 */
(function () {
  'use strict';

  const PLAN_PRICES = { 'Starter': 499, 'Pro Athlete': 999, 'Elite Player': 1799 };

  function renderPlanCards() {
    const wrap = document.getElementById('adminPlanCards');
    if (!wrap) return;
    const plans = (window.COURTLY_DATA && window.COURTLY_DATA.membershipPlans) || [
      { id: 'starter', name: 'Starter', price: '₹499', period: '/ month', benefits: ['4 court booking hours', 'Standard booking access', 'Basic player dashboard', 'Community event updates'] },
      { id: 'pro-athlete', name: 'Pro Athlete', price: '₹999', period: '/ month', badge: 'MOST POPULAR', benefits: ['10 court booking hours', 'Priority booking access', 'Tournament registration benefits', 'Exclusive member offers'] },
      { id: 'elite-player', name: 'Elite Player', price: '₹1,799', period: '/ month', badge: 'VIP ACCESS', benefits: ['20 court booking hours', 'Premium booking access', 'Special tournament benefits', 'Exclusive member privileges'] }
    ];

    wrap.innerHTML = plans.map(p => `
      <div class="col-12 col-md-4">
        <div class="admin-card admin-card-hover h-100 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h3 class="h5 fw-bold mb-0">${p.name}</h3>
            ${p.badge ? `<span class="admin-demo-pill">${p.badge}</span>` : ''}
          </div>
          <div class="fs-3 fw-bold text-teal mb-3">${p.price} <span class="fs-6 text-muted fw-normal">${p.period}</span></div>
          <ul class="list-unstyled small text-muted d-flex flex-column gap-2 mb-0">
            ${p.benefits.map(b => `<li class="d-flex align-items-center gap-2"><span style="width:6px;height:6px;border-radius:50%;background:var(--color-lime);flex-shrink:0;"></span><span>${b}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  function renderSummaryAndDistribution() {
    const state = window.COURTLY_ADMIN.getState();
    const subs = state.subscriptions || [];
    const active = subs.filter(s => s.status === 'Active');
    const totalEl = document.getElementById('totalActiveSubs');
    if (totalEl) totalEl.textContent = active.length;

    const distWrap = document.getElementById('planDistributionBars');
    if (!distWrap) return;
    const total = Math.max(subs.length, 1);
    const counts = [
      { name: 'Starter (₹499/mo)', count: subs.filter(s => s.planName === 'Starter').length },
      { name: 'Pro Athlete (₹999/mo)', count: subs.filter(s => s.planName === 'Pro Athlete').length },
      { name: 'Elite Player (₹1,799/mo)', count: subs.filter(s => s.planName === 'Elite Player').length }
    ];

    distWrap.innerHTML = counts.map(c => {
      const pct = Math.round((c.count / total) * 100);
      return `
        <div>
          <div class="d-flex justify-content-between small mb-1">
            <span class="fw-semibold">${c.name}</span>
            <span class="text-teal fw-bold">${c.count} members (${pct}%)</span>
          </div>
          <div class="admin-progress-track">
            <div class="admin-progress-fill" style="width:${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTable() {
    const tbody = document.getElementById('memTableBody');
    if (!tbody) return;
    const state = window.COURTLY_ADMIN.getState();
    const q = (document.getElementById('memSearch')?.value || '').trim().toLowerCase();
    const planF = document.getElementById('memPlanFilter')?.value || 'all';
    const statusF = document.getElementById('memStatusFilter')?.value || 'all';

    const rows = (state.subscriptions || []).filter(s => {
      if (q && !s.player.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false;
      if (planF !== 'all' && s.planName !== planF) return false;
      if (statusF !== 'all' && s.status !== statusF) return false;
      return true;
    });

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No matching subscriptions found.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(s => `
      <tr>
        <td class="fw-bold">${s.id}</td>
        <td>
          <div class="fw-semibold">${s.player}</div>
          <small class="text-muted">${s.email}</small>
        </td>
        <td>${s.planName}</td>
        <td class="fw-bold text-teal">${window.COURTLY_ADMIN.formatINR(s.price)}/mo</td>
        <td>${s.startDate}</td>
        <td>${s.endDate}</td>
        <td><span class="status-badge ${s.status.toLowerCase()}">${s.status}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 mem-view-btn" data-id="${s.id}" style="font-size:0.74rem;">View</button>
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 mem-edit-btn" data-id="${s.id}" style="font-size:0.74rem;">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.mem-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = state.subscriptions.find(x => x.id === btn.dataset.id);
        if (!s) return;
        document.getElementById('viewMemberBody').innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="admin-demo-pill">DEMO SUBSCRIPTION</span>
            <span class="status-badge ${s.status.toLowerCase()}">${s.status}</span>
          </div>
          <p class="small mb-1"><strong>Player:</strong> ${s.player} (${s.email})</p>
          <p class="small mb-1"><strong>Plan:</strong> ${s.planName} — ${window.COURTLY_ADMIN.formatINR(s.price)}/month</p>
          <p class="small mb-0"><strong>Validity:</strong> ${s.startDate} to ${s.endDate}</p>
        `;
        new bootstrap.Modal(document.getElementById('viewMemberModal')).show();
      });
    });

    tbody.querySelectorAll('.mem-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = state.subscriptions.find(x => x.id === btn.dataset.id);
        if (!s) return;
        document.getElementById('editSubId').value = s.id;
        document.getElementById('editSubPlayer').value = s.player;
        document.getElementById('editSubPlan').value = s.planName;
        document.getElementById('editSubStatus').value = s.status;
        document.getElementById('editSubEnd').value = s.endDate;
        new bootstrap.Modal(document.getElementById('editSubModal')).show();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderPlanCards();
    renderSummaryAndDistribution();
    renderTable();

    ['memSearch', 'memPlanFilter', 'memStatusFilter'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderTable);
      document.getElementById(id)?.addEventListener('change', renderTable);
    });

    document.getElementById('editSubForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('editSubId').value;
      const idx = state.subscriptions.findIndex(x => x.id === id);
      if (idx > -1) {
        const newPlan = document.getElementById('editSubPlan').value;
        state.subscriptions[idx].planName = newPlan;
        state.subscriptions[idx].price = PLAN_PRICES[newPlan] || 499;
        state.subscriptions[idx].status = document.getElementById('editSubStatus').value;
        state.subscriptions[idx].endDate = document.getElementById('editSubEnd').value;
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('editSubModal')).hide();
      renderSummaryAndDistribution();
      renderTable();
      window.COURTLY_ADMIN.showToast(`Updated subscription ${id} (demo).`);
    });

    window.addEventListener('courtlyAdminSearch', (e) => {
      const input = document.getElementById('memSearch');
      if (input) { input.value = e.detail.query; renderTable(); }
    });
  });
})();
