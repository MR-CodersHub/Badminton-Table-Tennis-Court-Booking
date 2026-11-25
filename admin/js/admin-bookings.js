/**
 * COURTLY ADMIN - Bookings Management Script
 */
(function () {
  'use strict';

  let pendingCancelId = null;

  function populateCourtSelects() {
    const state = window.COURTLY_ADMIN.getState();
    const filterSel = document.getElementById('bkCourt');
    const addSel = document.getElementById('addBkCourt');
    if (filterSel) {
      filterSel.innerHTML = '<option value="all">All Courts</option>' +
        state.courts.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }
    if (addSel) {
      addSel.innerHTML = state.courts.map(c => `<option value="${c.id}">${c.name} (₹${c.price}/hr)</option>`).join('');
    }
  }

  function getFilteredBookings() {
    const state = window.COURTLY_ADMIN.getState();
    const q = (document.getElementById('bkSearch')?.value || '').trim().toLowerCase();
    const sport = document.getElementById('bkSport')?.value || 'all';
    const court = document.getElementById('bkCourt')?.value || 'all';
    const status = document.getElementById('bkStatus')?.value || 'all';
    const date = document.getElementById('bkDate')?.value || '';

    return (state.bookings || []).filter(b => {
      if (q && !b.id.toLowerCase().includes(q) && !b.player.toLowerCase().includes(q)) return false;
      if (sport !== 'all' && b.sport !== sport) return false;
      if (court !== 'all' && b.court !== court) return false;
      if (status !== 'all' && b.status !== status) return false;
      if (date && b.date !== date) return false;
      return true;
    });
  }

  function renderSummary() {
    const state = window.COURTLY_ADMIN.getState();
    const all = state.bookings || [];
    const cards = [
      { label: 'Total Demo Bookings', val: all.length, cls: 'blue' },
      { label: 'Confirmed', val: all.filter(b => b.status === 'Confirmed').length, cls: 'teal' },
      { label: 'Pending', val: all.filter(b => b.status === 'Pending').length, cls: 'amber' },
      { label: 'Cancelled', val: all.filter(b => b.status === 'Cancelled').length, cls: 'lime' }
    ];
    const wrap = document.getElementById('bookingSummaryCards');
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

  function renderTable() {
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;
    const rows = getFilteredBookings();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">No demo bookings match the selected filters.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(b => `
      <tr>
        <td>
          <div class="fw-bold">${b.id}</div>
          <small class="text-muted">Demo</small>
        </td>
        <td>${b.player}</td>
        <td>${b.court}</td>
        <td>${b.sport}</td>
        <td>${b.date}</td>
        <td>${b.slot}</td>
        <td class="fw-bold text-teal">${window.COURTLY_ADMIN.formatINR(b.amount)}</td>
        <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
        <td>
          <div class="d-flex flex-wrap gap-1">
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 bk-view-btn" data-id="${b.id}" style="font-size:0.74rem;">View</button>
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 bk-edit-btn" data-id="${b.id}" style="font-size:0.74rem;">Edit</button>
            ${b.status !== 'Cancelled' ? `<button type="button" class="btn btn-outline-danger btn-sm py-1 px-2 bk-cancel-btn" data-id="${b.id}" style="font-size:0.74rem;">Cancel</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');

    wireRowActions();
  }

  function wireRowActions() {
    const state = window.COURTLY_ADMIN.getState();

    document.querySelectorAll('.bk-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const b = state.bookings.find(x => x.id === btn.dataset.id);
        if (!b) return;
        document.getElementById('viewBookingBody').innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="admin-demo-pill">DEMO RECORD</span>
            <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
          </div>
          <div class="row g-2 small">
            <div class="col-6"><span class="text-muted d-block">Booking ID</span><strong>${b.id}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Player</span><strong>${b.player}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Court</span><strong>${b.court}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Sport</span><strong>${b.sport}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Date</span><strong>${b.date}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Time Slot</span><strong>${b.slot}</strong></div>
            <div class="col-12 mt-2"><span class="text-muted d-block">Amount</span><strong class="fs-5 text-teal">${window.COURTLY_ADMIN.formatINR(b.amount)}</strong></div>
          </div>
        `;
        new bootstrap.Modal(document.getElementById('viewBookingModal')).show();
      });
    });

    document.querySelectorAll('.bk-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const b = state.bookings.find(x => x.id === btn.dataset.id);
        if (!b) return;
        document.getElementById('editBkId').value = b.id;
        document.getElementById('editBkPlayer').value = b.player;
        document.getElementById('editBkDate').value = b.date;
        document.getElementById('editBkStatus').value = b.status;
        document.getElementById('editBkSlot').value = b.slot;
        new bootstrap.Modal(document.getElementById('editBookingModal')).show();
      });
    });

    document.querySelectorAll('.bk-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingCancelId = btn.dataset.id;
        document.getElementById('cancelBkLabel').textContent = pendingCancelId;
        new bootstrap.Modal(document.getElementById('cancelBookingModal')).show();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateCourtSelects();
    renderSummary();
    renderTable();

    const dateInput = document.getElementById('addBkDate');
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    ['bkSearch', 'bkSport', 'bkCourt', 'bkStatus', 'bkDate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderTable);
      document.getElementById(id)?.addEventListener('change', renderTable);
    });

    document.getElementById('bkResetFilters')?.addEventListener('click', () => {
      document.getElementById('bkSearch').value = '';
      document.getElementById('bkSport').value = 'all';
      document.getElementById('bkCourt').value = 'all';
      document.getElementById('bkStatus').value = 'all';
      document.getElementById('bkDate').value = '';
      renderTable();
    });

    document.getElementById('addBookingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const courtId = document.getElementById('addBkCourt').value;
      const court = state.courts.find(c => c.id === courtId) || state.courts[0];
      const newBk = {
        id: 'BK-' + Math.floor(26200 + Math.random() * 700),
        player: document.getElementById('addBkPlayer').value.trim(),
        court: court.name,
        sport: court.sport,
        date: document.getElementById('addBkDate').value,
        slot: document.getElementById('addBkSlot').value,
        amount: court.price,
        status: document.getElementById('addBkStatus').value,
        isDemo: true
      };
      state.bookings.unshift(newBk);
      window.COURTLY_ADMIN.saveState(state);
      bootstrap.Modal.getInstance(document.getElementById('addBookingModal')).hide();
      e.target.reset();
      renderSummary();
      renderTable();
      window.COURTLY_ADMIN.showToast(`Demo booking ${newBk.id} added.`);
    });

    document.getElementById('editBookingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('editBkId').value;
      const idx = state.bookings.findIndex(x => x.id === id);
      if (idx > -1) {
        state.bookings[idx].player = document.getElementById('editBkPlayer').value.trim();
        state.bookings[idx].date = document.getElementById('editBkDate').value;
        state.bookings[idx].status = document.getElementById('editBkStatus').value;
        state.bookings[idx].slot = document.getElementById('editBkSlot').value.trim();
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('editBookingModal')).hide();
      renderSummary();
      renderTable();
      window.COURTLY_ADMIN.showToast(`Updated demo booking ${id}.`);
    });

    document.getElementById('confirmCancelBkBtn')?.addEventListener('click', () => {
      if (!pendingCancelId) return;
      const state = window.COURTLY_ADMIN.getState();
      const idx = state.bookings.findIndex(x => x.id === pendingCancelId);
      if (idx > -1) {
        state.bookings[idx].status = 'Cancelled';
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('cancelBookingModal')).hide();
      renderSummary();
      renderTable();
      window.COURTLY_ADMIN.showToast(`Booking ${pendingCancelId} marked Cancelled.`, 'danger');
      pendingCancelId = null;
    });

    document.getElementById('exportBookingsCsvBtn')?.addEventListener('click', () => {
      const rows = getFilteredBookings().map(b => [b.id, b.player, b.court, b.sport, b.date, b.slot, `₹${b.amount}`, b.status]);
      window.COURTLY_ADMIN.exportCSV('courtly-demo-bookings.csv', ['Booking ID', 'Player', 'Court', 'Sport', 'Date', 'Time Slot', 'Amount', 'Status'], rows);
    });

    window.addEventListener('courtlyAdminSearch', (e) => {
      const input = document.getElementById('bkSearch');
      if (input) {
        input.value = e.detail.query;
        renderTable();
      }
    });
  });
})();
