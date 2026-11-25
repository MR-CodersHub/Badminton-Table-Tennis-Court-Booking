/**
 * COURTLY PLAYER DASHBOARD — Settings Page
 * user/js/user-settings.js
 * Appearance settings (theme/direction) apply via localStorage immediately.
 * All other settings are illustrative demo preferences saved to demo state.
 */
(function () {
  'use strict';

  /* ── Load all saved settings into UI ─────────────────── */
  function loadSettings(state) {
    /* Account */
    setVal('settingName',  state.profile.name  || '');
    setVal('settingEmail', state.profile.email || '');

    /* Appearance — read from localStorage (shared with whole site) */
    setVal('settingTheme', localStorage.getItem('courtly_theme') || 'dark');
    setVal('settingDir',   localStorage.getItem('courtly_direction') || 'ltr');

    /* Notification toggles */
    const prefs = state.preferences || {};
    setChecked('notifBooking',    prefs.notifBooking    !== false);
    setChecked('notifTournament', prefs.notifTournament !== false);
    setChecked('notifMembership', prefs.notifMembership !== false);
    setChecked('notifGeneral',    prefs.notifGeneral    !== false);

    /* Privacy */
    setChecked('privPublic', prefs.publicProfile || false);
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function setChecked(id, bool) {
    const el = document.getElementById(id);
    if (el) el.checked = bool;
  }

  /* ── Live appearance preview on select change ─────────── */
  function wireAppearance() {
    const themeSelect = document.getElementById('settingTheme');
    const dirSelect   = document.getElementById('settingDir');

    if (themeSelect) {
      themeSelect.addEventListener('change', () => {
        const theme = themeSelect.value;
        document.documentElement.setAttribute('data-theme',    theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('courtly_theme', theme);
      });
    }

    if (dirSelect) {
      dirSelect.addEventListener('change', () => {
        const dir = dirSelect.value;
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('courtly_direction', dir);
      });
    }
  }

  /* ── Save All Settings ────────────────────────────────── */
  function wireSaveAll() {
    const btn = document.getElementById('saveAllBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const s = window.COURTLY_USER.getState();

      /* Account */
      const name  = document.getElementById('settingName').value.trim();
      const email = document.getElementById('settingEmail').value.trim();
      if (name)  s.profile.name  = name;
      if (email) s.profile.email = email;

      /* Appearance — already applied live; persist to localStorage */
      const theme = document.getElementById('settingTheme').value;
      const dir   = document.getElementById('settingDir').value;
      document.documentElement.setAttribute('data-theme',    theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem('courtly_theme',     theme);
      localStorage.setItem('courtly_direction', dir);

      /* Notification toggles */
      if (!s.preferences) s.preferences = {};
      s.preferences.notifBooking    = document.getElementById('notifBooking').checked;
      s.preferences.notifTournament = document.getElementById('notifTournament').checked;
      s.preferences.notifMembership = document.getElementById('notifMembership').checked;
      s.preferences.notifGeneral    = document.getElementById('notifGeneral').checked;

      /* Privacy */
      s.preferences.publicProfile = document.getElementById('privPublic').checked;

      window.COURTLY_USER.saveState(s);
      window.COURTLY_USER.showToast('Settings saved successfully.');
    });
  }

  /* ── Password demo ────────────────────────────────────── */
  function wirePassword() {
    const btn      = document.getElementById('setPwBtn');
    const feedback = document.getElementById('setPwFeedback');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const cur  = document.getElementById('setPwCurrent').value;
      const nw   = document.getElementById('setPwNew').value;
      const conf = document.getElementById('setPwConfirm').value;

      if (!cur || !nw || !conf) {
        feedback.innerHTML = '<span class="text-warning">Fill in all password fields.</span>';
        return;
      }
      if (nw.length < 8) {
        feedback.innerHTML = '<span class="text-danger">New password must be at least 8 characters.</span>';
        return;
      }
      if (nw !== conf) {
        feedback.innerHTML = '<span class="text-danger">Passwords do not match.</span>';
        return;
      }
      feedback.innerHTML = '<span class="text-success">Password updated (demo only).</span>';
      ['setPwCurrent','setPwNew','setPwConfirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      window.COURTLY_USER.showToast('Password demo update saved.');
    });
  }

  /* ── Reset demo data ──────────────────────────────────── */
  function wireReset() {
    const btn = document.getElementById('resetDemoBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (confirm('Reset all demo data to the original sample state? This cannot be undone.')) {
        window.COURTLY_USER.resetDemoData();
        loadSettings(window.COURTLY_USER.getState());
        window.COURTLY_USER.showToast('Demo data reset to defaults.');
      }
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(() => {
      if (window.COURTLY_USER) {
        clearInterval(interval);
        loadSettings(window.COURTLY_USER.getState());
        wireAppearance();
        wireSaveAll();
        wirePassword();
        wireReset();
      }
    }, 60);
  });
})();
