/**
 * COURTLY ADMIN - Reports & Analytics Script
 */
(function () {
  'use strict';

  const TRENDS = {
    day: [
      { label: 'Mon', badminton: 18, tt: 12, revenue: 16200 },
      { label: 'Tue', badminton: 22, tt: 15, revenue: 19800 },
      { label: 'Wed', badminton: 20, tt: 17, revenue: 18900 },
      { label: 'Thu', badminton: 26, tt: 19, revenue: 23400 },
      { label: 'Fri', badminton: 32, tt: 23, revenue: 28800 },
      { label: 'Sat', badminton: 40, tt: 30, revenue: 36500 },
      { label: 'Sun', badminton: 35, tt: 27, revenue: 32400 }
    ],
    week: [
      { label: 'Wk 1', badminton: 92, tt: 64, revenue: 84200 },
      { label: 'Wk 2', badminton: 108, tt: 72, revenue: 96500 },
      { label: 'Wk 3', badminton: 118, tt: 81, revenue: 108400 },
      { label: 'Wk 4', badminton: 134, tt: 95, revenue: 124600 }
    ],
    month: [
      { label: 'Jun', badminton: 120, tt: 84, revenue: 104000 },
      { label: 'Jul', badminton: 138, tt: 96, revenue: 118500 },
      { label: 'Aug', badminton: 145, tt: 102, revenue: 124200 },
      { label: 'Sep', badminton: 158, tt: 112, revenue: 135800 },
      { label: 'Oct', badminton: 170, tt: 124, revenue: 141200 },
      { label: 'Nov', badminton: 186, tt: 136, revenue: 148500 }
    ]
  };

  function renderReports(range) {
    const rows = TRENDS[range] || TRENDS.month;
    const totalRev = rows.reduce((s, r) => s + r.revenue, 0);
    const totalBk = rows.reduce((s, r) => s + r.badminton + r.tt, 0);
    const badTotal = rows.reduce((s, r) => s + r.badminton, 0);
    const ttTotal = rows.reduce((s, r) => s + r.tt, 0);

    const kpiRow = document.getElementById('repKpiRow');
    if (kpiRow) {
      kpiRow.innerHTML = [
        { label: 'Total Revenue (Demo)', val: window.COURTLY_ADMIN.formatINR(totalRev) },
        { label: 'Total Bookings (Demo)', val: totalBk.toLocaleString('en-IN') },
        { label: 'Badminton Sessions', val: badTotal.toLocaleString('en-IN') },
        { label: 'Table Tennis Sessions', val: ttTotal.toLocaleString('en-IN') }
      ].map(k => `
        <div class="col-6 col-lg-3">
          <div class="admin-card admin-card-hover">
            <span class="small text-muted fw-semibold">${k.label}</span>
            <div class="admin-kpi-value mt-1">${k.val}</div>
          </div>
        </div>
      `).join('');
    }

    const chart = document.getElementById('repTrendChart');
    if (chart) {
      const max = Math.max(...rows.flatMap(r => [r.badminton, r.tt]), 1);
      chart.innerHTML = rows.map(r => `
        <div class="admin-chart-col">
          <div class="admin-chart-pair">
            <div class="admin-bar badminton admin-bar-animate" style="height:${Math.round((r.badminton / max) * 100)}%;" title="Badminton: ${r.badminton} | ${window.COURTLY_ADMIN.formatINR(r.revenue)}"></div>
            <div class="admin-bar tabletennis admin-bar-animate" style="height:${Math.round((r.tt / max) * 100)}%;" title="Table Tennis: ${r.tt}"></div>
          </div>
          <span class="admin-chart-label">${r.label}</span>
        </div>
      `).join('');
    }

    const state = window.COURTLY_ADMIN.getState();
    const utilWrap = document.getElementById('repCourtUtil');
    if (utilWrap) {
      utilWrap.innerHTML = (state.courts || []).map(c => `
        <div>
          <div class="d-flex justify-content-between small mb-1">
            <span>${c.name}</span>
            <strong class="text-teal">${c.occupancy}%</strong>
          </div>
          <div class="admin-progress-track">
            <div class="admin-progress-fill" style="width:${c.occupancy}%;"></div>
          </div>
        </div>
      `).join('');
    }

    const splitWrap = document.getElementById('repSportSplit');
    if (splitWrap) {
      const bPct = Math.round((badTotal / Math.max(totalBk, 1)) * 100);
      const tPct = 100 - bPct;
      splitWrap.innerHTML = `
        <div class="d-flex justify-content-between small mb-2">
          <span>Badminton: <strong class="text-teal">${bPct}%</strong></span>
          <span>Table Tennis: <strong class="text-lime">${tPct}%</strong></span>
        </div>
        <div class="admin-progress-track">
          <div class="admin-progress-fill" style="width:${bPct}%;"></div>
        </div>
      `;
    }

    const memWrap = document.getElementById('repMemDist');
    if (memWrap) {
      const subs = state.subscriptions || [];
      const totalS = Math.max(subs.length, 1);
      memWrap.innerHTML = [
        { name: 'Starter (₹499/mo)', count: subs.filter(s => s.planName === 'Starter').length },
        { name: 'Pro Athlete (₹999/mo)', count: subs.filter(s => s.planName === 'Pro Athlete').length },
        { name: 'Elite Player (₹1,799/mo)', count: subs.filter(s => s.planName === 'Elite Player').length }
      ].map(m => {
        const pct = Math.round((m.count / totalS) * 100);
        return `
          <div>
            <div class="d-flex justify-content-between small mb-1">
              <span>${m.name}</span>
              <strong class="text-teal">${m.count} (${pct}%)</strong>
            </div>
            <div class="admin-progress-track"><div class="admin-progress-fill" style="width:${pct}%;"></div></div>
          </div>
        `;
      }).join('');
    }

    const tournWrap = document.getElementById('repTournStats');
    if (tournWrap) {
      tournWrap.innerHTML = (state.tournaments || []).map(t => `
        <div class="d-flex justify-content-between align-items-center p-2 rounded-3 border border-secondary border-opacity-25">
          <div>
            <div class="small fw-bold">${t.name}</div>
            <small class="text-muted">${t.sport} &bull; ${t.date}</small>
          </div>
          <span class="status-badge ${t.status.toLowerCase()}">${t.registered}/${t.capacity}</span>
        </div>
      `).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('repRangeFilter');
    renderReports(sel?.value || 'month');

    sel?.addEventListener('change', () => renderReports(sel.value));

    document.getElementById('exportReportsCsvBtn')?.addEventListener('click', () => {
      const range = sel?.value || 'month';
      const rows = (TRENDS[range] || TRENDS.month).map(r => [r.label, r.badminton, r.tt, r.badminton + r.tt, `₹${r.revenue}`]);
      window.COURTLY_ADMIN.exportCSV(`courtly-demo-report-${range}.csv`, ['Period', 'Badminton Bookings', 'Table Tennis Bookings', 'Total Bookings', 'Demo Revenue'], rows);
    });
  });
})();
