/**
 * COURTLY PLAYER DASHBOARD - Shared Sidebar, Header, Theme/RTL & Demo Store
 * Pure Vanilla JS. All data is illustrative demo data persisted in localStorage.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'courtly_user_demo_v1';
  const PLAYER_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80';

  const savedTheme = localStorage.getItem('courtly_theme') || 'dark';
  const savedDir = localStorage.getItem('courtly_direction') || 'ltr';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedDir);

  if (window.innerWidth >= 992 && localStorage.getItem('courtly_user_collapsed') === 'true') {
    document.body.classList.add('sidebar-collapsed');
  }

  const ICONS = {
    overview: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    bookings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    courts: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    membership: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    tournaments: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    activity: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    notifications: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    profile: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    logout: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  function getDefaultState() {
    const publicCourts = (window.COURTLY_DATA && window.COURTLY_DATA.courts) || [];
    const publicTournaments = (window.COURTLY_DATA && window.COURTLY_DATA.tournaments) || [];

    const courts = publicCourts.length ? publicCourts.map(c => ({
      id: c.id,
      name: c.name,
      sport: c.sport,
      price: c.price,
      badge: c.badge,
      status: c.status || 'Available',
      image: c.image,
      description: c.description,
      facilities: (c.specs || []).join(' • ')
    })) : [
      { id: 'court-01', name: 'Badminton Court 01', sport: 'Badminton', price: 600, badge: 'Wood Classic', status: 'Available', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85', description: 'Championship hardwood with LED lighting.', facilities: '800 Lux LED • Climate 21°C' },
      { id: 'court-02', name: 'Badminton Court 02', sport: 'Badminton', price: 750, badge: 'BWF Grade 1', status: 'Prime Slot', image: 'https://i.pinimg.com/736x/e2/0c/cd/e20ccd0304b99a52bb731873dff69004.jpg', description: 'Official Olympic vinyl surface.', facilities: 'Live Scoreboard • BWF Synthetic Mat' },
      { id: 'court-03', name: 'Table Tennis Arena 01', sport: 'Table Tennis', price: 450, badge: 'ITTF Official', status: 'Available', image: 'https://blog.playo.co/wp-content/uploads/2017/03/table-tennis-shots.jpg', description: '25mm competition top.', facilities: '25mm Blue Top • ITTF Approved' },
      { id: 'court-04', name: 'Table Tennis Arena 02', sport: 'Table Tennis', price: 400, badge: 'Dual Station', status: 'Available', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=85', description: 'Twin practice station.', facilities: 'Auto Ball Feeder • Pro Paddles' }
    ];

    const tournaments = publicTournaments.length ? publicTournaments.map((t, i) => ({
      id: t.id,
      name: t.name,
      subtitle: t.subtitle,
      sport: t.category,
      date: t.date,
      venue: 'COURTLY Pro Arena',
      entryFee: t.entryFee,
      prizePool: t.prizePool,
      regStatus: t.status,
      isRegistered: i < 2,
      isPast: false,
      image: t.image
    })) : [];

    tournaments.push({
      id: 'tourn-past-01',
      name: 'Autumn Spin Classic',
      subtitle: 'Club Singles Open',
      sport: 'Table Tennis',
      date: 'Oct 12, 2026',
      venue: 'COURTLY Pro Arena',
      entryFee: '₹600 / player',
      prizePool: '₹80,000',
      regStatus: 'Completed',
      isRegistered: true,
      isPast: true,
      image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=700&q=80'
    });

    return {
      profile: {
        id: 'PL-2026-104',
        name: 'Alex Johnson',
        email: 'alex.johnson.demo@example.com',
        phone: '+91 98765 10203',
        preferredSports: 'Badminton, Table Tennis',
        memberSince: 'March 2026 (Sample)',
        avatar: PLAYER_AVATAR
      },
      membership: {
        planId: 'pro-athlete',
        planName: 'Pro Athlete',
        price: 999,
        includedHours: 10,
        usedHours: 6,
        renewalDate: 'Dec 26, 2026 (Sample)',
        status: 'Active (Demo)'
      },
      bookings: [
        { id: 'CR-2026-0248', court: 'Badminton Court 01', sport: 'Badminton', date: '2026-11-26 (Sample)', slot: '06:00 PM – 07:00 PM', amount: 250, status: 'Upcoming', label: 'Confirmed (demo)' },
        { id: 'CR-2026-0249', court: 'Table Tennis Arena 01', sport: 'Table Tennis', date: '2026-11-28', slot: '07:00 PM – 08:00 PM', amount: 450, status: 'Upcoming', label: 'Confirmed (demo)' },
        { id: 'CR-2026-0250', court: 'Badminton Court 02', sport: 'Badminton', date: '2026-11-30', slot: '08:00 AM – 09:00 AM', amount: 750, status: 'Upcoming', label: 'Confirmed (demo)' },
        { id: 'CR-2026-0231', court: 'Table Tennis Arena 02', sport: 'Table Tennis', date: '2026-11-18', slot: '05:00 PM – 06:00 PM', amount: 400, status: 'Completed', label: 'Completed (demo)' },
        { id: 'CR-2026-0224', court: 'Badminton Court 01', sport: 'Badminton', date: '2026-11-12', slot: '06:00 PM – 07:00 PM', amount: 600, status: 'Completed', label: 'Completed (demo)' },
        { id: 'CR-2026-0210', court: 'Badminton Court 02', sport: 'Badminton', date: '2026-11-04', slot: '09:00 PM – 10:00 PM', amount: 750, status: 'Cancelled', label: 'Cancelled (demo)' }
      ],
      courts,
      tournaments,
      notifications: [
        { id: 'n-1', category: 'Bookings', title: 'Upcoming Court Session Tomorrow', message: 'Your demo session at Badminton Court 01 (06:00 PM – 07:00 PM) is scheduled.', time: '2 hrs ago', unread: true },
        { id: 'n-2', category: 'Tournaments', title: 'New Tournament Registration Open', message: 'Badminton Open Championship (Dec 12, 2026) has 8 slots left.', time: '5 hrs ago', unread: true },
        { id: 'n-3', category: 'Membership', title: 'Membership Information Updated', message: 'Pro Athlete (₹999/month) demo pass shows 4 remaining hours.', time: '1 day ago', unread: false },
        { id: 'n-4', category: 'Bookings', title: 'Previous Booking Completed', message: 'Demo booking CR-2026-0231 at Table Tennis Arena 02 marked completed.', time: '3 days ago', unread: false },
        { id: 'n-5', category: 'Announcements', title: 'New Anti-Glare LED Upgrade', message: 'Badminton Court 01 & 02 now feature calibrated 800 Lux lighting.', time: '5 days ago', unread: false }
      ],
      activities: [
        { id: 'ua-1', text: 'Demo court booking CR-2026-0248 created for Badminton Court 01', time: 'Today', color: 'var(--color-teal)' },
        { id: 'ua-2', text: 'Pro Athlete membership (₹999/mo) active — 6/10 demo hours used', time: '2 days ago', color: 'var(--color-lime)' },
        { id: 'ua-3', text: 'Demo tournament registration submitted for Badminton Open Championship', time: '4 days ago', color: 'var(--color-electric-blue)' },
        { id: 'ua-4', text: 'Previous session at Table Tennis Arena 02 completed', time: '1 week ago', color: 'var(--color-warning)' }
      ],
      preferences: {
        emailNotifs: true,
        bookingReminders: true,
        tournamentAlerts: true,
        publicProfile: false
      }
    };
  }

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fallback */ }
    const seed = getDefaultState();
    saveState(seed);
    return seed;
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function showToast(message, variant) {
    let container = document.getElementById('userToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'userToastContainer';
      container.className = 'user-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'user-toast user-animate-in';
    if (variant === 'danger') toast.style.borderColor = 'var(--color-danger)';
    toast.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:${variant === 'danger' ? 'var(--color-danger)' : 'var(--color-teal)'};flex-shrink:0;"></span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
  }

  function formatINR(num) {
    return '₹' + Number(num || 0).toLocaleString('en-IN');
  }

  function buildShell() {
    const activePage = document.body.dataset.userPage || 'overview';
    const pageTitle = document.body.dataset.pageTitle || 'Overview';
    const state = getState();
    const unreadCount = (state.notifications || []).filter(n => n.unread).length;

    const navItems = [
      { id: 'overview', label: 'Overview', href: 'dashboard.html', icon: ICONS.overview },
      { id: 'bookings', label: 'My Bookings', href: 'my-bookings.html', icon: ICONS.bookings },
      { id: 'courts', label: 'Find a Court', href: 'find-courts.html', icon: ICONS.courts },
      { id: 'membership', label: 'Membership', href: 'memberships.html', icon: ICONS.membership },
      { id: 'tournaments', label: 'Tournaments', href: 'tournaments.html', icon: ICONS.tournaments },
      { id: 'activity', label: 'My Activity', href: 'activity.html', icon: ICONS.activity },
      { id: 'notifications', label: 'Notifications', href: 'notifications.html', icon: ICONS.notifications, badge: unreadCount > 0 ? unreadCount : '' },
      { id: 'profile', label: 'My Profile', href: 'profile.html', icon: ICONS.profile },
      { id: 'settings', label: 'Settings', href: 'settings.html', icon: ICONS.settings }
    ];

    const sidebarMount = document.getElementById('userSidebarMount');
    if (sidebarMount) {
      sidebarMount.innerHTML = `
        <aside class="user-sidebar" id="userSidebar" aria-label="Player navigation">
          <div class="user-sidebar-header">
            <a href="dashboard.html" class="user-brand-link">
              <img class="user-logo-mark" src="../assets/logo.png" alt="" width="40" height="40">
              <div class="user-brand-text">
                <span class="user-brand-name">COURTLY</span>
                <span class="user-brand-sub">PRO ARENA</span>
              </div>
            </a>
          </div>

          <div class="user-sidebar-label">PLAYER SPACE</div>

          <nav class="user-nav-scroll">
            <ul class="user-nav-list">
              ${navItems.map(item => `
                <li>
                  <a href="${item.href}" class="user-nav-link ${activePage === item.id ? 'active' : ''}" title="${item.label}">
                    <span class="user-nav-icon">${item.icon}</span>
                    <span class="user-nav-text">${item.label}</span>
                    ${item.badge ? `<span class="user-nav-badge" id="sidebarNotifBadge">${item.badge}</span>` : ''}
                  </a>
                </li>
              `).join('')}
            </ul>
          </nav>

          <div class="user-sidebar-footer">
            <div class="user-profile-mini">
              <img src="${state.profile.avatar}" alt="${state.profile.name}" class="user-avatar">
              <div class="user-profile-meta">
                <span class="user-profile-name">${state.profile.name}</span>
                <span class="user-profile-role">COURTLY Player</span>
              </div>
            </div>
            <a href="../index.html" class="user-logout-btn" title="Logout to Public Site">
              <span class="user-nav-icon">${ICONS.logout}</span>
              <span class="user-logout-text">Logout</span>
            </a>
          </div>
        </aside>
        <div class="user-sidebar-backdrop" id="userSidebarBackdrop"></div>
      `;
    }

    const topbarMount = document.getElementById('userTopbarMount');
    if (topbarMount) {
      const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
      const isRtl = (document.documentElement.getAttribute('dir') || 'ltr') === 'rtl';

      topbarMount.innerHTML = `
        <header class="user-topbar">
          <div class="user-topbar-left">
            <button type="button" class="user-icon-btn" id="userSidebarToggleBtn" aria-label="Toggle sidebar">
              ${ICONS.menu}
            </button>
            <nav class="user-breadcrumb" aria-label="Breadcrumb">
              <span class="user-breadcrumb-prefix">Player Space</span>
              <span class="user-breadcrumb-prefix">/</span>
              <span class="user-breadcrumb-current">${pageTitle}</span>
            </nav>
          </div>

          <div class="user-topbar-right">
            <div class="user-search-box">
              <span class="user-search-icon">${ICONS.courts}</span>
              <input type="search" id="userGlobalSearch" placeholder="Search courts, bookings, tournaments..." aria-label="Search player dashboard">
            </div>

            <button type="button" class="user-icon-btn" id="userDirToggleBtn" title="Switch LTR / RTL">
              <span style="font-size:0.7rem;font-weight:700;" id="userDirBadge">${isRtl ? 'RTL' : 'LTR'}</span>
            </button>

            <button type="button" class="user-icon-btn" id="userThemeToggleBtn" title="Toggle Dark / Light theme" aria-label="Toggle theme">
              <span id="userThemeIconWrap">${isDark ? ICONS.sun : ICONS.moon}</span>
            </button>

            <div class="dropdown">
              <button type="button" class="user-icon-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
                ${ICONS.notifications}
                ${unreadCount > 0 ? '<span class="user-notif-dot"></span>' : ''}
              </button>
              <div class="dropdown-menu dropdown-menu-end user-dropdown-menu">
                <div class="px-3 py-2 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                  <strong class="small">Notifications (Demo)</strong>
                  <span class="badge bg-info bg-opacity-25 text-info">${unreadCount} Unread</span>
                </div>
                ${(state.notifications || []).slice(0, 3).map(n => `
                  <a href="notifications.html" class="user-dropdown-item">
                    <span style="width:8px;height:8px;border-radius:50%;background:${n.unread ? 'var(--color-lime)' : 'var(--text-subtle)'};flex-shrink:0;"></span>
                    <div>
                      <div class="small lh-sm fw-semibold">${n.title}</div>
                      <small class="text-muted" style="font-size:0.72rem;">${n.time}</small>
                    </div>
                  </a>
                `).join('')}
                <div class="border-top border-secondary border-opacity-25 mt-1 pt-1">
                  <a href="notifications.html" class="user-dropdown-item justify-content-center text-teal fw-semibold">View All Notifications</a>
                </div>
              </div>
            </div>

            <div class="dropdown">
              <button type="button" class="user-profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="${state.profile.avatar}" alt="${state.profile.name}">
                <span class="user-profile-trigger-name small fw-semibold">${state.profile.name}</span>
              </button>
              <div class="dropdown-menu dropdown-menu-end user-dropdown-menu">
                <div class="px-3 py-2 border-bottom border-secondary border-opacity-25">
                  <div class="fw-bold small">${state.profile.name}</div>
                  <small class="text-teal">COURTLY Player</small>
                </div>
                <a href="profile.html" class="user-dropdown-item mt-1">${ICONS.profile} <span>My Profile</span></a>
                <a href="my-bookings.html" class="user-dropdown-item">${ICONS.bookings} <span>My Bookings</span></a>
                <a href="settings.html" class="user-dropdown-item">${ICONS.settings} <span>Settings</span></a>
                <a href="../index.html" class="user-dropdown-item text-danger">${ICONS.logout} <span>Logout</span></a>
              </div>
            </div>
          </div>
        </header>
      `;
    }

    wireShellEvents();
  }

  function wireShellEvents() {
    const toggleBtn = document.getElementById('userSidebarToggleBtn');
    const backdrop = document.getElementById('userSidebarBackdrop');
    const themeBtn = document.getElementById('userThemeToggleBtn');
    const dirBtn = document.getElementById('userDirToggleBtn');
    const searchInput = document.getElementById('userGlobalSearch');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          document.body.classList.toggle('sidebar-mobile-open');
        } else {
          document.body.classList.toggle('sidebar-collapsed');
          localStorage.setItem('courtly_user_collapsed', document.body.classList.contains('sidebar-collapsed'));
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        document.body.classList.remove('sidebar-mobile-open');
      });
    }

    // Close mobile drawer when a navigation link is selected
    document.querySelectorAll('#userSidebar .user-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('sidebar-mobile-open');
      });
    });

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('courtly_theme', next);
        const iconWrap = document.getElementById('userThemeIconWrap');
        if (iconWrap) iconWrap.innerHTML = next === 'dark' ? ICONS.sun : ICONS.moon;
        showToast(`Theme switched to ${next} mode`);
      });
    }

    if (dirBtn) {
      dirBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('dir') || 'ltr';
        const next = cur === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', next);
        localStorage.setItem('courtly_direction', next);
        const badge = document.getElementById('userDirBadge');
        if (badge) badge.textContent = next.toUpperCase();
        showToast(`Layout direction switched to ${next.toUpperCase()}`);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.dispatchEvent(new CustomEvent('courtlyUserSearch', { detail: { query: e.target.value.trim().toLowerCase() } }));
      });
    }
  }

  window.COURTLY_USER = {
    getState,
    saveState,
    showToast,
    formatINR,
    refreshBadge: function () {
      const state = getState();
      const count = (state.notifications || []).filter(n => n.unread).length;
      const badge = document.getElementById('sidebarNotifBadge');
      if (badge) {
        badge.textContent = count > 0 ? count : '';
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      }
    },
    resetDemoData: function () {
      const fresh = getDefaultState();
      saveState(fresh);
      return fresh;
    }
  };

  document.addEventListener('DOMContentLoaded', buildShell);
})();
