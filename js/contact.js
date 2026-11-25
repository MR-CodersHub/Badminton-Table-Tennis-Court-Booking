/**
 * COURTLY - CONTACT PAGE SCRIPT
 * Hydrates contact info cards, office timings, map/location panel,
 * configured social profiles, contact form validation, and FAQ accordion.
 */

(function () {
  'use strict';

  function getConfig() {
    return window.COURTLY_CONTACT_DATA || {
      clubName: 'COURTLY',
      address: '104 Arena Boulevard, Sports District, Metro City',
      phoneDisplay: '+1 (800) 555-COURT (2687)',
      phoneHref: '',
      emailDisplay: 'support@courtlyarena.com',
      emailHref: 'mailto:support@courtlyarena.com',
      officeTimingsNote: 'Editable office timings placeholder.',
      officeTimings: [],
      mapConfig: { embedUrl: '', directionsUrl: '', placeholderMessage: '' },
      socialProfiles: []
    };
  }

  // 1. Hydrate Hero Quick Values & Section 2 Contact Info Cards
  function initContactCards() {
    const cfg = getConfig();
    const grid = document.getElementById('contactInfoCardsGrid');
    if (!grid) return;

    const configuredSocials = (cfg.socialProfiles || []).filter(s => s.url && s.url.trim() !== '');
    const socialHtml = configuredSocials.length
      ? `<div class="d-flex flex-wrap gap-2 mt-2">
          ${configuredSocials.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${s.name}">
              <i class="${s.icon}"></i>
            </a>
          `).join('')}
         </div>`
      : `<p class="small text-dimmed mb-0 mt-auto">Social profile URLs can be configured in <code>js/contact-data.js</code>.</p>`;

    grid.innerHTML = `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="cnt-info-card">
          <div class="cnt-info-icon"><i class="fa-solid fa-location-dot"></i></div>
          <h3 class="fs-5 fw-bold mb-2">Visit Our Club</h3>
          <p class="text-muted small mb-3">${cfg.address}</p>
          ${cfg.mapConfig && cfg.mapConfig.directionsUrl
            ? `<a href="${cfg.mapConfig.directionsUrl}" target="_blank" rel="noopener noreferrer" class="small fw-bold text-lime text-decoration-none mt-auto">Get Directions <i class="fa-solid fa-arrow-right ms-1"></i></a>`
            : `<span class="small text-dimmed mt-auto">Directions link enabled once map URL is set</span>`
          }
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="cnt-info-card">
          <div class="cnt-info-icon"><i class="fa-solid fa-phone-volume"></i></div>
          <h3 class="fs-5 fw-bold mb-2">Give Us a Call</h3>
          <p class="text-muted small mb-2">Reach our desk for court enquiries and club support.</p>
          ${cfg.phoneHref
            ? `<a href="${cfg.phoneHref}" class="fw-bold text-teal text-decoration-none mt-auto">${cfg.phoneDisplay}</a>`
            : `<strong class="text-teal small mt-auto">${cfg.phoneDisplay}</strong>`
          }
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="cnt-info-card">
          <div class="cnt-info-icon"><i class="fa-solid fa-envelope"></i></div>
          <h3 class="fs-5 fw-bold mb-2">Drop Us an Email</h3>
          <p class="text-muted small mb-2">Write to us anytime regarding bookings or memberships.</p>
          <a href="${cfg.emailHref}" class="fw-bold text-lime text-decoration-none mt-auto text-break">${cfg.emailDisplay}</a>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="cnt-info-card">
          <div class="cnt-info-icon"><i class="fa-solid fa-share-nodes"></i></div>
          <h3 class="fs-5 fw-bold mb-2">Stay Connected</h3>
          <p class="text-muted small mb-2">Follow club updates and upcoming court activities.</p>
          ${socialHtml}
        </div>
      </div>
    `;
  }

  // 2. Section 3: Contact Form Frontend Validation & Demo Submission
  function initContactForm() {
    const form = document.getElementById('contactEnquiryForm');
    const successEl = document.getElementById('contactFormSuccess');
    const summaryEl = document.getElementById('cntSuccessSummary');
    const resetBtn = document.getElementById('cntResetFormBtn');
    const submitBtn = document.getElementById('cntSubmitBtn');

    if (!form) return;

    const nameInput = document.getElementById('cntName');
    const emailInput = document.getElementById('cntEmail');
    const phoneInput = document.getElementById('cntPhone');
    const subjectSelect = document.getElementById('cntSubject');
    const messageInput = document.getElementById('cntMessage');

    let isSubmitting = false;

    function setError(id, msg) {
      const el = document.getElementById(id);
      if (el) el.textContent = msg;
    }

    function clearErrors() {
      ['errCntName', 'errCntEmail', 'errCntPhone', 'errCntSubject', 'errCntMessage'].forEach(id => setError(id, ''));
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      clearErrors();

      let valid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const subject = subjectSelect.value;
      const message = messageInput.value.trim();

      if (name.length < 2) {
        setError('errCntName', 'Please enter your full name.');
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('errCntEmail', 'Please enter a valid email address.');
        valid = false;
      }

      const digitsOnly = phone.replace(/[^\d]/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        setError('errCntPhone', 'Please enter a valid phone number (7–15 digits).');
        valid = false;
      }

      if (!subject) {
        setError('errCntSubject', 'Please select an enquiry subject.');
        valid = false;
      }

      if (message.length < 10) {
        setError('errCntMessage', 'Please enter a brief message (at least 10 characters).');
        valid = false;
      }

      if (!valid) return;

      isSubmitting = true;
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        form.classList.add('d-none');
        if (successEl) successEl.classList.remove('d-none');
        if (summaryEl) {
          summaryEl.textContent = `Thank you, ${name}. Your "${subject}" enquiry passed frontend validation. No backend email service is connected on this static preview.`;
        }
        isSubmitting = false;
        if (submitBtn) submitBtn.disabled = false;
      }, 250);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
        if (successEl) successEl.classList.add('d-none');
        form.classList.remove('d-none');
      });
    }
  }

  // 3. Section 4: Office Timings
  function initOfficeTimings() {
    const cfg = getConfig();
    const listEl = document.getElementById('officeTimingsList');
    const noteEl = document.getElementById('officeTimingsNote');

    if (noteEl) noteEl.textContent = cfg.officeTimingsNote;
    if (!listEl || !Array.isArray(cfg.officeTimings)) return;

    const todayIndex = new Date().getDay();

    listEl.innerHTML = cfg.officeTimings.map(item => {
      const isToday = item.dayIndex === todayIndex;
      return `
        <div class="cnt-timing-row ${isToday ? 'today' : ''}">
          <div class="d-flex align-items-center gap-2">
            <strong class="${isToday ? 'text-lime' : ''}">${item.day}</strong>
            ${isToday ? '<span class="badge-lime-pill py-0 px-2" style="font-size:0.65rem;">TODAY</span>' : ''}
          </div>
          <span class="small ${isToday ? 'fw-bold text-white' : 'text-muted'}">${item.hours}</span>
        </div>
      `;
    }).join('');
  }

  // 4. Section 5: Location & Map
  function initLocationSection() {
    const cfg = getConfig();
    const mapWrap = document.getElementById('contactMapContainer');
    const locCard = document.getElementById('contactLocationCard');

    if (mapWrap) {
      if (cfg.mapConfig && cfg.mapConfig.embedUrl) {
        // ── Responsive iframe wrapper ──
        mapWrap.innerHTML = `
          <div class="cnt-map-embed-wrap">
            <iframe
              src="${cfg.mapConfig.embedUrl}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="COURTLY Location Map"
              allowfullscreen
              aria-label="Map showing sample court location"
            ></iframe>
          </div>
          ${cfg.mapConfig.sampleLabel
            ? `<p class="cnt-map-sample-label"><i class="fa-solid fa-circle-info me-1"></i>${cfg.mapConfig.sampleLabel}</p>`
            : ''
          }
        `;
      } else {
        mapWrap.innerHTML = `
          <div class="cnt-map-placeholder">
            <div class="bento-icon-box teal mx-auto mb-3"><i class="fa-solid fa-map-location-dot"></i></div>
            <span class="badge-sports-sub text-uppercase mb-2">Editable Map Placeholder</span>
            <h4 class="fs-5 fw-bold mb-2">${cfg.address}</h4>
            <p class="small text-muted mb-0">${(cfg.mapConfig && cfg.mapConfig.placeholderMessage) || 'Configure a verified map embed URL in js/contact-data.js.'}</p>
          </div>
        `;
      }
    }

    if (locCard) {
      const displayAddr = (cfg.mapConfig && cfg.mapConfig.displayAddress) || cfg.address;
      locCard.innerHTML = `
        <span class="badge-lime-pill align-self-start mb-3">CLUB LOCATION</span>
        <h3 class="fs-4 fw-bold mb-3">${cfg.clubName}</h3>
        <div class="d-flex flex-column gap-3 mb-4">
          <div class="d-flex align-items-start gap-2">
            <i class="fa-solid fa-location-dot text-teal mt-1"></i>
            <span class="small text-muted">${displayAddr}</span>
          </div>
          <div class="d-flex align-items-start gap-2">
            <i class="fa-solid fa-phone-volume text-lime mt-1"></i>
            ${cfg.phoneHref
              ? `<a href="${cfg.phoneHref}" class="small text-muted text-decoration-none">${cfg.phoneDisplay}</a>`
              : `<span class="small text-muted">${cfg.phoneDisplay}</span>`
            }
          </div>
          <div class="d-flex align-items-start gap-2">
            <i class="fa-solid fa-envelope text-teal mt-1"></i>
            <a href="${cfg.emailHref}" class="small text-teal text-decoration-none">${cfg.emailDisplay}</a>
          </div>
          <div class="d-flex align-items-start gap-2">
            <i class="fa-regular fa-clock text-lime mt-1"></i>
            <span class="small text-muted">See Office Timings schedule above</span>
          </div>
        </div>
        ${cfg.mapConfig && cfg.mapConfig.directionsUrl
          ? `<a href="${cfg.mapConfig.directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-courtly-lime w-100"><span>Get Directions</span><i class="fa-solid fa-diamond-turn-right ms-2"></i></a>`
          : `<a href="#contact-form-section" class="btn-courtly-primary w-100"><span>Enquire Before Visiting</span><i class="fa-solid fa-arrow-up ms-2"></i></a>`
        }
      `;
    }
  }

  // 5. Section 6: Social Media Cards (rich brand-style cards)
  // SVG icon paths for each platform (official brand shapes)
  const SOCIAL_SVG = {
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`
  };

  function initSocialSection() {
    const cfg = getConfig();
    const container = document.getElementById('contactSocialContainer');
    if (!container) return;

    const active = (cfg.socialProfiles || []).filter(s => s.url && s.url.trim() !== '');
    if (!active.length) {
      container.innerHTML = `
        <div class="cnt-social-placeholder">
          <div class="bento-icon-box lime mx-auto mb-3"><i class="fa-solid fa-hashtag"></i></div>
          <h4 class="fs-5 fw-bold mb-2">Social Media Channels Pending Configuration</h4>
          <p class="small text-muted mb-3">
            Add verified Instagram, Facebook, YouTube, or LinkedIn URLs inside <code>js/contact-data.js</code> to display live social cards here without broken links.
          </p>
          <a href="#contact-form-section" class="btn-courtly-outline btn-sm">
            <span>Contact Us Directly</span>
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="row g-4 justify-content-center">
        ${active.map(s => {
          const svgIcon = SOCIAL_SVG[s.id] || '';
          return `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3">
            <a href="${s.url}"
               target="_blank"
               rel="noopener noreferrer"
               class="cnt-social-card-rich ${s.accentClass || ''}"
               aria-label="${s.name} – ${s.title || s.name}">
              <div class="cnt-soc-icon-wrap">
                ${svgIcon}
              </div>
              <div class="cnt-soc-platform-label">${s.name}</div>
              <h4 class="cnt-soc-title">${s.title || s.name}</h4>
              <p class="cnt-soc-desc">${s.description || ''}</p>
              <span class="cnt-soc-btn">
                ${s.btnLabel || 'Visit ' + s.name}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true" style="margin-left:6px;"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.25-7.25v5.19a.75.75 0 001.5 0V6a.75.75 0 00-.75-.75H7.5a.75.75 0 000 1.5h5.19l-7.25 7.25a.75.75 0 000 1.06z" clip-rule="evenodd"/></svg>
              </span>
            </a>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  // 6. Section 7: FAQ Accordion
  function initFaqAccordion() {
    const items = document.querySelectorAll('#cntFaqAccordion .cnt-faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const trigger = item.querySelector('.cnt-faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(other => {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.cnt-faq-trigger');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initContactCards();
    initContactForm();
    initOfficeTimings();
    initLocationSection();
    initSocialSection();
    initFaqAccordion();
  });
})();
