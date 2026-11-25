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

  // Consistent Membership Plans (as strictly required)
  membershipPlans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹499',
      period: '/ month',
      popular: false,
      description: 'Ideal for beginners and recreational players seeking consistent court time.',
      hours: '4 court booking hours',
      benefits: [
        '4 court booking hours',
        'Standard booking access (7 days advance)',
        'Basic player dashboard & match records',
        'Community event updates & open mixers',
        'Locker room & shower access'
      ],
      ctaText: 'Choose Starter'
    },
    {
      id: 'pro-athlete',
      name: 'Pro Athlete',
      price: '₹999',
      period: '/ month',
      popular: true,
      badge: 'MOST POPULAR',
      description: 'Engineered for dedicated athletes training weekly and entering competitive leagues.',
      hours: '10 court booking hours',
      benefits: [
        '10 court booking hours',
        'Priority booking access (14 days advance)',
        'Tournament registration benefits & seeded entry',
        'Exclusive member offers & 2 guest passes/mo',
        'Free high-grade racket hire & shuttle packs',
        '1-click free session cancellation up to 2 hrs'
      ],
      ctaText: 'Choose Pro Athlete'
    },
    {
      id: 'elite-player',
      name: 'Elite Player',
      price: '₹1,799',
      period: '/ month',
      popular: false,
      badge: 'VIP ACCESS',
      description: 'The ultimate athletic pass with full tournament entries, permanent lockers, and telemetry.',
      hours: '20 court booking hours',
      benefits: [
        '20 court booking hours',
        'Premium booking access (30 days VIP window)',
        'Special tournament benefits (all entry fees included)',
        'Exclusive member privileges & private locker',
        'Hawk-Eye AI match analytics & speed telemetry',
        'Dedicated arena concierge & coaching clinics'
      ],
      ctaText: 'Choose Elite Player'
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
    avatars: {
      marcus: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      elena: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      devon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      sophia: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      liam: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      priya: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
    }
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.COURTLY_DATA = COURTLY_DATA;
}
