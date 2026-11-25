/**
 * COURTLY - Centralized Contact Configuration
 * Reuses established brand info from COURTLY_DATA (site-data.js) where available.
 * Edit this file to configure verified address, phone, email, office timings,
 * social media URLs, and map embed coordinates.
 *
 * ─────────────────────────────────────────────────────────────────
 * DEMO VALUES: All URLs marked [DEMO] are sample/placeholder values.
 * Replace them with actual COURTLY club details before going live.
 * ─────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  const sharedBrand = (typeof window !== 'undefined' && window.COURTLY_DATA && window.COURTLY_DATA.brand)
    ? window.COURTLY_DATA.brand
    : {};

  const CONTACT_CONFIG = {
    clubName: sharedBrand.name || 'COURTLY',
    tagline: sharedBrand.tagline || 'PRO ARENA',

    // ─── Address ───────────────────────────────────────────────────
    // [DEMO] Replace with the verified COURTLY club postal address.
    address: 'Marina Beach, Chennai, Tamil Nadu, India',
    addressIsPlaceholder: true, // Set to false once a real address is confirmed

    // ─── Phone & Email ─────────────────────────────────────────────
    phoneDisplay: sharedBrand.phone || '+91 98765 43210',
    phoneHref: 'tel:+919876543210', // Update with verified number before launch

    emailDisplay: sharedBrand.email || 'support@courtlyarena.com',
    emailHref: 'mailto:support@courtlyarena.com',

    // ─── Office Timings ────────────────────────────────────────────
    officeTimingsNote: 'Please contact the club before visiting to confirm timings.',
    officeTimings: [
      { day: 'Monday',    hours: '09:00 AM – 06:00 PM', dayIndex: 1 },
      { day: 'Tuesday',   hours: '09:00 AM – 06:00 PM', dayIndex: 2 },
      { day: 'Wednesday', hours: '09:00 AM – 06:00 PM', dayIndex: 3 },
      { day: 'Thursday',  hours: '09:00 AM – 06:00 PM', dayIndex: 4 },
      { day: 'Friday',    hours: '09:00 AM – 06:00 PM', dayIndex: 5 },
      { day: 'Saturday',  hours: '10:00 AM – 04:00 PM', dayIndex: 6 },
      { day: 'Sunday',    hours: 'By Appointment',      dayIndex: 0 }
    ],

    // ─── Map Configuration ─────────────────────────────────────────
    // [DEMO] Sample location: Marina Beach, Chennai.
    // Replace embedUrl and directionsUrl with the real COURTLY venue coordinates.
    mapConfig: {
      // Google Maps embed — displays directly inside an <iframe>
      embedUrl: 'https://maps.google.com/maps?q=Marina%20Beach%2C%20Chennai%2C%20Tamil%20Nadu%2C%20India&output=embed',

      // Opens Google Maps in a new tab for turn-by-turn directions
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Marina%20Beach%2C%20Chennai%2C%20Tamil%20Nadu%2C%20India',

      // Human-readable display label shown beside the map
      displayAddress: 'Marina Beach, Chennai, Tamil Nadu, India',

      // Label shown to indicate this is a demo location
      sampleLabel: 'Sample Location – Replace with actual club address',

      placeholderMessage: 'Configure a verified map embed URL in js/contact-data.js.'
    },

    // ─── Social Media Profiles ─────────────────────────────────────
    // [DEMO] Platform homepage URLs used as temporary demo links.
    // Replace each url with the actual COURTLY profile URL before launch.
    socialProfiles: [
      {
        id: 'instagram',
        name: 'Instagram',
        icon: 'fa-brands fa-instagram',
        url: 'https://www.instagram.com/', // [DEMO] Replace with actual profile
        handle: '@courtlyarena',
        title: 'Follow Our Moments',
        description: 'Discover sports highlights, court moments, and community updates.',
        btnLabel: 'Visit Instagram',
        accentClass: 'soc-instagram'
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: 'fa-brands fa-facebook-f',
        url: 'https://www.facebook.com/', // [DEMO] Replace with actual profile
        handle: 'COURTLY Arena',
        title: 'Join Our Community',
        description: 'Stay connected with club news, events, and player activities.',
        btnLabel: 'Visit Facebook',
        accentClass: 'soc-facebook'
      },
      {
        id: 'youtube',
        name: 'YouTube',
        icon: 'fa-brands fa-youtube',
        url: 'https://www.youtube.com/', // [DEMO] Replace with actual channel
        handle: 'COURTLY TV',
        title: 'Watch the Action',
        description: 'Explore sports highlights, training inspiration, and match moments.',
        btnLabel: 'Visit YouTube',
        accentClass: 'soc-youtube'
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: 'fa-brands fa-linkedin-in',
        url: 'https://www.linkedin.com/', // [DEMO] Replace with actual page
        handle: 'COURTLY Sports',
        title: 'Connect With Us',
        description: 'Follow our updates and connect with the COURTLY community.',
        btnLabel: 'Visit LinkedIn',
        accentClass: 'soc-linkedin'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.COURTLY_CONTACT_DATA = CONTACT_CONFIG;
  }
})();
