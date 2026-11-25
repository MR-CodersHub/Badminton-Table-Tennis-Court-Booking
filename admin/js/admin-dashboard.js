/**
 * COURTLY ADMIN - Dashboard Overview Script
 */
(function () {
  'use strict';

  const CHART_DATA = {
    weekly: [
      { label: 'Mon', badminton: 22, tt: 14 },
      { label: 'Tue', badminton: 28, tt: 18 },
      { label: 'Wed', badminton: 25, tt: 20 },
      { label: 'Thu', badminton: 34, tt: 24 },
      { label: 'Fri', badminton: 42, tt: 29 },
      { label: 'Sat', badminton: 52, tt: 38 },
      { label: 'Sun', badminton: 46, tt: 33 }
    ],
    monthly: [
      { label: 'Jun', badminton: 120, tt: 84 },
      { label: 'Jul', badminton: 138, tt: 96 },
      { label: 'Aug', badminton: 145, tt: 102 },
      { label: 'Sep', badminton: 158, tt: 112 },
      { label: 'Oct', badminton: 170, tt: 124 },
      { label: 'Nov', badminton: 186, tt: 136 }
    ]
  };

  function renderDate() {
    const el = document.getElementById('dashCurrentDate');
    if (el) {
      el.textContent = new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
      });
    }
  }

  function renderChart(range) {
    const wrap = document.getElementById('dashBookingChart');
    if (!wrap) return;
    const rows = CHART_DATA[range] || CHART_DATA.weekly;
    const maxVal = Math.max(...rows.flatMap(r => [r.badminton, r.tt]), 1);

    wrap.innerHTML = rows.map(r => {
      const bPct = Math.round((r.badminton / maxVal) * 100);
      const tPct = Math.round((r.tt / maxVal) * 100);
      return `
        <div class="admin-chart-col">
          <div class="admin-chart-pair">
            <div class="admin-bar badminton admin-bar-animate" style="height:${bPct}%;" title="Badminton: ${r.badminton} bookings"></div>
            <div class="admin-bar tabletennis admin-bar-animate" style="height:${tPct}%;" title="Table Tennis: ${r.tt} bookings"></div>
          </div>
          <span class="admin-chart-label">${r.label}</span>
        </div>
      `;
    }).join('');
  }

  function renderCourtActivity() {
    const wrap = document.getElementById('dashCourtActivity');
    if (!wrap) return;
    const state = window.COURTLY_ADMIN.getState();

    wrap.innerHTML = (state.courts || []).slice(0, 4).map(c => {
      const cls = c.status.toLowerCase();
      return `
        <div class="p-3 rounded-4 border border-secondary border-opacity-25" style="background:var(--bg-elevated);">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <div>
              <div class="fw-bold small">${c.name}</div>
              <small class="text-muted">${c.sport} &bull; ${c.currentSlot}</small>
            </div>
            <span class="status-badge ${cls}">${c.status}</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="admin-progress-track flex-grow-1">
              <div class="admin-progress-fill admin-progress-animate" style="width:${c.occupancy}%;"></div>
            </div>
            <span class="small fw-bold text-teal">${c.occupancy}%</span>
            <a href="courts.html" class="btn-admin-outline btn-sm py-1 px-2" style="font-size:0.74rem;">Manage Court</a>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderRecentBookings() {
    const tbody = document.getElementById('dashRecentBookingsBody');
    if (!tbody) return;
    const state = window.COURTLY_ADMIN.getState();
    const query = (document.getElementById('dashBookingSearch')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('dashBookingStatusFilter')?.value || 'all';

    const filtered = (state.bookings || []).filter(b => {
      const matchesQ = !query || b.id.toLowerCase().includes(query) || b.player.toLowerCase().includes(query) || b.court.toLowerCase().includes(query);
      const matchesS = statusFilter === 'all' || b.status === statusFilter;
      return matchesQ && matchesS;
    }).slice(0, 6);

    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">No matching demo bookings found.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(b => `
      <tr>
        <td class="fw-bold">${b.id}</td>
        <td>${b.player}</td>
        <td>${b.court}</td>
        <td>${b.sport}</td>
        <td>${b.date}</td>
        <td>${b.slot}</td>
        <td class="fw-bold text-teal">${window.COURTLY_ADMIN.formatINR(b.amount)}</td>
        <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
        <td>
          <button type="button" class="btn-admin-outline btn-sm py-1 px-2 dash-view-booking" data-id="${b.id}" style="font-size:0.75rem;">View</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.dash-view-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        const booking = state.bookings.find(item => item.id === btn.dataset.id);
        if (!booking) return;
        const body = document.getElementById('dashBookingDetailBody');
        body.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="admin-demo-pill">DEMO BOOKING RECORD</span>
            <span class="status-badge ${booking.status.toLowerCase()}">${booking.status}</span>
          </div>
          <div class="row g-2 small">
            <div class="col-6"><span class="text-muted d-block">Booking ID</span><strong>${booking.id}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Player</span><strong>${booking.player}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Court</span><strong>${booking.court}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Sport</span><strong>${booking.sport}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Date</span><strong>${booking.date}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Time Slot</span><strong>${booking.slot}</strong></div>
            <div class="col-12 mt-2"><span class="text-muted d-block">Amount</span><strong class="fs-5 text-teal">${window.COURTLY_ADMIN.formatINR(booking.amount)}</strong></div>
          </div>
        `;
        new bootstrap.Modal(document.getElementById('dashBookingDetailModal')).show();
      });
    });
  }

  function renderTournaments() {
    const wrap = document.getElementById('dashUpcomingTournaments');
    if (!wrap) return;
    const state = window.COURTLY_ADMIN.getState();

    wrap.innerHTML = (state.tournaments || []).slice(0, 3).map(t => `
      <div class="col-12">
        <div class="p-3 rounded-4 border border-secondary border-opacity-25 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3" style="background:var(--bg-elevated);">
          <div class="d-flex align-items-center gap-3">
            <img src="${t.image}" alt="${t.name}" class="rounded-3" style="width:64px;height:64px;object-fit:cover;flex-shrink:0;">
            <div>
              <div class="fw-bold small">${t.name}</div>
              <div class="small text-muted">${t.sport} &bull; ${t.date}</div>
              <div class="small text-teal fw-semibold">${t.registered}/${t.capacity} Registered &bull; ${t.regStatus}</div>
            </div>
          </div>
          <a href="tournaments.html" class="btn-admin-outline btn-sm flex-shrink-0">Manage</a>
        </div>
      </div>
    `).join('');
  }

  function renderTimeline() {
    const wrap = document.getElementById('dashActivityTimeline');
    if (!wrap) return;
    const state = window.COURTLY_ADMIN.getState();
    wrap.innerHTML = (state.activities || []).map(a => `
      <div class="admin-timeline-item">
        <span class="admin-timeline-dot" style="background:${a.color};"></span>
        <div>
          <div class="small fw-medium">${a.text}</div>
          <small class="text-muted">${a.time}</small>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderDate();
    renderChart('weekly');
    renderCourtActivity();
    renderRecentBookings();
    renderTournaments();
    renderTimeline();

    document.getElementById('dashChartRange')?.addEventListener('change', (e) => renderChart(e.target.value));
    document.getElementById('dashBookingSearch')?.addEventListener('input', renderRecentBookings);
    document.getElementById('dashBookingStatusFilter')?.addEventListener('change', renderRecentBookings);
    window.addEventListener('courtlyAdminSearch', (e) => {
      const input = document.getElementById('dashBookingSearch');
      if (input) {
        input.value = e.detail.query;
        renderRecentBookings();
      }
    });
  });
})();
