/**
 * COURTLY PLAYER DASHBOARD - Overview Script
 */
(function () {
  'use strict';

  function renderDate() {
    const el = document.getElementById('userCurrentDate');
    if (el) {
      el.textContent = new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
      });
    }
  }

  function renderMembershipCard() {
    const wrap = document.getElementById('userDashMembershipCard');
    if (!wrap) return;
    const state = window.COURTLY_USER.getState();
    const m = state.membership;
    const remaining = Math.max(0, m.includedHours - m.usedHours);
    const pct = Math.min(100, Math.round((m.usedHours / Math.max(m.includedHours, 1)) * 100));

    wrap.innerHTML = `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="user-demo-pill">MEMBERSHIP OVERVIEW</span>
          <span class="status-badge active">${m.status}</span>
        </div>
        <h2 class="h4 fw-bold mb-1">${m.planName}</h2>
        <div class="fs-4 fw-bold text-teal mb-3">${window.COURTLY_USER.formatINR(m.price)} <span class="small text-muted fw-normal">/ month</span></div>

        <div class="d-flex justify-content-between small mb-1">
          <span class="text-muted">Included Hours: <strong>${m.includedHours} hrs</strong></span>
          <span class="text-teal fw-bold">${m.usedHours}h used (demo) &bull; ${remaining}h left</span>
        </div>
        <div class="user-progress-track mb-3">
          <div class="user-progress-fill user-progress-animate" style="width:${pct}%;"></div>
        </div>

        <ul class="list-unstyled small text-muted d-flex flex-column gap-1 mb-3">
          <li>10 court booking hours &bull; Priority booking access</li>
          <li>Tournament registration benefits &bull; Exclusive member offers</li>
        </ul>
      </div>
      <a href="memberships.html" class="btn-user-primary w-100">View Membership</a>
    `;
  }

  function renderCourtsGrid(filterQuery) {
    const wrap = document.getElementById('userDashCourtsGrid');
    if (!wrap) return;
    const state = window.COURTLY_USER.getState();
    const q = (filterQuery || '').toLowerCase();
    const courts = (state.courts || []).filter(c => !q || c.name.toLowerCase().includes(q) || c.sport.toLowerCase().includes(q));

    wrap.innerHTML = courts.map(c => `
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="user-card user-card-hover h-100 d-flex flex-column gap-2">
          <div class="position-relative">
            <img src="${c.image}" alt="${c.name}" class="user-thumb-img" style="height:145px;">
            <span class="status-badge available position-absolute top-0 end-0 m-2">${c.status} (Demo)</span>
          </div>
          <div class="small text-teal fw-bold">${c.sport}</div>
          <h3 class="h6 fw-bold mb-0">${c.name}</h3>
          <div class="fw-bold text-lime">${window.COURTLY_USER.formatINR(c.price)} <span class="small text-muted fw-normal">/ hr</span></div>
          <p class="small text-muted mb-2 flex-grow-1">${c.description}</p>
          <div class="d-flex gap-2 mt-auto">
            <a href="find-courts.html" class="btn-user-outline btn-sm flex-fill">View Court</a>
            <a href="find-courts.html?book=${c.id}" class="btn-user-lime btn-sm flex-fill">Book Now</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderTournaments() {
    const wrap = document.getElementById('userDashTournaments');
    if (!wrap) return;
    const state = window.COURTLY_USER.getState();
    wrap.innerHTML = (state.tournaments || []).filter(t => !t.isPast).slice(0, 3).map(t => `
      <div class="p-3 rounded-4 border border-secondary border-opacity-25 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3" style="background:var(--bg-elevated);">
        <div class="d-flex align-items-center gap-3">
          <img src="${t.image}" alt="${t.name}" class="rounded-3" style="width:62px;height:62px;object-fit:cover;flex-shrink:0;">
          <div>
            <div class="fw-bold small">${t.name}</div>
            <div class="small text-muted">${t.sport} &bull; ${t.date} &bull; ${t.venue}</div>
            <span class="small text-teal fw-semibold">${t.regStatus}</span>
          </div>
        </div>
        <a href="tournaments.html" class="btn-user-outline btn-sm flex-shrink-0">View Details</a>
      </div>
    `).join('');
  }

  function renderActivity() {
    const wrap = document.getElementById('userDashActivity');
    if (!wrap) return;
    const state = window.COURTLY_USER.getState();
    wrap.innerHTML = (state.activities || []).slice(0, 4).map(a => `
      <div class="user-timeline-item">
        <span class="user-timeline-dot" style="background:${a.color};"></span>
        <div>
          <div class="small fw-medium">${a.text}</div>
          <small class="text-muted">${a.time}</small>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderDate();
    renderMembershipCard();
    renderCourtsGrid();
    renderTournaments();
    renderActivity();

    window.addEventListener('courtlyUserSearch', (e) => renderCourtsGrid(e.detail.query));
  });
})();
