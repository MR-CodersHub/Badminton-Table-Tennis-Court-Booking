/**
 * COURTLY PLAYER DASHBOARD - My Bookings Script
 */
(function () {
  'use strict';

  function getFiltered() {
    const state = window.COURTLY_USER.getState();
    const q = (document.getElementById('mbSearch')?.value || '').trim().toLowerCase();
    const status = document.getElementById('mbStatus')?.value || 'all';
    const sport = document.getElementById('mbSport')?.value || 'all';

    return (state.bookings || []).filter(b => {
      if (q && !b.id.toLowerCase().includes(q) && !b.court.toLowerCase().includes(q)) return false;
      if (status !== 'all' && b.status !== status) return false;
      if (sport !== 'all' && b.sport !== sport) return false;
      return true;
    });
  }

  function renderSummary() {
    const state = window.COURTLY_USER.getState();
    const all = state.bookings || [];
    const cards = [
      { label: 'Total Bookings (Demo)', val: all.length },
      { label: 'Upcoming', val: all.filter(b => b.status === 'Upcoming').length },
      { label: 'Completed', val: all.filter(b => b.status === 'Completed').length },
      { label: 'Cancelled', val: all.filter(b => b.status === 'Cancelled').length }
    ];
    const wrap = document.getElementById('myBookingSummary');
    if (!wrap) return;
    wrap.innerHTML = cards.map(c => `
      <div class="col-6 col-lg-3">
        <div class="user-card user-card-hover">
          <span class="small text-muted fw-semibold">${c.label}</span>
          <div class="user-kpi-value mt-1">${c.val}</div>
        </div>
      </div>
    `).join('');
  }

  function renderViews() {
    const rows = getFiltered();
    const tbody = document.getElementById('myBookingsTableBody');
    const mobile = document.getElementById('myBookingsMobileCards');

    if (tbody) {
      tbody.innerHTML = rows.length ? rows.map(b => `
        <tr>
          <td class="fw-bold">${b.id}</td>
          <td>${b.court}</td>
          <td>${b.sport}</td>
          <td>${b.date}</td>
          <td>${b.slot}</td>
          <td class="fw-bold text-teal">${window.COURTLY_USER.formatINR(b.amount)}</td>
          <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
          <td>
            <div class="d-flex flex-wrap gap-1">
              <button type="button" class="btn-user-outline btn-sm py-1 px-2 mb-view-btn" data-id="${b.id}" style="font-size:0.74rem;">Details</button>
              ${b.status === 'Upcoming' ? `
                <button type="button" class="btn-user-outline btn-sm py-1 px-2 mb-resched-btn" data-id="${b.id}" style="font-size:0.74rem;">Reschedule</button>
                <button type="button" class="btn btn-outline-danger btn-sm py-1 px-2 mb-cancel-btn" data-id="${b.id}" style="font-size:0.74rem;">Cancel</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('') : '<tr><td colspan="8" class="text-center text-muted py-4">No demo bookings match your filters.</td></tr>';
    }

    if (mobile) {
      mobile.innerHTML = rows.length ? rows.map(b => `
        <div class="user-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div class="fw-bold">${b.court}</div>
              <small class="text-muted">${b.id} &bull; ${b.sport}</small>
            </div>
            <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
          </div>
          <div class="small text-muted mb-2">${b.date} &bull; ${b.slot}</div>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25">
            <strong class="text-teal">${window.COURTLY_USER.formatINR(b.amount)}</strong>
            <div class="d-flex gap-1">
              <button type="button" class="btn-user-outline btn-sm py-1 px-2 mb-view-btn" data-id="${b.id}">Details</button>
              ${b.status === 'Upcoming' ? `<button type="button" class="btn btn-outline-danger btn-sm py-1 px-2 mb-cancel-btn" data-id="${b.id}">Cancel</button>` : ''}
            </div>
          </div>
        </div>
      `).join('') : '<div class="user-card text-center text-muted py-4">No demo bookings match your filters.</div>';
    }

    wireRowActions();
  }

  function wireRowActions() {
    const state = window.COURTLY_USER.getState();

    document.querySelectorAll('.mb-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const b = state.bookings.find(x => x.id === btn.dataset.id);
        if (!b) return;
        document.getElementById('myBookingDetailBody').innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="user-demo-pill">SAMPLE BOOKING RECORD</span>
            <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
          </div>
          <div class="row g-2 small">
            <div class="col-6"><span class="text-muted d-block">Booking ID</span><strong>${b.id}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Court</span><strong>${b.court}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Sport</span><strong>${b.sport}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Date</span><strong>${b.date}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Time Slot</span><strong>${b.slot}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Amount (Demo)</span><strong class="text-teal">${window.COURTLY_USER.formatINR(b.amount)}</strong></div>
          </div>
        `;
        new bootstrap.Modal(document.getElementById('myBookingDetailModal')).show();
      });
    });

    document.querySelectorAll('.mb-resched-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const b = state.bookings.find(x => x.id === btn.dataset.id);
        if (!b) return;
        document.getElementById('reschedId').value = b.id;
        document.getElementById('reschedDate').value = new Date().toISOString().slice(0, 10);
        new bootstrap.Modal(document.getElementById('rescheduleModal')).show();
      });
    });

    document.querySelectorAll('.mb-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = state.bookings.findIndex(x => x.id === btn.dataset.id);
        if (idx === -1) return;
        state.bookings[idx].status = 'Cancelled';
        state.bookings[idx].label = 'Cancelled (demo)';
        window.COURTLY_USER.saveState(state);
        renderSummary();
        renderViews();
        window.COURTLY_USER.showToast(`Demo booking ${btn.dataset.id} cancelled.`, 'danger');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderViews();

    ['mbSearch', 'mbStatus', 'mbSport'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderViews);
      document.getElementById(id)?.addEventListener('change', renderViews);
    });

    document.getElementById('mbResetBtn')?.addEventListener('click', () => {
      document.getElementById('mbSearch').value = '';
      document.getElementById('mbStatus').value = 'all';
      document.getElementById('mbSport').value = 'all';
      renderViews();
    });

    document.getElementById('rescheduleForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_USER.getState();
      const id = document.getElementById('reschedId').value;
      const idx = state.bookings.findIndex(x => x.id === id);
      if (idx > -1) {
        state.bookings[idx].date = document.getElementById('reschedDate').value;
        state.bookings[idx].slot = document.getElementById('reschedSlot').value;
        window.COURTLY_USER.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('rescheduleModal')).hide();
      renderViews();
      window.COURTLY_USER.showToast(`Demo booking ${id} rescheduled.`);
    });

    window.addEventListener('courtlyUserSearch', (e) => {
      const input = document.getElementById('mbSearch');
      if (input) { input.value = e.detail.query; renderViews(); }
    });
  });
})();
