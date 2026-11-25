# COURTLY - Reusable Components Documentation

This directory documents the reusable components designed for the **COURTLY Badminton & Table Tennis Court Booking Platform**.

## 1. Reusable Navbar (`js/navbar.js`)

The navigation bar is encapsulated as a standalone vanilla JavaScript component that mounts dynamically or hydrates an element with the `id="app-navbar"` attribute.

### Key Features:
- **Sticky Glassmorphism**: Starts transparent over the hero, smoothly transforms on scroll with `backdrop-filter: blur(16px)` and a subtle ambient sports glow.
- **Brand Identity**: Custom SVG vector icon fusing a shuttlecock silhouette with a table tennis paddle and neon court grid, paired with bold *Sora* branding.
- **Navigation Links**:
  - Home 1 (Active)
  - Home 2
  - About
  - Court
  - Plans
  - Blog
  - Contact
- **Dynamic Controls**:
  - **LTR / RTL Toggle**: Switches the document text direction (`dir="ltr"` / `dir="rtl"`) with live layout inversion and saves the state to `localStorage.getItem('courtly_direction')`.
  - **Dark / Light Mode Toggle**: Seamlessly switches `data-theme="dark"` / `data-theme="light"` with persistent state in `localStorage.getItem('courtly_theme')`.
  - **User Profile Dropdown**: Contains direct access to Login, Signup, Admin Dashboard, and Player Dashboard modals/pages with status badges.
- **Mobile Offcanvas Navigation**: Fullscreen or sleek drawer experience with backdrop blur, body scroll lock, smooth touch gestures, and auto-close upon navigation item selection.

### Usage in Any Future Page:
```html
<!-- Include container at the top of <body> -->
<header id="app-navbar" class="courtly-navbar-wrapper"></header>

<!-- Include script before main.js -->
<script src="js/navbar.js"></script>
```

---

## 2. Reusable Footer (`js/footer.js`)

The footer component is encapsulated within `js/footer.js` and renders into `#app-footer`.

### Key Features:
- **Brand & Mission**: Logo, court booking tagline, and quick social links with hover micro-animations.
- **Categorized Directory Links**:
  - Quick Pages (Home 1, Home 2, About, Court, Plans, Blog, Contact)
  - Sports & Arenas (Badminton BWF Courts, Table Tennis ITTF Arenas, Coaching Academy, Equipment Rental)
  - Direct Booking & Memberships (Instant Booking, League Registration, VIP Passes)
  - Contact & Venue Details (Address, Phone, Email, Operating Hours)
- **Interactive Newsletter Subscription**: Client-side validated email input with instant animated toast feedback.
- **Legal & Rights**: Copyright notices, Privacy Policy, Terms of Service, and Cookie Preferences.

### Usage in Any Future Page:
```html
<!-- Include container at the bottom of <body> -->
<footer id="app-footer" class="courtly-footer-wrapper"></footer>

<!-- Include script -->
<script src="js/footer.js"></script>
```
