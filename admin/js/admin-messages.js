/**
 * COURTLY ADMIN - Messages & Enquiries Script
 */
(function () {
  'use strict';

  function renderSummary() {
    const state = window.COURTLY_ADMIN.getState();
    const list = state.messages || [];
    const cards = [
      { label: 'Total Enquiries', val: list.length },
      { label: 'Unread Messages', val: list.filter(m => m.status === 'Unread').length },
      { label: 'Replied', val: list.filter(m => m.status === 'Replied').length },
      { label: 'Pending', val: list.filter(m => m.status === 'Pending').length }
    ];
    const wrap = document.getElementById('msgSummaryCards');
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
    const tbody = document.getElementById('messagesTableBody');
    if (!tbody) return;
    const state = window.COURTLY_ADMIN.getState();
    const q = (document.getElementById('msgSearch')?.value || '').trim().toLowerCase();
    const cat = document.getElementById('msgCategory')?.value || 'all';
    const status = document.getElementById('msgStatus')?.value || 'all';

    const rows = (state.messages || []).filter(m => {
      if (q && !m.sender.toLowerCase().includes(q) && !m.subject.toLowerCase().includes(q)) return false;
      if (cat !== 'all' && m.category !== cat) return false;
      if (status !== 'all' && m.status !== status) return false;
      return true;
    });

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No matching enquiries found.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(m => `
      <tr>
        <td>
          <div class="fw-semibold">${m.sender}</div>
          <small class="text-muted">${m.email}</small>
        </td>
        <td><span class="small text-teal fw-semibold">${m.category}</span></td>
        <td>${m.subject}</td>
        <td class="small text-muted">${m.date}</td>
        <td><span class="status-badge ${m.status.toLowerCase()}">${m.status}</span></td>
        <td>
          <div class="d-flex flex-wrap gap-1">
            <button type="button" class="btn-admin-primary btn-sm py-1 px-2 msg-open-btn" data-id="${m.id}" style="font-size:0.74rem;">Open</button>
            <button type="button" class="btn-admin-outline btn-sm py-1 px-2 msg-toggle-btn" data-id="${m.id}" style="font-size:0.74rem;">
              ${m.status === 'Unread' ? 'Mark Read' : 'Mark Unread'}
            </button>
            ${m.status !== 'Archived' ? `<button type="button" class="btn-admin-outline btn-sm py-1 px-2 msg-arch-btn" data-id="${m.id}" style="font-size:0.74rem;">Archive</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');

    wireActions();
  }

  function wireActions() {
    const state = window.COURTLY_ADMIN.getState();

    document.querySelectorAll('.msg-open-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = state.messages.find(x => x.id === btn.dataset.id);
        if (!m) return;
        document.getElementById('msgModalId').value = m.id;
        document.getElementById('msgModalSubject').textContent = m.subject;
        document.getElementById('msgModalSender').textContent = `${m.sender} (${m.email})`;
        document.getElementById('msgModalMeta').textContent = m.date;
        document.getElementById('msgModalCat').textContent = m.category;
        document.getElementById('msgModalBody').textContent = m.body;
        document.getElementById('msgReplyText').value = m.reply || '';
        new bootstrap.Modal(document.getElementById('viewMessageModal')).show();
      });
    });

    document.querySelectorAll('.msg-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = state.messages.findIndex(x => x.id === btn.dataset.id);
        if (idx === -1) return;
        state.messages[idx].status = state.messages[idx].status === 'Unread' ? 'Pending' : 'Unread';
        window.COURTLY_ADMIN.saveState(state);
        renderSummary();
        renderTable();
      });
    });

    document.querySelectorAll('.msg-arch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = state.messages.findIndex(x => x.id === btn.dataset.id);
        if (idx === -1) return;
        state.messages[idx].status = 'Archived';
        window.COURTLY_ADMIN.saveState(state);
        renderSummary();
        renderTable();
        window.COURTLY_ADMIN.showToast('Enquiry archived (demo).');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderTable();

    ['msgSearch', 'msgCategory', 'msgStatus'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderTable);
      document.getElementById(id)?.addEventListener('change', renderTable);
    });

    document.getElementById('replyMessageForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = window.COURTLY_ADMIN.getState();
      const id = document.getElementById('msgModalId').value;
      const idx = state.messages.findIndex(x => x.id === id);
      if (idx > -1) {
        state.messages[idx].reply = document.getElementById('msgReplyText').value.trim();
        state.messages[idx].status = 'Replied';
        window.COURTLY_ADMIN.saveState(state);
      }
      bootstrap.Modal.getInstance(document.getElementById('viewMessageModal')).hide();
      renderSummary();
      renderTable();
      window.COURTLY_ADMIN.showToast('Demo reply recorded locally (no email sent).');
    });

    window.addEventListener('courtlyAdminSearch', (e) => {
      const input = document.getElementById('msgSearch');
      if (input) { input.value = e.detail.query; renderTable(); }
    });
  });
})();
