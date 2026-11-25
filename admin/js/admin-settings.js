/**
 * COURTLY ADMIN - Settings Script
 */
(function () {
  'use strict';

  function loadSettings() {
    const state = window.COURTLY_ADMIN.getState();
    const s = state.settings || {};

    document.getElementById('setAdminName').value = s.adminName || 'Admin Manager';
    document.getElementById('setAdminEmail').value = s.adminEmail || 'admin@courtlyarena.com';
    document.getElementById('setClubName').value = s.clubName || 'COURTLY';
    document.getElementById('setClubPhone').value = s.clubPhone || '+91 98765 43210';
    document.getElementById('setClubEmail').value = s.clubEmail || 'support@courtlyarena.com';
    document.getElementById('setClubAddress').value = s.clubAddress || 'Marina Beach, Chennai, Tamil Nadu, India';

    document.getElementById('setLeadHours').value = s.bookingLeadHours ?? 2;
    document.getElementById('setMaxDays').value = s.maxAdvanceDays ?? 14;
    document.getElementById('setAllowNight').checked = Boolean(s.allowNightSlots);

    document.getElementById('setNotifBookings').checked = Boolean(s.notifyNewBookings);
    document.getElementById('setNotifEnquiries').checked = Boolean(s.notifyEnquiries);
    document.getElementById('setNotifMaint').checked = Boolean(s.notifyMaintenance);

    document.getElementById('setThemePref').value = localStorage.getItem('courtly_theme') || 'dark';
    document.getElementById('setDirPref').value = localStorage.getItem('courtly_direction') || 'ltr';
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    document.getElementById('adminSettingsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = document.getElementById('setDemoPass1').value;
      const p2 = document.getElementById('setDemoPass2').value;
      if ((p1 || p2) && p1 !== p2) {
        window.COURTLY_ADMIN.showToast('Demo password fields do not match.', 'danger');
        return;
      }

      const state = window.COURTLY_ADMIN.getState();
      state.settings = {
        adminName: document.getElementById('setAdminName').value.trim(),
        adminEmail: document.getElementById('setAdminEmail').value.trim(),
        clubName: document.getElementById('setClubName').value.trim(),
        clubPhone: document.getElementById('setClubPhone').value.trim(),
        clubEmail: document.getElementById('setClubEmail').value.trim(),
        clubAddress: document.getElementById('setClubAddress').value.trim(),
        bookingLeadHours: Number(document.getElementById('setLeadHours').value),
        maxAdvanceDays: Number(document.getElementById('setMaxDays').value),
        allowNightSlots: document.getElementById('setAllowNight').checked,
        notifyNewBookings: document.getElementById('setNotifBookings').checked,
        notifyEnquiries: document.getElementById('setNotifEnquiries').checked,
        notifyMaintenance: document.getElementById('setNotifMaint').checked
      };
      window.COURTLY_ADMIN.saveState(state);

      const theme = document.getElementById('setThemePref').value;
      const dir = document.getElementById('setDirPref').value;
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem('courtly_theme', theme);
      localStorage.setItem('courtly_direction', dir);

      document.getElementById('setDemoPass1').value = '';
      document.getElementById('setDemoPass2').value = '';
      window.COURTLY_ADMIN.showToast('Settings saved locally (demo).');
    });

    document.getElementById('resetDemoStateBtn')?.addEventListener('click', () => {
      window.COURTLY_ADMIN.resetDemoData();
      loadSettings();
      window.COURTLY_ADMIN.showToast('All demo admin data reset to defaults.');
    });
  });
})();
