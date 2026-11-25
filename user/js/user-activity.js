/**
 * COURTLY PLAYER DASHBOARD — Activity Page
 * user/js/user-activity.js
 * All data is illustrative demo data. No real session tracking.
 */
(function () {
  'use strict';

  /* ── Monthly chart data ───────────────────────────────── */
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const CHART_DATA = [
    { month: 'Jan', badminton: 2, tabletennis: 1 },
    { month: 'Feb', badminton: 3, tabletennis: 2 },
    { month: 'Mar', badminton: 4, tabletennis: 2 },
    { month: 'Apr', badminton: 3, tabletennis: 3 },
    { month: 'May', badminton: 5, tabletennis: 2 },
    { month: 'Jun', badminton: 4, tabletennis: 3 },
    { month: 'Jul', badminton: 6, tabletennis: 2 },
    { month: 'Aug', badminton: 5, tabletennis: 4 },
    { month: 'Sep', badminton: 4, tabletennis: 3 },
    { month: 'Oct', badminton: 5, tabletennis: 2 },
    { month: 'Nov', badminton: 3, tabletennis: 2 },
    { month: 'Dec', badminton: 0, tabletennis: 0 }
  ];

  /* ── Weekly data (last 7 days) ────────────────────────── */
  const WEEK_DATA = [
    { name: 'Mon', hrs: 1, sport: 'Badminton' },
    { name: 'Tue', hrs: 0, sport: '' },
    { name: 'Wed', hrs: 2, sport: 'TT', active: true },
    { name: 'Thu', hrs: 0, sport: '' },
    { name: 'Fri', hrs: 1, sport: 'Badminton' },
    { name: 'Sat', hrs: 2, sport: 'Badminton', active: true },
    { name: 'Sun', hrs: 0, sport: '' }
  ];

  /* ── Recent sessions timeline ─────────────────────────── */
  const RECENT_SESSIONS = [
    { date: 'Nov 24, 2026', court: 'Badminton Court 01', slot: '06:00–07:00 PM', sport: 'Badminton', duration: '1 hr' },
    { date: 'Nov 22, 2026', court: 'Table Tennis Arena 01', slot: '07:00–08:00 PM', sport: 'Table Tennis', duration: '1 hr' },
    { date: 'Nov 18, 2026', court: 'Badminton Court 02', slot: '08:00–09:00 AM', sport: 'Badminton', duration: '1 hr' },
    { date: 'Nov 15, 2026', court: 'Table Tennis Arena 02', slot: '05:00–06:00 PM', sport: 'Table Tennis', duration: '1 hr' },
    { date: 'Nov 10, 2026', court: 'Badminton Court 01', slot: '06:00–07:00 PM', sport: 'Badminton', duration: '1 hr' }
  ];

  /* ── KPI Cards ────────────────────────────────────────── */
  function renderKpi(state) {
    const bookings = state.bookings || [];
    const completed = bookings.filter(b => b.status === 'Completed');
    const badSessions = completed.filter(b => b.sport === 'Badminton').length + 16; // demo bump
    const ttSessions  = completed.filter(b => b.sport === 'Table Tennis').length + 8;
    const totalSessions = badSessions + ttSessions;
    const totalHrs = totalSessions; // 1hr per session demo

    const cards = [
      { label: 'Total Playing Hours', value: totalHrs + 'hrs', icon: '<path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/><polyline points="12 6 12 12 16 14"/>', color: 'blue' },
      { label: 'Completed Sessions', value: totalSessions, icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', color: 'teal' },
      { label: 'Badminton Sessions', value: badSessions, icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', color: 'lime' },
      { label: 'Table Tennis Sessions', value: ttSessions, icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>', color: 'blue' }
    ];

    const el = document.getElementById('actKpiCards');
    if (!el) return;
    el.innerHTML = cards.map(c => `
      <div class="col-6 col-xl-3">
        <div class="user-kpi-card user-animate-in">
          <div class="user-kpi-icon user-kpi-icon--${c.color}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>
          </div>
          <div class="user-kpi-value">${c.value}</div>
          <div class="user-kpi-label">${c.label}</div>
          <div class="user-demo-pill mt-2">DEMO DATA</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Monthly chart ────────────────────────────────────── */
  function renderMonthly() {
    const el = document.getElementById('actMonthlyChart');
    if (!el) return;
    const max = Math.max(...CHART_DATA.map(d => d.badminton + d.tabletennis)) || 1;
    el.innerHTML = CHART_DATA.map(d => {
      const total = d.badminton + d.tabletennis;
      const badH  = Math.round((d.badminton / max) * 120);
      const ttH   = Math.round((d.tabletennis / max) * 120);
      return `
        <div class="user-bar-col">
          <div class="user-bar badminton" style="height:${badH}px" title="${d.badminton} Badminton"></div>
          <div class="user-bar tabletennis" style="height:${ttH}px" title="${d.tabletennis} TT"></div>
          <div class="user-bar-label">${d.month}</div>
        </div>
      `;
    }).join('');
  }

  /* ── Weekly strip ─────────────────────────────────────── */
  function renderWeekly() {
    const el = document.getElementById('actWeekStrip');
    if (!el) return;
    el.innerHTML = WEEK_DATA.map(d => `
      <div class="user-week-day${d.active ? ' active' : ''}">
        <div class="wd-name">${d.name}</div>
        <div class="wd-hrs">${d.hrs}h</div>
        <div class="wd-sport">${d.sport || '—'}</div>
      </div>
    `).join('');
  }

  /* ── Timeline ─────────────────────────────────────────── */
  function renderTimeline() {
    const el = document.getElementById('actTimeline');
    if (!el) return;
    el.innerHTML = RECENT_SESSIONS.map((s, i) => `
      <div class="user-timeline-item" style="animation-delay:${i * .07}s">
        <div class="user-timeline-dot ${s.sport === 'Badminton' ? 'tl-dot--blue' : 'tl-dot--teal'}"></div>
        <div class="user-timeline-content">
          <div class="fw-semibold small">${s.court}</div>
          <div class="text-muted" style="font-size:.75rem">${s.date} • ${s.slot} • ${s.duration}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Sport breakdown ──────────────────────────────────── */
  function renderBreakdown(state) {
    const el = document.getElementById('actSportBreakdown');
    if (!el) return;
    const badTotal = 18;
    const ttTotal  = 10;
    const total    = badTotal + ttTotal;
    const badPct   = Math.round((badTotal / total) * 100);
    const ttPct    = 100 - badPct;

    el.innerHTML = `
      <div class="mb-4">
        <div class="d-flex justify-content-between small mb-1">
          <span class="fw-semibold">Badminton</span>
          <span class="text-muted">${badTotal} sessions (${badPct}%)</span>
        </div>
        <div class="user-progress-track mb-3">
          <div class="user-progress-fill" style="width:${badPct}%; background: var(--user-accent-blue);"></div>
        </div>
        <div class="d-flex justify-content-between small mb-1">
          <span class="fw-semibold">Table Tennis</span>
          <span class="text-muted">${ttTotal} sessions (${ttPct}%)</span>
        </div>
        <div class="user-progress-track">
          <div class="user-progress-fill" style="width:${ttPct}%; background: var(--user-accent-teal);"></div>
        </div>
      </div>
      <div class="user-demo-pill">DEMO STATS — ILLUSTRATIVE DATA</div>
      <div class="row g-2 mt-3">
        <div class="col-6">
          <div class="text-center p-3" style="background:rgba(40,125,222,.08);border-radius:.75rem;">
            <div class="h5 fw-bold mb-0 font-sora" style="color:var(--user-accent-blue)">${badTotal}</div>
            <div class="text-muted" style="font-size:.72rem">Badminton Sessions</div>
          </div>
        </div>
        <div class="col-6">
          <div class="text-center p-3" style="background:rgba(32,201,166,.08);border-radius:.75rem;">
            <div class="h5 fw-bold mb-0 font-sora" style="color:var(--user-accent-teal)">${ttTotal}</div>
            <div class="text-muted" style="font-size:.72rem">TT Sessions</div>
          </div>
        </div>
      </div>
    `;
  }

  /* ── Booking history table ────────────────────────────── */
  function renderBookingTable(state) {
    const el = document.getElementById('actBookingTable');
    if (!el) return;
    const bookings = (state.bookings || []).slice(0, 10);
    if (!bookings.length) {
      el.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-3 small">No booking history.</td></tr>';
      return;
    }
    el.innerHTML = bookings.map(b => {
      const cls = b.status === 'Upcoming' ? 'badge-upcoming' : b.status === 'Completed' ? 'badge-completed' : 'badge-cancelled';
      return `
        <tr>
          <td><span class="text-accent-blue fw-semibold small">${b.id}</span></td>
          <td class="small">${b.court}</td>
          <td class="small">${b.sport}</td>
          <td class="small">${b.date}<br><span class="text-muted" style="font-size:.72rem">${b.slot}</span></td>
          <td class="small fw-semibold">${window.COURTLY_USER ? window.COURTLY_USER.formatINR(b.amount) : '₹' + b.amount}</td>
          <td><span class="user-badge ${cls}">${b.status}</span></td>
        </tr>
      `;
    }).join('');
  }

  /* ── Tournament participation history ─────────────────── */
  function renderTournHistory(state) {
    const el = document.getElementById('actTournHistory');
    if (!el) return;
    const past = (state.tournaments || []).filter(t => t.isPast || t.isRegistered);
    if (!past.length) {
      el.innerHTML = '<div class="col-12 text-center text-muted py-3 small">No tournament history yet.</div>';
      return;
    }
    el.innerHTML = past.map(t => `
      <div class="col-md-6 col-xl-4">
        <div class="user-card h-100 p-3">
          <div class="user-demo-pill mb-2">${t.isPast ? 'PAST' : 'REGISTERED'}</div>
          <div class="fw-bold small mb-1">${t.name}</div>
          <div class="text-muted" style="font-size:.75rem">${t.sport} • ${t.date}</div>
          <div class="text-muted mt-1" style="font-size:.75rem">Prize Pool: ${t.prizePool}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(() => {
      if (window.COURTLY_USER) {
        clearInterval(interval);
        const state = window.COURTLY_USER.getState();
        renderKpi(state);
        renderMonthly();
        renderWeekly();
        renderTimeline();
        renderBreakdown(state);
        renderBookingTable(state);
        renderTournHistory(state);
      }
    }, 60);
  });
})();
