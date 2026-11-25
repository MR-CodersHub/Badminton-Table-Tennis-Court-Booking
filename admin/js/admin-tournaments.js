/**
 * COURTLY ADMIN - Tournament Management Script
 */
(function () {
  'use strict';

  let currentFilter = 'all';

  function renderSummary() {
    const state = window.COURTLY_ADMIN.getState();
    const list = state.tournaments || [];
    const cards = [
      { label: 'Total Tournaments', val: list.length },
      { label: 'Upcoming', val: list.filter(t => t.status === 'Upcoming').length },
      { label: 'Ongoing', val: list.filter(t => t.status === 'Ongoing').length },
      { label: 'Completed', val: list.filter(t => t.status === 'Completed').length }
    ];
    const wrap = document.getElementById('tournSummaryCards');
    if (!wrap) return;
    wrap.innerHTML = cards.map(c => `
      <div class="col-6 col-lg-3">
        <div class="admin-card admin-card-hover">
          <span class="small text-muted fw-semibold">${c.label}</span>
          <div class="admin-kpi-value mt-1">${c.val}</div>
        </div>
      </div>
    `).join('');
  }

  function renderTournaments(searchQuery) {
    const grid = document.getElementById('adminTournamentsGrid');
    if (!grid) return;
    const state = window.COURTLY_ADMIN.getState();
    const q = (searchQuery || '').toLowerCase();

    const rows = (state.tournaments || []).filter(t => {
      if (currentFilter !== 'all' && t.status !== currentFilter) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.sport.toLowerCase().includes(q)) return false;
      return true;
    });

    if (!rows.length) {
      grid.innerHTML = '<div class="col-12"><div class="admin-card text-center text-muted py-5">No tournaments match the selected filter.</div></div>';
      return;
    }

    grid.innerHTML = rows.map(t => {
      const pct = Math.min(100, Math.round((t.registered / Math.max(t.capacity, 1)) * 100));
      return `
        <div class="col-12 col-md-6">
          <div class="admin-card admin-card-hover h-100 d-flex flex-column gap-3">
            <div class="position-relative">
              <img src="${t.image}" alt="${t.name}" class="admin-thumb-img">
              <span class="status-badge ${t.status.toLowerCase()} position-absolute top-0 end-0 m-3">${t.status}</span>
            </div>
            <div>
              <span class="small text-teal fw-bold text-uppercase">${t.sport} &bull; ${t.date}</span>
              <h3 class="h5 fw-bold mt-1 mb-1">${t.name}</h3>
              <p class="small text-muted mb-0">${t.subtitle || ''} &bull; Entry: <strong>${t.entryFee}</strong> &bull; Prize: <strong class="text-lime">${t.prizePool}</strong></p>
            </div>
            <div>
              <div class="d-flex justify-content-between small mb-1">
                <span class="text-muted">Registrations (${t.regStatus})</span>
                <strong class="text-teal">${t.registered} / ${t.capacity}</strong>
              </div>
              <div class="admin-progress-track">
                <div class="admin-progress-fill" style="width:${pct}%;"></div>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-2 mt-auto pt-2 border-top border-secondary border-opacity-25">
              <button type="button" class="btn-admin-primary btn-sm tourn-edit-btn" data-id="${t.id}">Edit</button>
              <button type="button" class="btn-admin-outline btn-sm tourn-part-btn" data-id="${t.id}">View Participants</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    wireCardActions();
  }

  function wireCardActions() {
    const state = window.COURTLY_ADMIN.getState();

    document.querySelectorAll('.tourn-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = state.tournaments.find(x => x.id === btn.dataset.id);
        if (!t) return;
        document.getElementById('editTournId').value = t.id;
        document.getElementById('editTournName').value = t.name;
        document.getElementById('editTournDate').value = t.date;
        document.getElementById('editTournStatus').value = t.status;
        document.getElementById('editTournReg').value = t.registered;
        document.getElementById('editTournRegLabel').value = t.regStatus;
        new bootstrap.Modal(document.getElementById('editTournModal')).show();
      });
    });

    document.querySelectorAll('.tourn-part-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = state.tournaments.find(x => x.id === btn.dataset.id);
        if (!t) return;
        document.getElementById('partModalTitle').textContent = `${t.name} — Participants (Demo)`;
        const samplePlayers = state.players.slice(0, 4);
        document.getElementById('partModalBody').innerHTML = `
          <p class="small text-muted mb-3">Showing sample registered players (${t.registered} total demo entries):</p>
          <div class="d-flex flex-column gap-2">
            ${samplePlayers.map((p, i) => `
              <div class="d-flex justify-content-between align-items-center p-2 rounded-3 border border-secondary border-opacity-25">
                <div class="d-flex align-items-center gap-2">
                  <img src="${p.avatar}" alt="${p.name}" class="admin-avatar-sm">
                  <div>
                    <div class="small fw-bold">${p.name}</div>
                    <small class="text-muted">Seed #${i + 1} &bull; ${p.plan}</small>
                  </div>
                </div>
                <span class="status-badge confirmed">Verified</span>
              </div>
            `).join('')}
          </div>
        `;
        new bootstrap.Modal(document.getElementById('participantsModal')).show();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderTournaments();

    document.querySelectorAll('.tourn-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.status;
        document.querySelectorAll('.tourn-tab-btn').forEach(b => {
          b.className = b === btn ? 'btn-admin-primary btn-sm tourn-tab-btn' : 'btn-admin-outline btn-sm tourn-tab-btn';
        });
        renderTournaments();
      });
    });

    document.getElementById('addTournForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const sport = document.getElementById('newTournSport').value;
      state.tournaments.unshift({
        id: 'tourn-' + Date.now(),
        name: document.getElementById('newTournName').value.trim(),
        subtitle: 'Club Championship (Demo)',
        sport,
        date: document.getElementById('newTournDate').value.trim(),
        entryFee: document.getElementById('newTournFee').value.trim(),
        prizePool: '₹75,000',
        registered: 4,
        capacity: Number(document.getElementById('newTournCap').value),
        status: 'Upcoming',
        regStatus: 'Open (Demo)',
        image: sport === 'Badminton'
          ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80'
          : 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=700&q=80'
      });
      window.COURTLY_ADMIN.saveState(state);
      bootstrap.Modal.getInstance(document.getElementById('addTournModal')).hide();
      e.target.reset();
      renderSummary();
      renderTournaments();
      window.COURTLY_ADMIN.showToast('Demo tournament added.');
    });

    document.getElementById('editTournForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('editTournId').value;
      const idx = state.tournaments.findIndex(x => x.id === id);
      if (idx > -1) {
        state.tournaments[idx].name = document.getElementById('editTournName').value.trim();
        state.tournaments[idx].date = document.getElementById('editTournDate').value.trim();
        state.tournaments[idx].status = document.getElementById('editTournStatus').value;
        state.tournaments[idx].registered = Number(document.getElementById('editTournReg').value);
        state.tournaments[idx].regStatus = document.getElementById('editTournRegLabel').value.trim();
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('editTournModal')).hide();
      renderSummary();
      renderTournaments();
      window.COURTLY_ADMIN.showToast('Tournament updated (demo).');
    });

    window.addEventListener('courtlyAdminSearch', (e) => renderTournaments(e.detail.query));
  });
})();
