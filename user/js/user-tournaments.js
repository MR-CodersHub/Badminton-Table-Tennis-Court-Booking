/**
 * COURTLY PLAYER DASHBOARD - Tournaments Script
 */
(function () {
  'use strict';

  let activeTab = 'open';

  function renderSummary() {
    const state = window.COURTLY_USER.getState();
    const list = state.tournaments || [];
    const wrap = document.getElementById('userTournSummary');
    if (!wrap) return;
    const cards = [
      { label: 'Available Tournaments', val: list.filter(t => !t.isPast).length },
      { label: 'My Registrations (Demo)', val: list.filter(t => t.isRegistered && !t.isPast).length },
      { label: 'Upcoming Matches', val: list.filter(t => t.isRegistered && !t.isPast).length }
    ];
    wrap.innerHTML = cards.map(c => `
      <div class="col-12 col-sm-4">
        <div class="user-card user-card-hover">
          <span class="small text-muted fw-semibold">${c.label}</span>
          <div class="user-kpi-value mt-1">${c.val}</div>
        </div>
      </div>
    `).join('');
  }

  function renderGrid(searchQuery) {
    const grid = document.getElementById('userTournamentsGrid');
    if (!grid) return;
    const state = window.COURTLY_USER.getState();
    const q = (searchQuery || '').toLowerCase();

    const rows = (state.tournaments || []).filter(t => {
      if (activeTab === 'open' && t.isPast) return false;
      if (activeTab === 'mine' && (!t.isRegistered || t.isPast)) return false;
      if (activeTab === 'past' && !t.isPast) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.sport.toLowerCase().includes(q)) return false;
      return true;
    });

    if (!rows.length) {
      grid.innerHTML = '<div class="col-12"><div class="user-card text-center text-muted py-5">No tournaments found in this category.</div></div>';
      return;
    }

    grid.innerHTML = rows.map(t => `
      <div class="col-12 col-md-6">
        <div class="user-card user-card-hover h-100 d-flex flex-column gap-3">
          <div class="position-relative">
            <img src="${t.image}" alt="${t.name}" class="user-thumb-img">
            <span class="status-badge ${t.isPast ? 'past' : 'open'} position-absolute top-0 end-0 m-3">${t.regStatus}</span>
          </div>
          <div>
            <span class="small text-teal fw-bold text-uppercase">${t.sport} &bull; ${t.date}</span>
            <h2 class="h5 fw-bold mt-1 mb-1">${t.name}</h2>
            <p class="small text-muted mb-0">${t.subtitle} &bull; Venue: ${t.venue}</p>
            <p class="small text-muted mb-0">Entry Fee: <strong class="text-lime">${t.entryFee}</strong> &bull; Prize Pool: <strong>${t.prizePool}</strong></p>
          </div>
          <div class="mt-auto pt-2 border-top border-secondary border-opacity-25 d-flex gap-2">
            <button type="button" class="btn-user-outline btn-sm ut-view-btn" data-id="${t.id}">View Details</button>
            ${!t.isPast ? `
              <button type="button" class="${t.isRegistered ? 'btn-user-primary' : 'btn-user-lime'} btn-sm ut-reg-btn" data-id="${t.id}" ${t.isRegistered ? 'disabled' : ''}>
                ${t.isRegistered ? 'Registered (Demo)' : 'Register Now'}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.ut-view-btn, .ut-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.id));
    });
  }

  function openModal(id) {
    const state = window.COURTLY_USER.getState();
    const t = state.tournaments.find(x => x.id === id);
    if (!t) return;
    document.getElementById('utModalId').value = t.id;
    document.getElementById('utModalTitle').textContent = t.name;
    document.getElementById('utModalDesc').textContent = `${t.subtitle} — Hosted at ${t.venue}.`;
    document.getElementById('utModalMeta').innerHTML = `
      <div class="col-6"><span class="text-muted d-block">Sport</span><strong>${t.sport}</strong></div>
      <div class="col-6"><span class="text-muted d-block">Date</span><strong>${t.date}</strong></div>
      <div class="col-6"><span class="text-muted d-block">Entry Fee</span><strong class="text-lime">${t.entryFee}</strong></div>
      <div class="col-6"><span class="text-muted d-block">Prize Pool</span><strong>${t.prizePool}</strong></div>
    `;
    const regFields = document.getElementById('utRegFields');
    const submitBtn = document.getElementById('utSubmitRegBtn');
    if (t.isPast || t.isRegistered) {
      regFields.style.display = 'none';
      submitBtn.style.display = 'none';
    } else {
      regFields.style.display = 'block';
      submitBtn.style.display = 'inline-flex';
    }
    new bootstrap.Modal(document.getElementById('userTournModal')).show();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderGrid();

    document.querySelectorAll('.ut-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        document.querySelectorAll('.ut-tab-btn').forEach(b => {
          b.className = b === btn ? 'btn-user-primary btn-sm ut-tab-btn' : 'btn-user-outline btn-sm ut-tab-btn';
        });
        renderGrid();
      });
    });

    document.getElementById('userTournRegForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_USER.getState();
      const id = document.getElementById('utModalId').value;
      const idx = state.tournaments.findIndex(x => x.id === id);
      if (idx > -1) {
        state.tournaments[idx].isRegistered = true;
        state.activities.unshift({
          id: 'ua-' + Date.now(),
          text: `Demo tournament registration submitted for ${state.tournaments[idx].name}`,
          time: 'Just now',
          color: 'var(--color-electric-blue)'
        });
        window.COURTLY_USER.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('userTournModal')).hide();
      renderSummary();
      renderGrid();
      window.COURTLY_USER.showToast('Demo tournament registration saved locally.');
    });

    window.addEventListener('courtlyUserSearch', (e) => renderGrid(e.detail.query));
  });
})();
