/**
 * COURTLY ADMIN - Courts Management Script
 */
(function () {
  'use strict';

  function renderCourts(filterQuery) {
    const grid = document.getElementById('adminCourtsGrid');
    if (!grid) return;
    const state = window.COURTLY_ADMIN.getState();
    const q = (filterQuery || '').toLowerCase();

    const courts = (state.courts || []).filter(c => !q || c.name.toLowerCase().includes(q) || c.sport.toLowerCase().includes(q));

    grid.innerHTML = courts.map(c => {
      const cls = c.status.toLowerCase();
      return `
        <div class="col-12 col-md-6 col-xl-6">
          <div class="admin-card admin-card-hover h-100 d-flex flex-column gap-3">
            <div class="position-relative">
              <img src="${c.image}" alt="${c.name}" class="admin-thumb-img">
              <span class="status-badge ${cls} position-absolute top-0 end-0 m-3">${c.status}</span>
            </div>
            <div class="d-flex justify-content-between align-items-start gap-2">
              <div>
                <span class="small text-teal fw-bold text-uppercase">${c.sport} &bull; ${c.badge || 'Pro Arena'}</span>
                <h3 class="h5 fw-bold mt-1 mb-1">${c.name}</h3>
                <p class="small text-muted mb-0">${c.description || ''}</p>
              </div>
              <div class="text-end flex-shrink-0">
                <div class="fs-4 fw-bold text-lime">${window.COURTLY_ADMIN.formatINR(c.price)}</div>
                <small class="text-muted">per hour</small>
              </div>
            </div>

            <div>
              <div class="d-flex justify-content-between small mb-1">
                <span class="text-muted">Daily Occupancy</span>
                <strong class="text-teal">${c.occupancy}%</strong>
              </div>
              <div class="admin-progress-track">
                <div class="admin-progress-fill" style="width:${c.occupancy}%;"></div>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-auto pt-2 border-top border-secondary border-opacity-25">
              <button type="button" class="btn-admin-primary btn-sm court-edit-btn" data-id="${c.id}">Edit Court</button>
              <button type="button" class="btn-admin-outline btn-sm court-sched-btn" data-id="${c.id}">Manage Schedule</button>
              <button type="button" class="btn-admin-outline btn-sm court-maint-btn ms-auto" data-id="${c.id}">
                ${c.status === 'Maintenance' ? 'Mark Available' : 'Set Maintenance'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    wireEvents();
  }

  function wireEvents() {
    const state = window.COURTLY_ADMIN.getState();

    document.querySelectorAll('.court-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = state.courts.find(x => x.id === btn.dataset.id);
        if (!c) return;
        document.getElementById('editCourtId').value = c.id;
        document.getElementById('editCourtName').value = c.name;
        document.getElementById('editCourtSport').value = c.sport;
        document.getElementById('editCourtPrice').value = c.price;
        document.getElementById('editCourtStatus').value = c.status;
        document.getElementById('editCourtOcc').value = c.occupancy;
        new bootstrap.Modal(document.getElementById('editCourtModal')).show();
      });
    });

    document.querySelectorAll('.court-sched-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = state.courts.find(x => x.id === btn.dataset.id);
        if (!c) return;
        document.getElementById('scheduleModalTitle').textContent = `${c.name} — Schedule (Demo)`;
        const slots = ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'];
        document.getElementById('scheduleModalBody').innerHTML = `
          <p class="small text-muted mb-3">Hourly rate: <strong>${window.COURTLY_ADMIN.formatINR(c.price)}</strong> &bull; Current status: <strong>${c.status}</strong></p>
          <div class="d-flex flex-column gap-2">
            ${slots.map((s, idx) => `
              <div class="d-flex justify-content-between align-items-center p-2 rounded-3 border border-secondary border-opacity-25">
                <span class="small fw-semibold">${s}</span>
                <span class="status-badge ${idx === 3 ? 'occupied' : 'available'}">${idx === 3 ? 'Occupied (Demo)' : 'Open'}</span>
              </div>
            `).join('')}
          </div>
        `;
        new bootstrap.Modal(document.getElementById('scheduleCourtModal')).show();
      });
    });

    document.querySelectorAll('.court-maint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = state.courts.findIndex(x => x.id === btn.dataset.id);
        if (idx === -1) return;
        const nextStatus = state.courts[idx].status === 'Maintenance' ? 'Available' : 'Maintenance';
        state.courts[idx].status = nextStatus;
        window.COURTLY_ADMIN.saveState(state);
        renderCourts();
        window.COURTLY_ADMIN.showToast(`${state.courts[idx].name} status set to ${nextStatus}.`);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCourts();

    document.getElementById('editCourtForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('editCourtId').value;
      const idx = state.courts.findIndex(x => x.id === id);
      if (idx > -1) {
        state.courts[idx].name = document.getElementById('editCourtName').value.trim();
        state.courts[idx].sport = document.getElementById('editCourtSport').value;
        state.courts[idx].price = Number(document.getElementById('editCourtPrice').value);
        state.courts[idx].status = document.getElementById('editCourtStatus').value;
        state.courts[idx].occupancy = Number(document.getElementById('editCourtOcc').value);
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('editCourtModal')).hide();
      renderCourts();
      window.COURTLY_ADMIN.showToast('Court details updated (demo).');
    });

    document.getElementById('addCourtForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const sport = document.getElementById('newCourtSport').value;
      const newCourt = {
        id: 'court-' + Date.now(),
        code: sport === 'Badminton' ? 'C-NEW' : 'TT-NEW',
        name: document.getElementById('newCourtName').value.trim(),
        sport,
        price: Number(document.getElementById('newCourtPrice').value),
        status: 'Available',
        occupancy: 45,
        currentSlot: '07:00 PM - 08:00 PM (Open)',
        badge: 'Demo Court',
        image: sport === 'Badminton'
          ? 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85'
          : 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=85',
        description: document.getElementById('newCourtDesc').value.trim() || 'Newly added demonstration indoor court.'
      };
      state.courts.push(newCourt);
      window.COURTLY_ADMIN.saveState(state);
      bootstrap.Modal.getInstance(document.getElementById('addCourtModal')).hide();
      e.target.reset();
      renderCourts();
      window.COURTLY_ADMIN.showToast(`Added sample court: ${newCourt.name}`);
    });

    window.addEventListener('courtlyAdminSearch', (e) => renderCourts(e.detail.query));
  });
})();
