/**
 * COURTLY ADMIN - Shared Sidebar, Topbar, Theme/RTL & Demo Data Store
 * Pure Vanilla JS. No frameworks. All data is frontend demo data persisted in localStorage.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'courtly_admin_demo_v1';
  const ADMIN_AVATAR = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80';

  // Apply theme & direction immediately to avoid flash
  const savedTheme = localStorage.getItem('courtly_theme') || 'dark';
  const savedDir = localStorage.getItem('courtly_direction') || 'ltr';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedDir);

  if (window.innerWidth >= 992 && localStorage.getItem('courtly_admin_collapsed') === 'true') {
    document.body.classList.add('sidebar-collapsed');
  }

  // Inline SVG icon set (no emojis)
  const ICONS = {
    dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    bookings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    courts: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="12" y1="5" x2="12" y2="19"/><circle cx="12" cy="12" r="2.5"/></svg>',
    memberships: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    tournaments: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    players: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    messages: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    reports: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    logout: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  function getDefaultState() {
    const publicCourts = (window.COURTLY_DATA && window.COURTLY_DATA.courts) || [];
    const publicTournaments = (window.COURTLY_DATA && window.COURTLY_DATA.tournaments) || [];
    const contact = window.COURTLY_CONTACT_DATA || {};

    const seededCourts = publicCourts.length ? publicCourts.map((c, idx) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      sport: c.sport,
      price: c.price,
      status: idx === 1 ? 'Occupied' : 'Available',
      occupancy: idx === 0 ? 78 : idx === 1 ? 92 : idx === 2 ? 64 : 58,
      currentSlot: idx === 1 ? '06:00 PM - 07:00 PM (Booked)' : '07:00 PM - 08:00 PM (Open)',
      badge: c.badge,
      image: c.image,
      description: c.description
    })) : [
      { id: 'court-01', code: 'C-01', name: 'Badminton Court 01', sport: 'Badminton', price: 600, status: 'Available', occupancy: 78, currentSlot: '07:00 PM - 08:00 PM', badge: 'Wood Classic', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85', description: 'Championship hardwood with LED lighting.' },
      { id: 'court-02', code: 'C-02', name: 'Badminton Court 02', sport: 'Badminton', price: 750, status: 'Occupied', occupancy: 92, currentSlot: '06:00 PM - 07:00 PM', badge: 'BWF Grade 1', image: 'https://i.pinimg.com/736x/e2/0c/cd/e20ccd0304b99a52bb731873dff69004.jpg', description: 'Official Olympic vinyl surface.' },
      { id: 'court-03', code: 'TT-01', name: 'Table Tennis Arena 01', sport: 'Table Tennis', price: 450, status: 'Available', occupancy: 64, currentSlot: '07:00 PM - 08:00 PM', badge: 'ITTF Official', image: 'https://blog.playo.co/wp-content/uploads/2017/03/table-tennis-shots.jpg', description: '25mm competition top.' },
      { id: 'court-04', code: 'TT-02', name: 'Table Tennis Arena 02', sport: 'Table Tennis', price: 400, status: 'Available', occupancy: 58, currentSlot: '08:00 PM - 09:00 PM', badge: 'Dual Station', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=85', description: 'Twin practice station.' }
    ];

    const seededTournaments = publicTournaments.length ? publicTournaments.map((t, i) => ({
      id: t.id,
      name: t.name,
      subtitle: t.subtitle,
      sport: t.category,
      date: t.date,
      entryFee: t.entryFee,
      prizePool: t.prizePool,
      registered: i === 0 ? 56 : i === 1 ? 42 : 28,
      capacity: i === 0 ? 64 : i === 1 ? 48 : 32,
      status: i === 2 ? 'Ongoing' : 'Upcoming',
      regStatus: t.status,
      image: t.image
    })) : [];

    // Add one completed demo tournament for full lifecycle view
    seededTournaments.push({
      id: 'tourn-04',
      name: 'Monsoon Smash Cup',
      subtitle: 'Club Invitational Finals',
      sport: 'Badminton',
      date: 'Oct 19, 2026',
      entryFee: '₹900 / player',
      prizePool: '₹1,00,000',
      registered: 32,
      capacity: 32,
      status: 'Completed',
      regStatus: 'Completed',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80'
    });

    return {
      bookings: [
        { id: 'BK-26101', player: 'Aarav Sharma', court: 'Badminton Court 02', sport: 'Badminton', date: '2026-11-25', slot: '06:00 PM - 07:00 PM', amount: 750, status: 'Confirmed', isDemo: true },
        { id: 'BK-26102', player: 'Diya Nair', court: 'Table Tennis Arena 01', sport: 'Table Tennis', date: '2026-11-25', slot: '07:00 PM - 08:00 PM', amount: 450, status: 'Confirmed', isDemo: true },
        { id: 'BK-26103', player: 'Rohan Verma', court: 'Badminton Court 01', sport: 'Badminton', date: '2026-11-25', slot: '08:00 PM - 09:00 PM', amount: 600, status: 'Pending', isDemo: true },
        { id: 'BK-26104', player: 'Meera Iyer', court: 'Table Tennis Arena 02', sport: 'Table Tennis', date: '2026-11-26', slot: '05:00 PM - 06:00 PM', amount: 400, status: 'Confirmed', isDemo: true },
        { id: 'BK-26105', player: 'Kabir Malhotra', court: 'Badminton Court 02', sport: 'Badminton', date: '2026-11-26', slot: '07:00 PM - 08:00 PM', amount: 750, status: 'Cancelled', isDemo: true },
        { id: 'BK-26106', player: 'Ananya Reddy', court: 'Badminton Court 01', sport: 'Badminton', date: '2026-11-27', slot: '06:00 AM - 07:00 AM', amount: 600, status: 'Confirmed', isDemo: true },
        { id: 'BK-26107', player: 'Vikram Menon', court: 'Table Tennis Arena 01', sport: 'Table Tennis', date: '2026-11-27', slot: '09:00 AM - 10:00 AM', amount: 450, status: 'Pending', isDemo: true }
      ],
      courts: seededCourts,
      subscriptions: [
        { id: 'SUB-101', player: 'Aarav Sharma', email: 'aarav.demo@example.com', planId: 'elite-player', planName: 'Elite Player', price: 1799, startDate: '2026-11-01', endDate: '2026-11-30', status: 'Active' },
        { id: 'SUB-102', player: 'Diya Nair', email: 'diya.demo@example.com', planId: 'pro-athlete', planName: 'Pro Athlete', price: 999, startDate: '2026-11-05', endDate: '2026-12-04', status: 'Active' },
        { id: 'SUB-103', player: 'Rohan Verma', email: 'rohan.demo@example.com', planId: 'starter', planName: 'Starter', price: 499, startDate: '2026-11-10', endDate: '2026-12-09', status: 'Active' },
        { id: 'SUB-104', player: 'Meera Iyer', email: 'meera.demo@example.com', planId: 'pro-athlete', planName: 'Pro Athlete', price: 999, startDate: '2026-10-12', endDate: '2026-11-11', status: 'Pending' },
        { id: 'SUB-105', player: 'Kabir Malhotra', email: 'kabir.demo@example.com', planId: 'elite-player', planName: 'Elite Player', price: 1799, startDate: '2026-11-14', endDate: '2026-12-13', status: 'Active' },
        { id: 'SUB-106', player: 'Ananya Reddy', email: 'ananya.demo@example.com', planId: 'starter', planName: 'Starter', price: 499, startDate: '2026-09-20', endDate: '2026-10-19', status: 'Inactive' }
      ],
      tournaments: seededTournaments,
      players: [
        { id: 'PL-401', name: 'Aarav Sharma', email: 'aarav.demo@example.com', phone: '+91 98100 11223', sport: 'Badminton', plan: 'Elite Player', joined: '2026-06-14', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
        { id: 'PL-402', name: 'Diya Nair', email: 'diya.demo@example.com', phone: '+91 98200 22334', sport: 'Table Tennis', plan: 'Pro Athlete', joined: '2026-07-22', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
        { id: 'PL-403', name: 'Rohan Verma', email: 'rohan.demo@example.com', phone: '+91 98300 33445', sport: 'Badminton', plan: 'Starter', joined: '2026-09-03', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
        { id: 'PL-404', name: 'Meera Iyer', email: 'meera.demo@example.com', phone: '+91 98400 44556', sport: 'Table Tennis', plan: 'Pro Athlete', joined: '2026-10-11', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
        { id: 'PL-405', name: 'Kabir Malhotra', email: 'kabir.demo@example.com', phone: '+91 98500 55667', sport: 'Badminton', plan: 'Elite Player', joined: '2026-11-02', status: 'Suspended', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80' },
        { id: 'PL-406', name: 'Ananya Reddy', email: 'ananya.demo@example.com', phone: '+91 98600 66778', sport: 'Badminton', plan: 'Starter', joined: '2026-11-21', status: 'Active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' }
      ],
      messages: [
        { id: 'MSG-301', sender: 'Siddharth Rao', email: 'siddharth.demo@example.com', category: 'Court Booking Enquiry', subject: 'Corporate evening block booking for 4 courts', date: '2026-11-25 10:15 AM', status: 'Unread', body: 'Hello COURTLY team, we would like to enquire about reserving two Badminton courts every Friday evening for our office team (demo enquiry).', reply: '' },
        { id: 'MSG-302', sender: 'Neha Kulkarni', email: 'neha.demo@example.com', category: 'Membership Enquiry', subject: 'Pro Athlete vs Elite Player tournament perks', date: '2026-11-25 09:02 AM', status: 'Unread', body: 'Hi! Can I upgrade from Starter (₹499/mo) to Pro Athlete (₹999/mo) mid-cycle?', reply: '' },
        { id: 'MSG-303', sender: 'Arjun Deshmukh', email: 'arjun.demo@example.com', category: 'Tournament Information', subject: 'Badminton Open Championship doubles partner rules', date: '2026-11-24 04:40 PM', status: 'Replied', body: 'Do both doubles partners need separate registrations for the Dec 12 championship?', reply: 'Yes, each doubles pair submits one combined team entry (₹1,200 / player).' },
        { id: 'MSG-304', sender: 'Pooja Krishnan', email: 'pooja.demo@example.com', category: 'Facility Information', subject: 'Table tennis multi-ball feeder availability', date: '2026-11-24 01:15 PM', status: 'Pending', body: 'Is the automated ball feeder on Table Tennis Arena 02 available during morning slots?', reply: '' },
        { id: 'MSG-305', sender: 'Karan Kapoor', email: 'karan.demo@example.com', category: 'General Enquiry', subject: 'Visitor parking and locker room hours', date: '2026-11-23 06:30 PM', status: 'Archived', body: 'Are shower lockers complimentary for Pro Athlete pass holders?', reply: 'Archived after phone confirmation.' }
      ],
      activities: [
        { id: 'act-1', text: 'New demo booking BK-26101 received for Badminton Court 02', time: '12 mins ago', color: 'var(--color-teal)' },
        { id: 'act-2', text: 'Player Diya Nair registered for Table Tennis Challenge', time: '38 mins ago', color: 'var(--color-electric-blue)' },
        { id: 'act-3', text: 'Elite Player membership (₹1,799/mo) activated for Aarav Sharma', time: '1 hr ago', color: 'var(--color-lime)' },
        { id: 'act-4', text: 'Booking BK-26105 cancelled by player Kabir Malhotra', time: '3 hrs ago', color: 'var(--color-danger)' },
        { id: 'act-5', text: 'New player account PL-406 (Ananya Reddy) registered', time: '5 hrs ago', color: 'var(--color-warning)' }
      ],
      settings: {
        adminName: 'Admin Manager',
        adminEmail: 'admin@courtlyarena.com',
        clubName: contact.clubName || 'COURTLY',
        clubAddress: contact.address || 'Marina Beach, Chennai, Tamil Nadu, India',
        clubPhone: contact.phoneDisplay || '+91 98765 43210',
        clubEmail: contact.emailDisplay || 'support@courtlyarena.com',
        bookingLeadHours: 2,
        maxAdvanceDays: 14,
        allowNightSlots: true,
        notifyNewBookings: true,
        notifyEnquiries: true,
        notifyMaintenance: false
      }
    };
  }

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) { /* fallback */ }
    const seed = getDefaultState();
    saveState(seed);
    return seed;
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore quota errors */ }
  }

  function showToast(message, variant) {
    let container = document.getElementById('adminToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'adminToastContainer';
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'admin-toast admin-animate-in';
    if (variant === 'danger') toast.style.borderColor = 'var(--color-danger)';
    toast.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:${variant === 'danger' ? 'var(--color-danger)' : 'var(--color-teal)'};flex-shrink:0;"></span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
  }

  function exportCSV(filename, headers, rows) {
    const escapeCell = (val) => `"${String(val == null ? '' : val).replace(/"/g, '""')}"`;
    const csv = [headers.map(escapeCell).join(','), ...rows.map(r => r.map(escapeCell).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename} (demo data)`);
  }

  function formatINR(num) {
    return '₹' + Number(num || 0).toLocaleString('en-IN');
  }

  function buildShell() {
    const activePage = document.body.dataset.adminPage || 'dashboard';
    const pageTitle = document.body.dataset.pageTitle || 'Dashboard';
    const state = getState();
    const unreadCount = (state.messages || []).filter(m => m.status === 'Unread').length;

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: ICONS.dashboard },
      { id: 'bookings', label: 'Bookings', href: 'bookings.html', icon: ICONS.bookings },
      { id: 'courts', label: 'Courts', href: 'courts.html', icon: ICONS.courts },
      { id: 'memberships', label: 'Memberships', href: 'memberships.html', icon: ICONS.memberships },
      { id: 'tournaments', label: 'Tournaments', href: 'tournaments.html', icon: ICONS.tournaments },
      { id: 'players', label: 'Players', href: 'players.html', icon: ICONS.players },
      { id: 'messages', label: 'Messages / Enquiries', href: 'messages.html', icon: ICONS.messages, badge: unreadCount > 0 ? unreadCount : '' },
      { id: 'reports', label: 'Reports & Analytics', href: 'reports.html', icon: ICONS.reports },
      { id: 'settings', label: 'Settings', href: 'settings.html', icon: ICONS.settings }
    ];

    const sidebarMount = document.getElementById('adminSidebarMount');
    if (sidebarMount) {
      sidebarMount.innerHTML = `
        <aside class="admin-sidebar" id="adminSidebar" aria-label="Admin navigation">
          <div class="admin-sidebar-header">
            <a href="dashboard.html" class="admin-brand-link">
              <img class="admin-logo-mark" src="../assets/logo.png" alt="" width="40" height="40">
              <div class="admin-brand-text">
                <span class="admin-brand-name">COURTLY</span>
                <span class="admin-brand-sub">PRO ARENA</span>
              </div>
            </a>
          </div>

          <div class="admin-sidebar-label">ADMIN CONTROL CENTER</div>

          <nav class="admin-nav-scroll">
            <ul class="admin-nav-list">
              ${navItems.map(item => `
                <li>
                  <a href="${item.href}" class="admin-nav-link ${activePage === item.id ? 'active' : ''}" title="${item.label}">
                    <span class="admin-nav-icon">${item.icon}</span>
                    <span class="admin-nav-text">${item.label}</span>
                    ${item.badge ? `<span class="admin-nav-badge">${item.badge}</span>` : ''}
                  </a>
                </li>
              `).join('')}
            </ul>
          </nav>

          <div class="admin-sidebar-footer">
            <div class="admin-profile-mini">
              <img src="${ADMIN_AVATAR}" alt="Admin Manager" class="admin-avatar">
              <div class="admin-profile-meta">
                <span class="admin-profile-name">${(state.settings && state.settings.adminName) || 'Admin Manager'}</span>
                <span class="admin-profile-role">Administrator</span>
              </div>
            </div>
            <a href="../index.html" class="admin-logout-btn" title="Logout to Public Site">
              <span class="admin-nav-icon">${ICONS.logout}</span>
              <span class="admin-logout-text">Logout</span>
            </a>
          </div>
        </aside>
        <div class="admin-sidebar-backdrop" id="adminSidebarBackdrop"></div>
      `;
    }

    const topbarMount = document.getElementById('adminTopbarMount');
    if (topbarMount) {
      const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
      const isRtl = (document.documentElement.getAttribute('dir') || 'ltr') === 'rtl';

      topbarMount.innerHTML = `
        <header class="admin-topbar">
          <div class="admin-topbar-left">
            <button type="button" class="admin-icon-btn" id="adminSidebarToggleBtn" aria-label="Toggle sidebar">
              ${ICONS.menu}
            </button>
            <nav class="admin-breadcrumb" aria-label="Breadcrumb">
              <span class="admin-breadcrumb-prefix">Admin Control Center</span>
              <span class="admin-breadcrumb-prefix">/</span>
              <span class="admin-breadcrumb-current">${pageTitle}</span>
            </nav>
          </div>

          <div class="admin-topbar-right">
            <div class="admin-search-box">
              <span class="admin-search-icon">${ICONS.search}</span>
              <input type="search" id="adminGlobalSearch" placeholder="Search bookings, players, courts..." aria-label="Global admin search">
            </div>

            <!-- RTL/LTR Toggle -->
            <button type="button" class="admin-icon-btn" id="adminDirToggleBtn" title="Switch LTR / RTL">
              <span style="font-size:0.7rem;font-weight:700;" id="adminDirBadge">${isRtl ? 'RTL' : 'LTR'}</span>
            </button>

            <!-- Light/Dark Theme Toggle -->
            <button type="button" class="admin-icon-btn" id="adminThemeToggleBtn" title="Toggle Dark / Light theme" aria-label="Toggle theme">
              <span id="adminThemeIconWrap">${isDark ? ICONS.sun : ICONS.moon}</span>
            </button>

            <!-- Notifications Dropdown -->
            <div class="dropdown">
              <button type="button" class="admin-icon-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
                ${ICONS.bell}
                <span class="admin-notif-dot"></span>
              </button>
              <div class="dropdown-menu dropdown-menu-end admin-dropdown-menu">
                <div class="px-3 py-2 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                  <strong class="small">Notifications (Demo)</strong>
                  <span class="badge bg-info bg-opacity-25 text-info">${unreadCount} New</span>
                </div>
                ${(state.activities || []).slice(0, 3).map(a => `
                  <a href="bookings.html" class="admin-dropdown-item">
                    <span style="width:8px;height:8px;border-radius:50%;background:${a.color};flex-shrink:0;"></span>
                    <div>
                      <div class="small lh-sm">${a.text}</div>
                      <small class="text-muted" style="font-size:0.72rem;">${a.time}</small>
                    </div>
                  </a>
                `).join('')}
                <div class="border-top border-secondary border-opacity-25 mt-1 pt-1">
                  <a href="messages.html" class="admin-dropdown-item justify-content-center text-teal fw-semibold">View Enquiries</a>
                </div>
              </div>
            </div>

            <!-- Admin Profile Dropdown -->
            <div class="dropdown">
              <button type="button" class="admin-profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="${ADMIN_AVATAR}" alt="Admin Manager">
                <span class="admin-profile-trigger-name small fw-semibold">${(state.settings && state.settings.adminName) || 'Admin Manager'}</span>
              </button>
              <div class="dropdown-menu dropdown-menu-end admin-dropdown-menu">
                <div class="px-3 py-2 border-bottom border-secondary border-opacity-25">
                  <div class="fw-bold small">${(state.settings && state.settings.adminName) || 'Admin Manager'}</div>
                  <small class="text-teal">Administrator</small>
                </div>
                <a href="settings.html" class="admin-dropdown-item mt-1">${ICONS.settings} <span>Profile &amp; Settings</span></a>
                <a href="../index.html" class="admin-dropdown-item text-danger">${ICONS.logout} <span>Logout to Website</span></a>
              </div>
            </div>
          </div>
        </header>
      `;
    }

    wireShellEvents();
  }

  function wireShellEvents() {
    const toggleBtn = document.getElementById('adminSidebarToggleBtn');
    const backdrop = document.getElementById('adminSidebarBackdrop');
    const themeBtn = document.getElementById('adminThemeToggleBtn');
    const dirBtn = document.getElementById('adminDirToggleBtn');
    const searchInput = document.getElementById('adminGlobalSearch');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          document.body.classList.toggle('sidebar-mobile-open');
        } else {
          document.body.classList.toggle('sidebar-collapsed');
          localStorage.setItem('courtly_admin_collapsed', document.body.classList.contains('sidebar-collapsed'));
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        document.body.classList.remove('sidebar-mobile-open');
      });
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('courtly_theme', next);
        const iconWrap = document.getElementById('adminThemeIconWrap');
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
        const badge = document.getElementById('adminDirBadge');
        if (badge) badge.textContent = next.toUpperCase();
        showToast(`Layout direction switched to ${next.toUpperCase()}`);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.dispatchEvent(new CustomEvent('courtlyAdminSearch', { detail: { query: e.target.value.trim().toLowerCase() } }));
      });
    }
  }

  window.COURTLY_ADMIN = {
    getState,
    saveState,
    showToast,
    exportCSV,
    formatINR,
    ICONS,
    resetDemoData: function () {
      const fresh = getDefaultState();
      saveState(fresh);
      return fresh;
    }
  };

  document.addEventListener('DOMContentLoaded', buildShell);
})();
