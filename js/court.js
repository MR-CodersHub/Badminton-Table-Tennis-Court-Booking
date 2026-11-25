/**
 * COURTLY - COURT PAGE INTERACTIVE SCRIPT
 * Handles Court Filtering & Sorting, Sport Card Quick-Filter,
 * Facilities Spotlight, Demo Slot Availability Preview, and Gallery Lightbox.
 */

(function () {
  'use strict';

  const DEFAULT_COURTS = [
    {
      id: 'court-01',
      code: 'C-01',
      name: 'Badminton Court 01',
      subtitle: 'Court 01 Pro',
      sport: 'Badminton',
      price: 600,
      status: 'Available',
      available: true,
      featured: false,
      badge: 'Wood Classic',
      description: 'Championship hardwood with 10-layer polyurethane elastic shock absorption and anti-glare LED lighting.',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85',
      tags: ['Professional Flooring', 'Quality Lighting', 'Comfortable Playing Space']
    },
    {
      id: 'court-02',
      code: 'C-02',
      name: 'Badminton Court 02',
      subtitle: 'Court 02 Master',
      sport: 'Badminton',
      price: 750,
      status: 'Prime Slot',
      available: true,
      featured: true,
      badge: 'BWF Grade 1',
      description: 'Official Olympic vinyl surface, zero-glare overhead canopy, and electronic scoring display for matchplay.',
      image: 'https://i.pinimg.com/736x/e2/0c/cd/e20ccd0304b99a52bb731873dff69004.jpg',
      tags: ['Professional Flooring', 'Quality Lighting', 'Equipment Available']
    },
    {
      id: 'court-03',
      code: 'TT-01',
      name: 'Table Tennis Arena 01',
      subtitle: 'Spin Arena 01',
      sport: 'Table Tennis',
      price: 450,
      status: 'Available',
      available: true,
      featured: false,
      badge: 'ITTF Official',
      description: '25mm competition top with anti-skid rubber underlay and spacious 14m x 7m tournament box for crisp rallies.',
      image: 'https://blog.playo.co/wp-content/uploads/2017/03/table-tennis-shots.jpg',
      tags: ['Well-Maintained Facility', 'Comfortable Playing Space', 'Quality Lighting']
    },
    {
      id: 'court-04',
      code: 'TT-02',
      name: 'Table Tennis Arena 02',
      subtitle: 'Speed Spin Duo',
      sport: 'Table Tennis',
      price: 400,
      status: 'Available',
      available: true,
      featured: false,
      badge: 'Dual Station',
      description: 'Twin practice station with optional multi-ball feeder robot and pro carbon paddles for spin & footwork drills.',
      image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=900&q=85',
      tags: ['Equipment Available', 'Well-Maintained Facility', 'Comfortable Playing Space']
    }
  ];

  function getCourtsData() {
    return (window.COURTLY_DATA && Array.isArray(window.COURTLY_DATA.courts))
      ? window.COURTLY_DATA.courts
      : DEFAULT_COURTS;
  }

  // 1. Explore Our Courts: Filter, Sort & Details Modal
  function initCourtsDirectory() {
    const grid = document.getElementById('courtsDirectoryGrid');
    const filterBtns = document.querySelectorAll('.crt-filter-btn[data-filter]');
    const sortSelect = document.getElementById('courtSortSelect');
    const sportSelectCards = document.querySelectorAll('[data-select-sport]');
    const sportFilterBtns = document.querySelectorAll('[data-sport-filter]');

    if (!grid) return;

    const courts = getCourtsData();
    let activeFilter = 'All';
    let activeSort = 'available';

    function renderCourts() {
      let list = courts.filter(c => activeFilter === 'All' || c.sport === activeFilter);

      if (activeSort === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (activeSort === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
      } else {
        list.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
      }

      grid.innerHTML = list.map(court => `
        <div class="col-12 col-md-6">
          <div class="crt-court-card ${court.featured ? 'featured' : ''}">
            <div class="crt-court-img-wrap">
              <img src="${court.image}" alt="${court.name}" class="crt-court-img" loading="lazy">
              <div class="crt-court-img-overlay"></div>
              <span class="crt-court-id-badge">${court.code} • ${court.sport}</span>
              <span class="crt-court-avail-badge">
                <span class="live-pulse-dot me-1"></span>${court.status}
              </span>
            </div>
            <div class="crt-court-body">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="small fw-bold text-teal text-uppercase">${court.subtitle}</span>
                <span class="badge-sports-sub py-1 px-2" style="font-size:0.7rem;">${court.badge}</span>
              </div>
              <h3 class="fs-4 fw-bold mb-2">${court.name}</h3>
              <p class="text-muted small mb-3">${court.description}</p>
              <div class="crt-court-tags">
                ${court.tags.map(tag => `<span class="crt-tag-pill">${tag}</span>`).join('')}
              </div>
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-auto pt-3 border-top border-secondary border-opacity-25">
                <div>
                  <span class="fs-3 fw-bold ${court.featured ? 'text-lime' : ''}">₹${court.price}</span>
                  <span class="small text-muted">/ hour</span>
                </div>
                <div class="d-flex gap-2">
                  <button type="button" class="btn-courtly-outline btn-sm crt-view-detail-btn" data-detail-id="${court.id}">
                    <span>View Details</span>
                  </button>
                  <button type="button" class="${court.featured ? 'btn-courtly-lime' : 'btn-courtly-primary'} btn-sm"
                    data-bs-toggle="modal" data-bs-target="#bookingModal"
                    data-court-id="${court.id}"
                    data-court-name="${court.name}"
                    data-court-sport="${court.sport}"
                    data-court-price="${court.price}">
                    <span>Book This Court</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      attachDynamicCardHandlers();
    }

    function attachDynamicCardHandlers() {
      // View Details modal
      grid.querySelectorAll('.crt-view-detail-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-detail-id');
          const court = courts.find(c => c.id === id);
          if (!court) return;

          document.getElementById('detailModalImg').src = court.image;
          document.getElementById('detailModalImg').alt = court.name;
          document.getElementById('detailModalSport').textContent = `${court.sport} • ${court.code}`;
          document.getElementById('detailModalPrice').textContent = `₹${court.price} / hr`;
          document.getElementById('detailModalName').textContent = court.name;
          document.getElementById('detailModalDesc').textContent = court.description;
          document.getElementById('detailModalTags').innerHTML = court.tags
            .map(t => `<span class="crt-tag-pill">${t}</span>`).join('');

          const bookBtn = document.getElementById('detailModalBookBtn');
          bookBtn.onclick = () => {
            const detailModal = bootstrap.Modal.getInstance(document.getElementById('courtDetailsModal'));
            if (detailModal) detailModal.hide();

            document.getElementById('modalCourtName').textContent = court.name;
            document.getElementById('modalCourtSport').textContent = court.sport;
            document.getElementById('modalCourtPrice').textContent = `₹${court.price}/hr`;
            const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            bookingModal.show();
          };

          const modal = new bootstrap.Modal(document.getElementById('courtDetailsModal'));
          modal.show();
        });
      });

      // Sync booking modal buttons rendered dynamically
      grid.querySelectorAll('[data-court-id]').forEach(btn => {
        btn.addEventListener('click', function () {
          const modalCourtName = document.getElementById('modalCourtName');
          const modalCourtSport = document.getElementById('modalCourtSport');
          const modalCourtPrice = document.getElementById('modalCourtPrice');
          if (modalCourtName) modalCourtName.textContent = this.getAttribute('data-court-name');
          if (modalCourtSport) modalCourtSport.textContent = this.getAttribute('data-court-sport');
          if (modalCourtPrice) modalCourtPrice.textContent = `₹${this.getAttribute('data-court-price')}/hr`;
        });
      });
    }

    function applyFilter(filterName) {
      activeFilter = filterName;
      filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === filterName));
      renderCourts();
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-filter')));
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        renderCourts();
      });
    }

    // Section 2 Sport Card clicks -> filter + scroll
    sportFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sport = btn.getAttribute('data-sport-filter');
        applyFilter(sport);
        document.getElementById('explore-courts')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    sportSelectCards.forEach(card => {
      card.addEventListener('click', () => {
        const sport = card.getAttribute('data-select-sport');
        applyFilter(sport);
        document.getElementById('explore-courts')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    renderCourts();
  }

  // 2. Section 4: Facilities Spotlight
  function initFacilitiesSpotlight() {
    const spots = {
      '1': { tag: 'FEATURE 01', title: 'Quality Playing Surfaces', desc: 'Multi-layer cushioned hardwood and Olympic-grade synthetic mats engineered for dependable grip and reduced joint impact.' },
      '2': { tag: 'FEATURE 02', title: 'Comfortable Lighting', desc: 'Asymmetric 800 Lux anti-glare LED illumination designed to keep shuttlecocks and balls crystal clear without eye strain.' },
      '3': { tag: 'FEATURE 03', title: 'Spacious Playing Areas', desc: 'Generous court run-offs, 11m overhead clearance, and 14m × 7m tournament table boxes for unrestricted movement.' },
      '4': { tag: 'FEATURE 04', title: 'Equipment Availability', desc: 'Pro carbon badminton rackets, feather shuttles, competition paddles, and ball feeder robots ready on-site.' },
      '5': { tag: 'FEATURE 05', title: 'Clean & Maintained Surroundings', desc: 'Daily court sanitization, fresh nets, spotless locker rooms, and organized player lounges.' },
      '6': { tag: 'FEATURE 06', title: 'Comfortable Player Environment', desc: 'Climate-controlled indoor halls maintained at an ideal 21°C for year-round comfort.' }
    };

    const markers = document.querySelectorAll('.crt-spot-marker[data-spot]');
    const miniCards = document.querySelectorAll('.crt-facility-mini-card[data-spot-card]');
    const tagEl = document.getElementById('crtSpotTag');
    const titleEl = document.getElementById('crtSpotTitle');
    const descEl = document.getElementById('crtSpotDesc');

    if (!markers.length || !titleEl) return;

    function selectSpot(id) {
      const info = spots[id];
      if (!info) return;
      markers.forEach(m => m.classList.toggle('active', m.getAttribute('data-spot') === id));
      miniCards.forEach(c => c.classList.toggle('active', c.getAttribute('data-spot-card') === id));
      if (tagEl) tagEl.textContent = info.tag;
      titleEl.textContent = info.title;
      descEl.textContent = info.desc;
    }

    markers.forEach(m => {
      const id = m.getAttribute('data-spot');
      m.addEventListener('click', () => selectSpot(id));
      m.addEventListener('mouseenter', () => selectSpot(id));
    });

    miniCards.forEach(c => {
      c.addEventListener('click', () => selectSpot(c.getAttribute('data-spot-card')));
    });
  }

  // 3. Section 5: Interactive Court Availability & Slot Preview
  function initSlotPreview() {
    const courtSelect = document.getElementById('slotCourtSelect');
    const dateInput = document.getElementById('slotDateInput');
    const slotsGrid = document.getElementById('demoSlotsGrid');
    const summarySport = document.getElementById('summarySportBadge');
    const summaryCourt = document.getElementById('summaryCourtName');
    const summaryDate = document.getElementById('summaryDate');
    const summarySlot = document.getElementById('summarySlot');
    const summaryPrice = document.getElementById('summaryPrice');
    const continueBtn = document.getElementById('continueToBookingBtn');

    if (!courtSelect || !dateInput || !slotsGrid) return;

    const courts = getCourtsData();
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;

    const sampleSlots = [
      { time: '06:00 AM – 07:00 AM', value: '06:00 AM', available: true },
      { time: '07:00 AM – 08:00 AM', value: '07:00 AM', available: false },
      { time: '08:00 AM – 09:00 AM', value: '08:00 AM', available: true },
      { time: '05:00 PM – 06:00 PM', value: '05:00 PM', available: true },
      { time: '06:00 PM – 07:00 PM', value: '06:00 PM', available: true },
      { time: '07:00 PM – 08:00 PM', value: '07:00 PM', available: false }
    ];

    let selectedSlot = sampleSlots[4];

    function renderSlots() {
      slotsGrid.innerHTML = sampleSlots.map((slot, idx) => {
        const isSelected = selectedSlot && selectedSlot.value === slot.value;
        const cls = !slot.available ? 'unavailable' : (isSelected ? 'selected' : '');
        const label = !slot.available ? 'Booked' : (isSelected ? 'Selected' : 'Available');
        return `
          <button type="button" class="crt-slot-btn ${cls}" data-slot-idx="${idx}" ${!slot.available ? 'disabled' : ''}>
            <span class="fw-bold small">${slot.time}</span>
            <span class="badge ${!slot.available ? 'bg-secondary' : (isSelected ? 'bg-lime text-navy' : 'bg-teal text-navy')}" style="font-size:0.7rem;">${label}</span>
          </button>
        `;
      }).join('');

      slotsGrid.querySelectorAll('.crt-slot-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedSlot = sampleSlots[parseInt(btn.getAttribute('data-slot-idx'), 10)];
          renderSlots();
          updateSummary();
        });
      });
    }

    function updateSummary() {
      const court = courts.find(c => c.id === courtSelect.value) || courts[0];
      if (summarySport) summarySport.textContent = court.sport;
      if (summaryCourt) summaryCourt.textContent = court.name;
      if (summaryDate) summaryDate.textContent = dateInput.value || today;
      if (summarySlot) summarySlot.textContent = selectedSlot ? selectedSlot.time : '06:00 PM – 07:00 PM';
      if (summaryPrice) summaryPrice.textContent = `₹${court.price}`;
    }

    courtSelect.addEventListener('change', updateSummary);
    dateInput.addEventListener('change', updateSummary);

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const court = courts.find(c => c.id === courtSelect.value) || courts[0];
        document.getElementById('modalCourtName').textContent = court.name;
        document.getElementById('modalCourtSport').textContent = `${court.sport} • ${dateInput.value}`;
        document.getElementById('modalCourtPrice').textContent = `₹${court.price}/hr`;
        const slotSel = document.getElementById('modalSlotSelect');
        if (slotSel && selectedSlot) slotSel.value = selectedSlot.value;

        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();
      });
    }

    renderSlots();
    updateSummary();
  }

  // 4. Section 9: Gallery Lightbox
  function initGalleryLightbox() {
    const items = document.querySelectorAll('.crt-gallery-item[data-lightbox-src]');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const modalEl = document.getElementById('galleryLightboxModal');

    if (!items.length || !modalEl) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        if (lightboxImg) lightboxImg.src = item.getAttribute('data-lightbox-src');
        if (lightboxCaption) lightboxCaption.textContent = item.getAttribute('data-lightbox-caption') || 'Arena Preview';
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCourtsDirectory();
    initFacilitiesSpotlight();
    initSlotPreview();
    initGalleryLightbox();
  });
})();
