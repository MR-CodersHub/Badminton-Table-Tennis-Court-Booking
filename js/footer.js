/**
 * COURTLY - Reusable Footer Component
 * Injects responsive footer with categorized links, contact specs,
 * social links, newsletter interaction, and legal notices.
 */

(function () {
  'use strict';

  const BRAND_LOGO_SVG = `
    <svg class="brand-logo-icon" width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="footerCourtlyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#287DDE" />
          <stop offset="50%" stop-color="#20C9A6" />
          <stop offset="100%" stop-color="#C6F36B" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke="url(#footerCourtlyGrad)" stroke-width="2.5" stroke-dasharray="6 3" opacity="0.8" />
      <circle cx="21" cy="21" r="12" fill="#20C9A6" fill-opacity="0.25" stroke="#287DDE" stroke-width="2.2" />
      <path d="M29.5 29.5 L39 39" stroke="#C6F36B" stroke-width="3.5" stroke-linecap="round" />
      <path d="M15 15 L24 8 L30 19 Z" fill="none" stroke="#20C9A6" stroke-width="2" stroke-linejoin="round" />
      <circle cx="15.5" cy="15.5" r="3.2" fill="#C6F36B" />
      <circle cx="34" cy="18" r="2.8" fill="#FFFFFF" />
    </svg>
  `;

  function renderFooter() {
    const footerContainer = document.getElementById('app-footer');
    if (!footerContainer) return;

    const isHome2 = window.location.pathname.endsWith('home2.html') || (document.body && document.body.dataset.page === 'home2');

    footerContainer.innerHTML = `
      <footer class="courtly-footer position-relative overflow-hidden">
        <!-- Floating Subtle Background Graphics -->
        <div class="footer-bg-glow glow-1"></div>
        <div class="footer-bg-glow glow-2"></div>
        <div class="footer-court-grid-pattern"></div>

        <div class="courtly-container position-relative z-1">
          <!-- Top Row: Newsletter & Club Callout -->
          <div class="footer-newsletter-banner p-4 p-lg-5 mb-5 rounded-4">
            <div class="row align-items-center g-4">
              <div class="col-lg-7">
                <span class="badge-sports-sub text-uppercase mb-2 d-inline-block">Stay Ahead of the Rally</span>
                <h3 class="newsletter-heading mb-2">Get Priority Slot Drops & Tournament Invitations</h3>
                <p class="newsletter-desc text-muted mb-0">Join 15,000+ passionate racket athletes receiving weekly fixture drops and member discounts.</p>
              </div>
              <div class="col-lg-5">
                <form class="newsletter-form d-flex align-items-center" id="footerNewsletterForm">
                  <div class="input-wrap flex-grow-1 position-relative">
                    <i class="fa-regular fa-envelope input-icon"></i>
                    <input type="email" class="form-control newsletter-input" placeholder="Enter your email address" required aria-label="Your email">
                  </div>
                  <button type="submit" class="btn-newsletter ms-2">
                    <span>Subscribe</span>
                    <i class="fa-solid fa-arrow-right ms-1"></i>
                  </button>
                </form>
                <div class="newsletter-disclaimer mt-2">
                  <small class="text-muted"><i class="fa-solid fa-shield-check text-success me-1"></i> No spam. Unsubscribe anytime with 1 click.</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Footer Content Grid -->
          <div class="row g-4 g-lg-5 mb-5">
            <!-- Brand Column -->
            <div class="col-12 col-md-6 col-lg-4">
              <a href="index.html" class="courtly-brand d-flex align-items-center text-decoration-none mb-3">
                <div class="brand-logo-wrap">
                  ${BRAND_LOGO_SVG}
                </div>
                <div class="brand-text-wrap ms-2">
                  <span class="brand-name">COURTLY</span>
                  <span class="brand-badge">PRO ARENA</span>
                </div>
              </a>
              <p class="brand-bio text-muted mb-4">
                The premier indoor sports sanctuary engineered for badminton enthusiasts and table tennis masters. High-performance wooden shock-absorption, BWF & ITTF certified arenas, 24/7 seamless online booking.
              </p>
              <!-- Social Icons -->
              <div class="social-links-wrap d-flex align-items-center gap-2">
                <a href="#instagram" class="social-link" title="Instagram" aria-label="Courtly on Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#facebook" class="social-link" title="Facebook" aria-label="Courtly on Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#twitter" class="social-link" title="X (Twitter)" aria-label="Courtly on X"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#youtube" class="social-link" title="YouTube" aria-label="Courtly on YouTube"><i class="fa-brands fa-youtube"></i></a>
                <a href="#discord" class="social-link" title="Discord Community" aria-label="Courtly Community on Discord"><i class="fa-brands fa-discord"></i></a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="col-6 col-md-3 col-lg-2">
              <h5 class="footer-col-title">Explore Arena</h5>
              <ul class="footer-links-list list-unstyled m-0 p-0">
                <li><a href="index.html" class="footer-link ${!isHome2 ? 'active' : ''}">Home 1</a></li>
                <li><a href="home2.html" class="footer-link ${isHome2 ? 'active' : ''}">Home 2</a></li>
                <li><a href="${isHome2 ? 'home2.html#h2-features' : 'index.html#about-features'}" class="footer-link">About Club</a></li>
                <li><a href="${isHome2 ? 'home2.html#h2-sports' : 'index.html#live-courts'}" class="footer-link">Court Schedule</a></li>
                <li><a href="${isHome2 ? 'home2.html#h2-membership' : 'index.html#membership-preview'}" class="footer-link">Membership Plans</a></li>
                <li><a href="${isHome2 ? 'home2.html#h2-testimonials' : 'index.html#tournaments'}" class="footer-link">Tournaments</a></li>
                <li><a href="#app-footer" class="footer-link">Contact</a></li>
              </ul>
            </div>

            <!-- Sports & Facilities -->
            <div class="col-6 col-md-3 col-lg-2">
              <h5 class="footer-col-title">Sports & Passes</h5>
              <ul class="footer-links-list list-unstyled m-0 p-0">
                <li><a href="#sport-badminton" class="footer-link">Badminton Courts</a></li>
                <li><a href="#sport-tabletennis" class="footer-link">Table Tennis Arenas</a></li>
                <li><a href="#live-courts" class="footer-link">Hourly Bookings</a></li>
                <li><a href="#membership-preview" class="footer-link">Elite Passes</a></li>
                <li><a href="#coaching" class="footer-link">Pro Coaching</a></li>
                <li><a href="#gear-rental" class="footer-link">Racket & Gear Rental</a></li>
                <li><a href="#tournaments" class="footer-link">Weekend Leagues</a></li>
              </ul>
            </div>

            <!-- Contact & Venue Details -->
            <div class="col-12 col-md-12 col-lg-4">
              <h5 class="footer-col-title">Arena Location & Support</h5>
              <ul class="footer-contact-list list-unstyled m-0 p-0 mb-4">
                <li class="d-flex align-items-start mb-3">
                  <div class="contact-icon-box me-3"><i class="fa-solid fa-location-dot"></i></div>
                  <div>
                    <span class="contact-label text-muted d-block">Grand Arena Complex</span>
                    <strong class="contact-val">104 Arena Boulevard, Sports District, Metro City</strong>
                  </div>
                </li>
                <li class="d-flex align-items-start mb-3">
                  <div class="contact-icon-box me-3"><i class="fa-solid fa-phone-volume"></i></div>
                  <div>
                    <span class="contact-label text-muted d-block">Booking Desk Hotline</span>
                    <strong class="contact-val">+1 (800) 555-COURT (2687)</strong>
                  </div>
                </li>
                <li class="d-flex align-items-start mb-3">
                  <div class="contact-icon-box me-3"><i class="fa-solid fa-envelope"></i></div>
                  <div>
                    <span class="contact-label text-muted d-block">Direct Inquiries</span>
                    <strong class="contact-val">support@courtlyarena.com</strong>
                  </div>
                </li>
                <li class="d-flex align-items-start">
                  <div class="contact-icon-box me-3"><i class="fa-solid fa-clock"></i></div>
                  <div>
                    <span class="contact-label text-muted d-block">Operating Schedule</span>
                    <strong class="contact-val">Open 24/7 (Night sessions fully lit)</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="footer-bottom-bar pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <p class="copyright-text m-0 text-muted">
              &copy; 2026 <strong>COURTLY Arena Technologies</strong>. All rights reserved.
            </p>
            <div class="legal-links d-flex align-items-center gap-3">
              <a href="#privacy" class="legal-link">Privacy Policy</a>
              <span class="sep-dot">•</span>
              <a href="#terms" class="legal-link">Terms & Conditions</a>
              <span class="sep-dot">•</span>
              <a href="#cookies" class="legal-link">Cookie Preferences</a>
              <span class="sep-dot">•</span>
              <a href="#safety" class="legal-link">Arena Safety Protocols</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    // Initialize Newsletter interaction
    const newsletterForm = document.getElementById('footerNewsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        if (input && input.value) {
          if (window.CourtlyNavbar && typeof window.CourtlyNavbar.showToast === 'function') {
            window.CourtlyNavbar.showToast(`Thanks for subscribing! Welcome gift sent to ${input.value}`);
          } else {
            alert(`Thanks for subscribing! Priority pass sent to ${input.value}`);
          }
          input.value = '';
        }
      });
    }
  }

  // Auto-render on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }

  window.CourtlyFooter = {
    render: renderFooter
  };
})();
