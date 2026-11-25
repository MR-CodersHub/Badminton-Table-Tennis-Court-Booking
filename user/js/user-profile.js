/**
 * COURTLY PLAYER DASHBOARD — Profile Page
 * user/js/user-profile.js
 * All profile data is illustrative demo data stored in localStorage.
 */
(function () {
  'use strict';

  /* ── Populate display fields ──────────────────────────── */
  function populateDisplay(state) {
    const { profile, membership } = state;

    /* Hero */
    const avatarImg = document.getElementById('profAvatarImg');
    if (avatarImg) avatarImg.src = profile.avatar || '';
    setText('profHeroName', profile.name);
    setText('profHeroId',   profile.id);
    setText('profHeroSince', profile.memberSince || '—');

    /* Personal */
    setText('profName',  profile.name);
    setText('profId',    profile.id);
    setText('profSince', profile.memberSince || '—');

    /* Contact */
    setText('profEmail', profile.email);
    setText('profPhone', profile.phone);

    /* Sports preferences checkboxes */
    const sports = (profile.preferredSports || '').split(',').map(s => s.trim());
    setChecked('sportBad', sports.includes('Badminton'));
    setChecked('sportTT',  sports.includes('Table Tennis'));

    /* Membership */
    setText('profPlan',    membership.planName + ' — ₹' + membership.price + '/mo');
    setText('profStatus',  membership.status);
    setText('profRenewal', membership.renewalDate);
    setText('profHours',   membership.includedHours + ' hrs/mo • ' + membership.usedHours + ' used • ' + (membership.includedHours - membership.usedHours) + ' remaining');
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '—';
  }

  function setChecked(id, bool) {
    const el = document.getElementById(id);
    if (el) el.checked = bool;
  }

  /* ── Prefill edit modal ───────────────────────────────── */
  function prefillEditModal(state) {
    const { profile } = state;
    setVal('editName',  profile.name);
    setVal('editEmail', profile.email);
    setVal('editPhone', profile.phone);
    const sports = (profile.preferredSports || '').split(',').map(s => s.trim());
    setChecked('editSportBad', sports.includes('Badminton'));
    setChecked('editSportTT',  sports.includes('Table Tennis'));
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  /* ── Save edit profile form ───────────────────────────── */
  function wireEditForm() {
    const form = document.getElementById('editProfileForm');
    if (!form) return;

    /* open: prefill */
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      modalEl.addEventListener('show.bs.modal', () => {
        prefillEditModal(window.COURTLY_USER.getState());
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

      const sports = [];
      if (document.getElementById('editSportBad').checked)  sports.push('Badminton');
      if (document.getElementById('editSportTT').checked)   sports.push('Table Tennis');

      const s = window.COURTLY_USER.getState();
      s.profile.name             = document.getElementById('editName').value.trim();
      s.profile.email            = document.getElementById('editEmail').value.trim();
      s.profile.phone            = document.getElementById('editPhone').value.trim();
      s.profile.preferredSports  = sports.join(', ') || 'None';
      window.COURTLY_USER.saveState(s);

      populateDisplay(s);
      bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
      window.COURTLY_USER.showToast('Profile updated (demo).');
    });
  }

  /* ── Password (demo) ──────────────────────────────────── */
  function wirePassword() {
    const btn      = document.getElementById('changePwBtn');
    const feedback = document.getElementById('pwFeedback');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const cur  = document.getElementById('currentPw').value;
      const nw   = document.getElementById('newPw').value;
      const conf = document.getElementById('confirmPw').value;

      if (!cur || !nw || !conf) {
        feedback.innerHTML = '<span class="text-warning">Please fill in all password fields.</span>';
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
      feedback.innerHTML = '<span class="text-success">Password updated (demo only — no real auth).</span>';
      document.getElementById('currentPw').value = '';
      document.getElementById('newPw').value      = '';
      document.getElementById('confirmPw').value  = '';
      window.COURTLY_USER.showToast('Password demo update saved.');
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(() => {
      if (window.COURTLY_USER) {
        clearInterval(interval);
        const state = window.COURTLY_USER.getState();
        populateDisplay(state);
        wireEditForm();
        wirePassword();
      }
    }, 60);
  });
})();
