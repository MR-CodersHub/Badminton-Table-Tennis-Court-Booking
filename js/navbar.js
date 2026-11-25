/**
 * COURTLY - Reusable Navbar Component
 * Handles sticky glassmorphism, responsive mobile drawer,
 * Dark/Light theme switching, and LTR/RTL text direction switching.
 */

(function () {
  'use strict';

  // Dynamic navigation link generation based on current page
  function getNavLinks() {
    const isHome2 = window.location.pathname.endsWith('home2.html') || (document.body && document.body.dataset.page === 'home2');
    const isAbout = window.location.pathname.endsWith('about.html') || (document.body && document.body.dataset.page === 'about');
    const isCourt = window.location.pathname.endsWith('court.html') || (document.body && document.body.dataset.page === 'court');
    const isPlans = window.location.pathname.endsWith('plans.html') || (document.body && document.body.dataset.page === 'plans');
    const isBlog = window.location.pathname.endsWith('blog.html') || window.location.pathname.endsWith('blog-details.html') || (document.body && (document.body.dataset.page === 'blog' || document.body.dataset.page === 'blog-details'));
    const isContact = window.location.pathname.endsWith('contact.html') || (document.body && document.body.dataset.page === 'contact');
    const isHomePage = !isHome2 && !isAbout && !isCourt && !isPlans && !isBlog && !isContact;
    return [
      { label: 'Home 1', href: 'index.html', active: isHomePage },
      { label: 'Home 2', href: 'home2.html', active: isHome2 },
      { label: 'About', href: 'about.html', active: isAbout },
      { label: 'Court', href: 'court.html', active: isCourt },
      { label: 'Plans', href: 'plans.html', active: isPlans },
      { label: 'Blog', href: 'blog.html', active: isBlog },
      { label: 'Contact', href: 'contact.html', active: isContact }
    ];
  }

  // Render the Navbar HTML
  function renderNavbar() {
    const navbarContainer = document.getElementById('app-navbar');
    if (!navbarContainer) return;

    // Detect initial preferences
    const savedTheme = localStorage.getItem('courtly_theme') || 'dark';
    const savedDir = localStorage.getItem('courtly_direction') || 'ltr';

    // Apply to document immediately
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    document.documentElement.setAttribute('dir', savedDir);

    const isDark = savedTheme === 'dark';
    const isRtl = savedDir === 'rtl';
    const navLinks = getNavLinks();

    navbarContainer.innerHTML = `
      <!-- Fixed Glass Navbar -->
      <nav class="courtly-navbar" id="courtlyNavbar" aria-label="Main Navigation">
        <div class="courtly-container d-flex align-items-center justify-content-between">
          
          <!-- LEFT: Brand Logo -->
          <a href="index.html" class="courtly-brand d-flex align-items-center text-decoration-none">
            <div class="brand-logo-wrap">
              <img class="brand-logo-icon" src="assets/logo.png" alt="" width="40" height="40">
            </div>
            <div class="brand-text-wrap ms-2">
              <span class="brand-name">COURTLY</span>
              <span class="brand-badge">PRO ARENA</span>
            </div>
          </a>

          <!-- CENTER: Desktop Navigation Links -->
          <ul class="courtly-nav-menu d-none d-xl-flex align-items-center m-0 p-0 list-unstyled">
            ${navLinks.map(link => `
              <li class="nav-item">
                <a href="${link.href}" class="nav-link ${link.active ? 'active' : ''}">
                  <span class="nav-link-text">${link.label}</span>
                  ${link.active ? '<span class="nav-active-pill"></span>' : ''}
                </a>
              </li>
            `).join('')}
          </ul>

          <!-- RIGHT: Toggles & Profile Controls -->
          <div class="courtly-actions d-flex align-items-center">
            
            <!-- Direction Toggle (LTR/RTL) -->
            <button type="button" class="courtly-btn-icon" id="toggleDirectionBtn" title="Switch text direction (LTR / RTL)" aria-label="Toggle Direction">
              <i class="fa-solid ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'}" id="directionIcon" aria-hidden="true"></i>
            </button>

            <!-- Theme Toggle (Dark / Light) -->
            <button type="button" class="courtly-btn-icon" id="toggleThemeBtn" title="Toggle Dark / Light Mode" aria-label="Toggle Theme">
              <i class="fa-solid ${isDark ? 'fa-sun text-warning' : 'fa-moon text-primary'} theme-icon" id="themeIcon"></i>
            </button>

            <!-- Profile Dropdown -->
            <div class="courtly-profile-dropdown position-relative">
              <button type="button" class="courtly-profile-btn d-flex align-items-center" id="profileDropdownBtn" aria-expanded="false" aria-haspopup="true">
                <div class="avatar-wrap">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Player Avatar" class="profile-avatar" />
                  <span class="status-indicator"></span>
                </div>
                <span class="profile-name d-none d-md-inline ms-2">Player Hub</span>
                <i class="fa-solid fa-chevron-down dropdown-arrow ms-1"></i>
              </button>

              <!-- Profile Menu Popup -->
              <div class="courtly-dropdown-menu" id="profileMenu" role="menu">
                <div class="dropdown-header">
                  <span class="user-greeting">Welcome to Courtly</span>
                  <p class="user-email">guest.athlete@courtly.com</p>
                </div>
                <div class="dropdown-divider"></div>
                <a href="login.html" class="dropdown-item" role="menuitem">
                  <div class="item-icon-box"><i class="fa-solid fa-arrow-right-to-bracket"></i></div>
                  <div class="item-content">
                    <span class="item-title">Login</span>
                    <small class="item-subtitle">Access your court passes</small>
                  </div>
                </a>
                <a href="signup.html" class="dropdown-item" role="menuitem">
                  <div class="item-icon-box"><i class="fa-solid fa-user-plus"></i></div>
                  <div class="item-content">
                    <span class="item-title">Signup</span>
                    <small class="item-subtitle">Join community for ₹0 fee</small>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a href="admin/dashboard.html" class="dropdown-item" role="menuitem" id="adminDashboardLink">
                  <div class="item-icon-box admin-badge"><i class="fa-solid fa-shield-halved"></i></div>
                  <div class="item-content">
                    <span class="item-title">Admin Dashboard</span>
                    <small class="item-subtitle">Manage courts & fixtures</small>
                  </div>
                  <span class="badge-role">Staff</span>
                </a>
                <a href="user/dashboard.html" class="dropdown-item" role="menuitem" id="playerDashboardLink">
                  <div class="item-icon-box player-badge"><i class="fa-solid fa-trophy"></i></div>
                  <div class="item-content">
                    <span class="item-title">Player Dashboard</span>
                    <small class="item-subtitle">Scores, slots & matches</small>
                  </div>
                  <span class="badge-role player">Pro</span>
                </a>
              </div>
            </div>

            <!-- Hamburger Button (Mobile / Tablet) -->
            <button type="button" class="courtly-hamburger d-xl-none ms-2" id="hamburgerBtn" aria-label="Toggle navigation drawer" aria-expanded="false">
              <span class="bar bar-top"></span>
              <span class="bar bar-mid"></span>
              <span class="bar bar-bot"></span>
            </button>

          </div>
        </div>
      </nav>

      <!-- Mobile Offcanvas Navigation Drawer -->
      <div class="courtly-mobile-drawer" id="mobileDrawer" aria-hidden="true">
        <div class="mobile-drawer-backdrop" id="drawerBackdrop"></div>
        <div class="mobile-drawer-content">
          <div class="drawer-header d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <img class="brand-logo-icon" src="assets/logo.png" alt="" width="40" height="40">
              <div class="ms-2">
                <span class="brand-name">COURTLY</span>
                <span class="brand-badge">PRO ARENA</span>
              </div>
            </div>
            <button type="button" class="btn-close-drawer" id="closeDrawerBtn" aria-label="Close navigation">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div class="drawer-body">
            <ul class="mobile-nav-list list-unstyled m-0 p-0">
              ${navLinks.map(link => `
                <li class="mobile-nav-item">
                  <a href="${link.href}" class="mobile-nav-link ${link.active ? 'active' : ''}">
                    <span class="mobile-link-name">${link.label}</span>
                    <i class="fa-solid fa-angle-right mobile-arrow"></i>
                  </a>
                </li>
              `).join('')}
            </ul>

            <div class="mobile-drawer-stats">
              <div class="stat-pill">
                <span class="stat-num">12</span>
                <span class="stat-lbl">Courts Open</span>
              </div>
              <div class="stat-pill highlight">
                <span class="stat-num">BWF & ITTF</span>
                <span class="stat-lbl">Certified Arenas</span>
              </div>
            </div>

            <div class="mobile-cta-box mt-4">
              <a href="#live-courts" class="btn-courtly-primary w-100 mobile-book-btn">
                <span>Book Court Now</span>
                <i class="fa-solid fa-bolt ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize navbar event listeners
    initNavbarEvents();
  }

  // Handle Scroll state, dropdowns, mobile menu, theme & LTR toggling
  function initNavbarEvents() {
    const navbar = document.getElementById('courtlyNavbar');
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    const toggleDirectionBtn = document.getElementById('toggleDirectionBtn');
    const themeIcon = document.getElementById('themeIcon');
    const directionIcon = document.getElementById('directionIcon');

    // 1. Scroll-triggered glassmorphism
    function handleScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Profile Dropdown Toggle
    if (profileDropdownBtn && profileMenu) {
      profileDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileMenu.classList.contains('show');
        if (isOpen) {
          profileMenu.classList.remove('show');
          profileDropdownBtn.setAttribute('aria-expanded', 'false');
        } else {
          profileMenu.classList.add('show');
          profileDropdownBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!profileDropdownBtn.contains(e.target) && !profileMenu.contains(e.target)) {
          profileMenu.classList.remove('show');
          profileDropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 3. Mobile Navigation Drawer Controls
    function openDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Close mobile drawer when any link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // 4. Dark / Light Theme Toggle
    if (toggleThemeBtn) {
      toggleThemeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', nextTheme);
        document.documentElement.setAttribute('data-bs-theme', nextTheme);
        localStorage.setItem('courtly_theme', nextTheme);

        if (nextTheme === 'light') {
          themeIcon.className = 'fa-solid fa-moon text-primary theme-icon';
          showToastFeedback('Light mode activated');
        } else {
          themeIcon.className = 'fa-solid fa-sun text-warning theme-icon';
          showToastFeedback('Dark arena mode activated');
        }
      });
    }

    // 5. LTR / RTL Direction Toggle
    if (toggleDirectionBtn) {
      toggleDirectionBtn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

        document.documentElement.setAttribute('dir', nextDir);
        localStorage.setItem('courtly_direction', nextDir);

        if (directionIcon) {
          directionIcon.className = `fa-solid ${nextDir === 'rtl' ? 'fa-arrow-left' : 'fa-arrow-right'}`;
        }

        showToastFeedback(`Layout switched to ${nextDir.toUpperCase()}`);
      });
    }

    // Interactive feedback for Admin & Player links
    const adminLink = document.getElementById('adminDashboardLink');
    const playerLink = document.getElementById('playerDashboardLink');

    if (adminLink) {
      adminLink.addEventListener('click', () => {
        showToastFeedback('Opening Admin Arena Console...');
      });
    }

    if (playerLink) {
      playerLink.addEventListener('click', () => {
        showToastFeedback('Opening Player Space...');
      });
    }
  }

  // Toast feedback helper
  function showToastFeedback(message) {
    let toastContainer = document.getElementById('courtly-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'courtly-toast-container';
      toastContainer.className = 'courtly-toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'courtly-toast animate-slide-up';
    toast.innerHTML = `
      <div class="toast-content d-flex align-items-center">
        <i class="fa-solid fa-circle-check text-success me-2"></i>
        <span>${message}</span>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // Auto-render on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }

  // Expose global controller if needed
  window.CourtlyNavbar = {
    render: renderNavbar,
    showToast: showToastFeedback
  };
})();
