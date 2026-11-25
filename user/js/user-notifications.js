/**
 * COURTLY PLAYER DASHBOARD — Notifications Page
 * user/js/user-notifications.js
 * All notifications are illustrative demo data persisted in localStorage.
 */
(function () {
  'use strict';

  let activeFilter = 'all';

  /* ── Summary cards ────────────────────────────────────── */
  function renderSummary(notifications) {
    const el = document.getElementById('notifSummary');
    if (!el) return;
    const total   = notifications.length;
    const unread  = notifications.filter(n => n.unread).length;
    const bookings = notifications.filter(n => n.category === 'Bookings').length;
    const member  = notifications.filter(n => n.category === 'Membership').length;

    el.innerHTML = [
      { label: 'Total', value: total, color: 'blue', icon: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' },
      { label: 'Unread', value: unread, color: 'lime', icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' },
      { label: 'Bookings', value: bookings, color: 'teal', icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
      { label: 'Membership', value: member, color: 'blue', icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' }
    ].map(c => `
      <div class="col-6 col-xl-3">
        <div class="user-kpi-card user-animate-in">
          <div class="user-kpi-icon user-kpi-icon--${c.color}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>
          </div>
          <div class="user-kpi-value">${c.value}</div>
          <div class="user-kpi-label">${c.label}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── Render notification list ─────────────────────────── */
  function renderNotifications(state) {
    const el = document.getElementById('notifList');
    if (!el) return;

    let list = state.notifications || [];
    if (activeFilter === 'Unread') {
      list = list.filter(n => n.unread);
    } else if (activeFilter !== 'all') {
      list = list.filter(n => n.category === activeFilter);
    }

    if (!list.length) {
      el.innerHTML = `
        <div class="notif-empty user-animate-in">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <div class="fw-semibold">No notifications in this category.</div>
          <div class="small mt-1">Try a different filter or check back later.</div>
        </div>
      `;
      return;
    }

    el.innerHTML = list.map(n => `
      <div class="notif-card${n.unread ? ' unread' : ''} user-animate-in" data-id="${n.id}">
        <div class="notif-unread-dot${n.unread ? '' : ' hidden'}"></div>
        <div class="notif-body">
          <span class="notif-category ${n.category.toLowerCase()}">${n.category}</span>
          <div class="notif-title">${n.title}</div>
          <div class="notif-msg">${n.message}</div>
          <div class="notif-time">${n.time}</div>
        </div>
        <div class="notif-actions">
          <button type="button" class="btn-user-outline btn-sm notif-toggle-read" data-id="${n.id}">
            ${n.unread ? 'Mark Read' : 'Mark Unread'}
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger notif-delete" data-id="${n.id}" style="border-radius:.5rem;font-size:.75rem;padding:.25rem .6rem;">
            Delete
          </button>
        </div>
      </div>
    `).join('');

    /* wire card actions */
    el.querySelectorAll('.notif-toggle-read').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const s  = window.COURTLY_USER.getState();
        const n  = s.notifications.find(x => x.id === id);
        if (n) { n.unread = !n.unread; }
        window.COURTLY_USER.saveState(s);
        window.COURTLY_USER.refreshBadge();
        renderSummary(s.notifications);
        renderNotifications(s);
      });
    });

    el.querySelectorAll('.notif-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const s  = window.COURTLY_USER.getState();
        s.notifications = s.notifications.filter(x => x.id !== id);
        window.COURTLY_USER.saveState(s);
        window.COURTLY_USER.refreshBadge();
        renderSummary(s.notifications);
        renderNotifications(s);
        window.COURTLY_USER.showToast('Notification deleted.', 'info');
      });
    });
  }

  /* ── Filter tabs ──────────────────────────────────────── */
  function wireFilters() {
    document.querySelectorAll('.notif-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.notif-tab').forEach(b => {
          b.className = b.className.replace('btn-user-primary', 'btn-user-outline');
        });
        btn.className = btn.className.replace('btn-user-outline', 'btn-user-primary');
        activeFilter = btn.dataset.filter;
        renderNotifications(window.COURTLY_USER.getState());
      });
    });
  }

  /* ── Mark all read ────────────────────────────────────── */
  function wireMarkAll() {
    const btn = document.getElementById('markAllReadBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const s = window.COURTLY_USER.getState();
      s.notifications.forEach(n => { n.unread = false; });
      window.COURTLY_USER.saveState(s);
      window.COURTLY_USER.refreshBadge();
      renderSummary(s.notifications);
      renderNotifications(s);
      window.COURTLY_USER.showToast('All notifications marked as read.');
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(() => {
      if (window.COURTLY_USER) {
        clearInterval(interval);
        const state = window.COURTLY_USER.getState();
        renderSummary(state.notifications);
        renderNotifications(state);
        wireFilters();
        wireMarkAll();
      }
    }, 60);
  });
})();
