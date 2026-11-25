/**
 * COURTLY - Centralized Shared Site Data
 * Ensures consistency of membership plans, tournaments,
 * sports categories, entity pricing, and image URLs across all pages.
 */

const COURTLY_DATA = {
  // Brand Identity
  brand: {
    name: 'COURTLY',
    tagline: 'PRO ARENA',
    phone: '+1 (800) 555-COURT (2687)',
    email: 'support@courtlyarena.com',
    address: '104 Arena Boulevard, Sports District, Metro City',
    operatingHours: 'Open 24/7 (Night sessions fully lit)'
  },

  // Consistent Membership Plans (Single Source of Truth across all pages)
  membershipPlans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹499',
      numericPrice: 499,
      period: '/ month',
      popular: false,
      description: 'Your starting point for a more active and enjoyable playing routine.',
      hours: '4 court booking hours',
      benefits: [
        '4 court booking hours',
        'Standard booking access',
        'Basic player dashboard',
        'Community event updates'
      ],
      ctaText: 'Choose Starter'
    },
    {
      id: 'pro-athlete',
      name: 'Pro Athlete',
      price: '₹999',
      numericPrice: 999,
      period: '/ month',
      popular: true,
      badge: 'MOST POPULAR',
      description: 'For regular players who want more flexibility and better access.',
      hours: '10 court booking hours',
      benefits: [
        '10 court booking hours',
        'Priority booking access',
        'Tournament registration benefits',
        'Exclusive member offers'
      ],
      ctaText: 'Choose Pro Athlete'
    },
    {
      id: 'elite-player',
      name: 'Elite Player',
      price: '₹1,799',
      numericPrice: 1799,
      period: '/ month',
      popular: false,
      badge: 'VIP ACCESS',
      description: 'For dedicated players looking for a more premium playing experience.',
      hours: '20 court booking hours',
      benefits: [
        '20 court booking hours',
        'Premium booking access',
        'Special tournament benefits',
        'Exclusive member privileges'
      ],
      ctaText: 'Choose Elite'
    }
  ],

  // Consistent Sports Categories
  sports: {
    badminton: {
      name: 'Badminton',
      title: 'EVERY RALLY COUNTS.',
      heroTitle: 'OWN THE COURT.',
      speed: 'Up to 426 km/h',
      description: 'Experience fast-paced badminton in thoughtfully designed indoor courts with quality flooring, professional lighting and a comfortable playing environment.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
      highlights: [
        'Professional playing surfaces (BWF Synthetic & Maple Wood)',
        'Spacious indoor courts with 11m overhead clearance',
        'Quality asymmetric anti-glare 800 Lux LED lighting',
        'Dedicated singles and doubles reservation sessions'
      ]
    },
    tableTennis: {
      name: 'Table Tennis',
      title: 'PRECISION MEETS PASSION.',
      heroTitle: 'MASTER EVERY SPIN.',
      spin: '120 rev/sec',
      description: 'Sharpen your reflexes and enjoy every spin with quality table tennis facilities designed for casual matches and competitive play.',
      image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=85',
      highlights: [
        'Quality playing tables (ITTF Approved 25mm blue matte tops)',
        'Comfortable playing space (14m x 7m tournament boxes)',
        'Singles and doubles formats with automated multi-ball feeder robots',
        'Suitable for all skill levels from casual spin to pro league'
      ]
    }
  },

  // Consistent Tournaments Information
  tournaments: [
    {
      id: 'tourn-01',
      name: 'Badminton Open Championship',
      subtitle: 'Grand Slam Singles & Doubles',
      date: 'Dec 12, 2026',
      category: 'Badminton',
      entryFee: '₹1,200 / player',
      prizePool: '₹2,50,000',
      status: 'Open (8 Slots Left)',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'tourn-02',
      name: 'Table Tennis Challenge',
      subtitle: 'Speed Spin Cup 2026',
      date: 'Dec 18, 2026',
      category: 'Table Tennis',
      entryFee: '₹800 / player',
      prizePool: '₹1,50,000',
      status: 'Filling Fast',
      image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'tourn-03',
      name: 'Weekend Doubles League',
      subtitle: 'Smash & Rally Clash',
      date: 'Every Saturday',
      category: 'Badminton',
      entryFee: '₹600 / team',
      prizePool: '₹50,000 weekly',
      status: 'Weekly Roster',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80'
    }
  ],

  // Consistent Player Personas (Home 2 Section 4: Who Is It For?)
  playerTypes: {
    beginners: {
      id: 'beginners',
      badge: '01 • FOUNDATION',
      title: 'BEGINNERS',
      tagline: 'Start with the basics, enjoy friendly matches and discover the excitement of a new sport.',
      recommendedSport: 'Badminton & Table Tennis Basics',
      suggestedExperience: 'Introductory Clinic & Racket Orientation',
      sessionFormat: '60-min guided friendly rallies with coach tips',
      courtType: 'Court 01 Pro (Soft Shock-Absorption)',
      suitableMembership: 'Starter (₹499/mo)',
      icon: 'fa-solid fa-seedling',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      cta: 'Start Your Beginner Journey'
    },
    casual: {
      id: 'casual',
      badge: '02 • RECREATION',
      title: 'CASUAL PLAYERS',
      tagline: 'Enjoy relaxed sessions with friends and make every game part of your active routine.',
      recommendedSport: 'Weekend Doubles & Social Rallies',
      suggestedExperience: 'Social Roster & Open Court Play',
      sessionFormat: 'Evening pickup games & friendly score-free rallies',
      courtType: 'Table Tennis Spin Arena & Badminton Court 02',
      suitableMembership: 'Starter or Pro Athlete',
      icon: 'fa-solid fa-heart-pulse',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      cta: 'Book a Casual Session'
    },
    regular: {
      id: 'regular',
      badge: '03 • CONSISTENCY',
      title: 'REGULAR PLAYERS',
      tagline: 'Build consistency, improve your skills and enjoy convenient court access throughout the week.',
      recommendedSport: 'Competitive Singles & High-Pace Drills',
      suggestedExperience: 'Tiered Ladder League & Weekly Reservation',
      sessionFormat: '90-min recurring reserved court times',
      courtType: 'Court 02 Master (BWF Synthetic Mat)',
      suitableMembership: 'Pro Athlete (₹999/mo)',
      icon: 'fa-solid fa-dumbbell',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      cta: 'Explore Regular Passes'
    },
    competitive: {
      id: 'competitive',
      badge: '04 • MASTERY',
      title: 'COMPETITIVE PLAYERS',
      tagline: 'Challenge yourself through tournaments, competitive matches and skill-focused sessions.',
      recommendedSport: 'Grand Slam Circuits & Ranked Matchplay',
      suggestedExperience: 'Championship Tournaments & AI Hawk-Eye Analytics',
      sessionFormat: 'Tournament seeding & speed-radar match play',
      courtType: 'Olympic Grade BWF Arena & ITTF Master Table',
      suitableMembership: 'Elite Player (₹1,799/mo)',
      icon: 'fa-solid fa-trophy',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      cta: 'Join Competitive Circuit'
    }
  },

  // Centralized Image Reference Repository
  images: {
    heroActionBadminton: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    heroArenaFacility: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=85',
    tableTennisTable: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=85',
    tableTennisPaddle: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1200&q=85',
    equipmentCloseUp: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=1200&q=85',
    trialFacilityBackdrop: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80',
    finalCtaBackdrop: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    aboutHeroArena: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1920&q=85',
    aboutStoryMain: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85',
    aboutStoryOverlap: 'https://images.unsplash.com/photo-1593787406025-83e43ba29100?auto=format&fit=crop&w=500&q=80',
    aboutMission: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85',
    aboutVision: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=900&q=85',
    aboutFacilityWide: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1600&q=85',
    aboutImpactBg: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1920&q=80',
    avatars: {
      marcus: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      elena: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      devon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      sophia: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      liam: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      priya: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
    }
  },

  // About Page - Team Members (consistent across all pages)
  team: [
    {
      id: 'alex-morgan',
      name: 'Alex Morgan',
      role: 'Club Director',
      bio: 'Guides the club\'s vision and works to create an outstanding sports environment for every player.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 'daniel-carter',
      name: 'Daniel Carter',
      role: 'Sports Operations Manager',
      bio: 'Oversees daily facility operations and ensures every court is ready for a great playing experience.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=85',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 'sophia-williams',
      name: 'Sophia Williams',
      role: 'Community & Events Manager',
      bio: 'Builds player connections and coordinates tournaments, events and community activities.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 'ryan-mitchell',
      name: 'Ryan Mitchell',
      role: 'Head Sports Coach',
      bio: 'Encourages player development and promotes a positive, skill-focused sporting environment.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=85',
      social: { linkedin: '#', twitter: '#' }
    }
  ],

  // About Page - Milestones
  milestones: [
    { year: '2022', title: 'THE IDEA', desc: 'The vision of creating a welcoming indoor sports destination begins.', icon: 'fa-solid fa-lightbulb' },
    { year: '2023', title: 'THE FOUNDATION', desc: 'Planning begins around quality courts, better facilities and player-friendly experiences.', icon: 'fa-solid fa-drafting-compass' },
    { year: '2024', title: 'THE FIRST RALLY', desc: 'The sports facility concept takes shape with badminton and table tennis experiences.', icon: 'fa-solid fa-table-tennis-paddle-ball' },
    { year: '2025', title: 'GROWING TOGETHER', desc: 'More players, community activities and sports experiences become part of the journey.', icon: 'fa-solid fa-users' },
    { year: '2026', title: 'THE NEXT CHAPTER', desc: 'Expanding the digital experience with convenient online bookings, memberships and tournament participation.', icon: 'fa-solid fa-rocket' }
  ],

  // About Page - Testimonials (distinct from Home 1 & Home 2)
  aboutTestimonials: [
    {
      name: 'Ethan Brooks',
      sport: 'Badminton',
      rating: 5,
      review: 'The courts are well maintained and the booking experience makes planning my weekly games so convenient.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Olivia Parker',
      sport: 'Table Tennis',
      rating: 5,
      review: 'A welcoming environment with great facilities. I enjoy coming here for regular matches with friends.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Noah Bennett',
      sport: 'Badminton',
      rating: 5,
      review: 'Great place to practise, meet other players and enjoy competitive matches. The overall experience is excellent.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ava Thompson',
      sport: 'Table Tennis',
      rating: 5,
      review: 'I love the atmosphere and the convenience of finding a suitable playing session. It makes staying active enjoyable.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    }
  ],

  // Shared Statistics (consistent across all pages)
  stats: {
    playerSessions: 500,
    premiumCourts: 4,
    sportsCategories: 2,
    communityEvents: 20
  },

  // Centralized Courts & Arenas Data (INR pricing consistent across Home 1 & Court Page)
  courts: [
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
      tags: ['Professional Flooring', 'Quality Lighting', 'Comfortable Playing Space'],
      specs: ['800 Lux LED', 'Climate 21°C', 'BWF Maple Wood']
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
      tags: ['Professional Flooring', 'Quality Lighting', 'Equipment Available'],
      specs: ['Live Scoreboard', 'Hawk-Eye AI', 'BWF Synthetic Mat']
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
      tags: ['Well-Maintained Facility', 'Comfortable Playing Space', 'Quality Lighting'],
      specs: ['25mm Blue Top', '14m x 7m Box', 'ITTF Approved']
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
      tags: ['Equipment Available', 'Well-Maintained Facility', 'Comfortable Playing Space'],
      specs: ['Auto Ball Feeder', 'Spin Drills', 'Pro Paddles']
    }
  ]
};

// Expose globally
if (typeof window !== 'undefined') {
  window.COURTLY_DATA = COURTLY_DATA;
}
