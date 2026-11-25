/**
 * COURTLY ADMIN - Players Management Script
 */
(function () {
  'use strict';

  function getFiltered() {
    const state = window.COURTLY_ADMIN.getState();
    const q = (document.getElementById('plSearch')?.value || '').trim().toLowerCase();
    const sport = document.getElementById('plSport')?.value || 'all';
    const status = document.getElementById('plStatus')?.value || 'all';
    return (state.players || []).filter(p => {
      if (q && !p.name.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q) && !p.email.toLowerCase().includes(q)) return false;
      if (sport !== 'all' && p.sport !== sport) return false;
      if (status !== 'all' && p.status !== status) return false;
      return true;
    });
  }

  function renderSummary() {
    const state = window.COURTLY_ADMIN.getState();
    const list = state.players || [];
    const cards = [
      { label: 'Total Demo Players', val: list.length },
      { label: 'Active Players', val: list.filter(p => p.status === 'Active').length },
      { label: 'New This Month', val: list.filter(p => p.joined.startsWith('2026-11')).length },
      { label: 'Membership Holders', val: list.filter(p => p.plan && p.plan !== 'None').length }
    ];
    const wrap = document.getElementById('playerSummaryCards');
    if (!wrap) return;
    wrap.innerHTML = cards.map(c => `
      <div class="col-6 col-lg-3">
        <div class="admin-card admin-card-hover">
          <span class="small text-muted fw-semibold">${c.label}</span>
          <div class="admin-kpi-value mt-1">${c.val}</div>
        </div>
      </div>
    `).join('');
  }

  function renderTable() {
    const tbody = document.getElementById('playersTableBody');
    if (!tbody) return;
    const rows = getFiltered();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No matching demo players found.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(p => `
      <tr>
        <td class="fw-bold">${p.id}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${p.avatar}" alt="${p.name}" class="admin-avatar-sm">
            <div>
              <div class="fw-semibold">${p.name}</div>
              <small class="text-muted">${p.email}</small>
            </div>
          </div>
        </td>
        <td>${p.phone}</td>
        <td>${p.sport}</td>
        <td><span class="text-teal fw-semibold">${p.plan}</span></td>
        <td>${p.joined}</td>
        <td><span class="status-badge ${p.status.toLowerCase()}">${p.status}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 pl-view-btn" data-id="${p.id}" style="font-size:0.74rem;">View</button>
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 pl-edit-btn" data-id="${p.id}" style="font-size:0.74rem;">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');

    const state = window.COURTLY_ADMIN.getState();
    tbody.querySelectorAll('.pl-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = state.players.find(x => x.id === btn.dataset.id);
        if (!p) return;
        document.getElementById('viewPlayerBody').innerHTML = `
          <div class="d-flex align-items-center gap-3 mb-3">
            <img src="${p.avatar}" alt="${p.name}" class="rounded-4" style="width:64px;height:64px;object-fit:cover;">
            <div>
              <h5 class="fw-bold mb-0">${p.name}</h5>
              <small class="text-muted">${p.id} &bull; ${p.email}</small>
            </div>
          </div>
          <div class="row g-2 small">
            <div class="col-6"><span class="text-muted d-block">Phone (Demo)</span><strong>${p.phone}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Preferred Sport</span><strong>${p.sport}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Membership</span><strong>${p.plan}</strong></div>
            <div class="col-6"><span class="text-muted d-block">Status</span><span class="status-badge ${p.status.toLowerCase()}">${p.status}</span></div>
          </div>
        `;
        new bootstrap.Modal(document.getElementById('viewPlayerModal')).show();
      });
    });

    tbody.querySelectorAll('.pl-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = state.players.find(x => x.id === btn.dataset.id);
        if (!p) return;
        document.getElementById('editPlId').value = p.id;
        document.getElementById('editPlName').value = p.name;
        document.getElementById('editPlSport').value = p.sport;
        document.getElementById('editPlPlan').value = p.plan;
        document.getElementById('editPlStatus').value = p.status;
        new bootstrap.Modal(document.getElementById('editPlayerModal')).show();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderTable();

    ['plSearch', 'plSport', 'plStatus'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderTable);
      document.getElementById(id)?.addEventListener('change', renderTable);
    });

    document.getElementById('editPlayerForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('editPlId').value;
      const idx = state.players.findIndex(x => x.id === id);
      if (idx > -1) {
        state.players[idx].name = document.getElementById('editPlName').value.trim();
        state.players[idx].sport = document.getElementById('editPlSport').value;
        state.players[idx].plan = document.getElementById('editPlPlan').value;
        state.players[idx].status = document.getElementById('editPlStatus').value;
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('editPlayerModal')).hide();
      renderSummary();
      renderTable();
      window.COURTLY_ADMIN.showToast(`Player ${id} updated (demo).`);
    });

    document.getElementById('exportPlayersCsvBtn')?.addEventListener('click', () => {
      const rows = getFiltered().map(p => [p.id, p.name, p.email, p.phone, p.sport, p.plan, p.joined, p.status]);
      window.COURTLY_ADMIN.exportCSV('courtly-demo-players.csv', ['Player ID', 'Name', 'Email', 'Phone', 'Sport', 'Plan', 'Joined', 'Status'], rows);
    });

    window.addEventListener('courtlyAdminSearch', (e) => {
      const input = document.getElementById('plSearch');
      if (input) { input.value = e.detail.query; renderTable(); }
    });
  });
})();
