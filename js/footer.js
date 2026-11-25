/**
 * COURTLY - Reusable Footer Component
 * Injects responsive footer with categorized links, contact specs,
 * social links, newsletter interaction, and legal notices.
 */

(function () {
  'use strict';

  function renderFooter() {
    const footerContainer = document.getElementById('app-footer');
    if (!footerContainer) return;

    const isHome2 = window.location.pathname.endsWith('home2.html') || (document.body && document.body.dataset.page === 'home2');
    const isAbout = window.location.pathname.endsWith('about.html') || (document.body && document.body.dataset.page === 'about');
    const isCourt = window.location.pathname.endsWith('court.html') || (document.body && document.body.dataset.page === 'court');
    const isPlans = window.location.pathname.endsWith('plans.html') || (document.body && document.body.dataset.page === 'plans');
    const isBlog = window.location.pathname.endsWith('blog.html') || window.location.pathname.endsWith('blog-details.html') || (document.body && (document.body.dataset.page === 'blog' || document.body.dataset.page === 'blog-details'));
    const isContact = window.location.pathname.endsWith('contact.html') || (document.body && document.body.dataset.page === 'contact');
    const isHomePage = !isHome2 && !isAbout && !isCourt && !isPlans && !isBlog && !isContact;

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
                  <img class="brand-logo-icon" src="assets/logo.png" alt="" width="40" height="40">
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
                <li><a href="index.html" class="footer-link ${isHomePage ? 'active' : ''}">Home 1</a></li>
                <li><a href="home2.html" class="footer-link ${isHome2 ? 'active' : ''}">Home 2</a></li>
                <li><a href="about.html" class="footer-link ${isAbout ? 'active' : ''}">About Club</a></li>
                <li><a href="court.html" class="footer-link ${isCourt ? 'active' : ''}">Court Schedule</a></li>
                <li><a href="plans.html" class="footer-link ${isPlans ? 'active' : ''}">Membership Plans</a></li>
                <li><a href="blog.html" class="footer-link ${isBlog ? 'active' : ''}">Sports Journal</a></li>
                <li><a href="contact.html" class="footer-link ${isContact ? 'active' : ''}">Contact</a></li>
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
