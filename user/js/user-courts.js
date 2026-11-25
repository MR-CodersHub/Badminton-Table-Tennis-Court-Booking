/**
 * COURTLY PLAYER DASHBOARD - Find a Court Script
 */
(function () {
  'use strict';

  function renderCourts(searchQuery) {
    const grid = document.getElementById('findCourtsGrid');
    if (!grid) return;
    const state = window.COURTLY_USER.getState();
    const sport = document.getElementById('fcSport')?.value || 'all';
    const sort = document.getElementById('fcSort')?.value || 'default';
    const q = (searchQuery || '').toLowerCase();

    let list = (state.courts || []).filter(c => {
      if (sport !== 'all' && c.sport !== sport) return false;
      if (q && !c.name.toLowerCase().includes(q) && !c.sport.toLowerCase().includes(q)) return false;
      return true;
    });

    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);

    grid.innerHTML = list.map(c => `
      <div class="col-12 col-md-6">
        <div class="user-card user-card-hover h-100 d-flex flex-column gap-3">
          <div class="position-relative">
            <img src="${c.image}" alt="${c.name}" class="user-thumb-img">
            <span class="status-badge available position-absolute top-0 end-0 m-3">${c.status} (Demo)</span>
          </div>
          <div class="d-flex justify-content-between align-items-start gap-2">
            <div>
              <span class="small text-teal fw-bold text-uppercase">${c.sport} &bull; ${c.badge || 'Arena'}</span>
              <h2 class="h5 fw-bold mt-1 mb-1">${c.name}</h2>
              <p class="small text-muted mb-1">${c.description}</p>
              <small class="text-teal">${c.facilities}</small>
            </div>
            <div class="text-end flex-shrink-0">
              <div class="fs-4 fw-bold text-lime">${window.COURTLY_USER.formatINR(c.price)}</div>
              <small class="text-muted">per hour</small>
            </div>
          </div>
          <div class="mt-auto pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-end">
            <button type="button" class="btn-user-lime btn-sm fc-book-btn" data-id="${c.id}">Book Now (Demo)</button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.fc-book-btn').forEach(btn => {
      btn.addEventListener('click', () => openBookingModal(btn.dataset.id));
    });
  }

  function openBookingModal(courtId) {
    const state = window.COURTLY_USER.getState();
    const c = state.courts.find(x => x.id === courtId);
    if (!c) return;
    document.getElementById('bookCourtId').value = c.id;
    document.getElementById('bookCourtName').textContent = c.name;
    document.getElementById('bookCourtMeta').textContent = `${c.sport} • ${c.badge}`;
    document.getElementById('bookModalDate').value = document.getElementById('fcDate').value || new Date().toISOString().slice(0, 10);
    document.getElementById('bookModalSlot').value = document.getElementById('fcSlot').value;
    document.getElementById('bookModalRate').textContent = `${window.COURTLY_USER.formatINR(c.price)} / hr`;
    document.getElementById('bookModalTotal').textContent = window.COURTLY_USER.formatINR(c.price);
    new bootstrap.Modal(document.getElementById('demoCourtBookModal')).show();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const fcDate = document.getElementById('fcDate');
    if (fcDate) fcDate.value = new Date().toISOString().slice(0, 10);

    renderCourts();

    ['fcSport', 'fcSort'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => renderCourts());
    });

    const params = new URLSearchParams(window.location.search);
    const bookParam = params.get('book');
    if (bookParam) openBookingModal(bookParam);

    document.getElementById('demoCourtBookForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_USER.getState();
      const court = state.courts.find(c => c.id === document.getElementById('bookCourtId').value);
      if (!court) return;

      const newId = 'CR-2026-' + Math.floor(300 + Math.random() * 699);
      const dateVal = document.getElementById('bookModalDate').value;
      const slotVal = document.getElementById('bookModalSlot').value;

      state.bookings.unshift({
        id: newId,
        court: court.name,
        sport: court.sport,
        date: `${dateVal} (Demo)`,
        slot: slotVal,
        amount: court.price,
        status: 'Upcoming',
        label: 'Confirmed (demo)'
      });
      state.activities.unshift({
        id: 'ua-' + Date.now(),
        text: `Demo booking ${newId} created for ${court.name}`,
        time: 'Just now',
        color: 'var(--color-teal)'
      });
      state.notifications.unshift({
        id: 'n-' + Date.now(),
        category: 'Bookings',
        title: 'Demo Court Booking Saved',
        message: `${court.name} on ${dateVal} (${slotVal}) saved locally as demo booking ${newId}.`,
        time: 'Just now',
        unread: true
      });
      window.COURTLY_USER.saveState(state);
      window.COURTLY_USER.refreshBadge();
      bootstrap.Modal.getInstance(document.getElementById('demoCourtBookModal')).hide();
      window.COURTLY_USER.showToast(`Demo booking ${newId} saved locally (no real reservation).`);
    });

    window.addEventListener('courtlyUserSearch', (e) => renderCourts(e.detail.query));
  });
})();
