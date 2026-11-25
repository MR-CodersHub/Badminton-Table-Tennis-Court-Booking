/**
 * COURTLY - Centralized Blog Data Repository
 * Single source of truth for all 6 editorial articles, authors, categories,
 * related articles, search keywords, and full structured article content.
 */

(function () {
  'use strict';

  const AUTHORS = {
    alex: {
      name: 'Alex Morgan',
      role: 'Club Director',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=85',
      bio: 'Club Director at COURTLY. Guides the club’s vision, champions accessible indoor court experiences, and writes about badminton strategy and sports community culture.'
    },
    ryan: {
      name: 'Ryan Mitchell',
      role: 'Head Sports Coach',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=85',
      bio: 'Head Sports Coach at COURTLY. Specializes in racket mechanics, table tennis spin development, and helping players transition smoothly into competitive play.'
    },
    sophia: {
      name: 'Sophia Williams',
      role: 'Community & Events Manager',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=85',
      bio: 'Community & Events Manager at COURTLY. Coordinates weekly mixers, club ladders, and active lifestyle programs for badminton and table tennis enthusiasts.'
    },
    daniel: {
      name: 'Daniel Carter',
      role: 'Sports Operations Manager',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=85',
      bio: 'Sports Operations Manager at COURTLY. Oversees court standards and works closely with regular players to structure effective weekly practice routines.'
    }
  };

  const BLOG_ARTICLES = [
    {
      id: 'blog-1',
      slug: 'badminton-tips',
      title: '7 Badminton Tips to Improve Your Game and Play Smarter',
      excerpt: 'Build better footwork, improve your racket control, and develop smarter strategies to take your badminton game to the next level.',
      featuredImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Badminton player performing an athletic jump smash on an indoor court',
      author: AUTHORS.alex,
      date: 'November 18, 2026',
      category: 'Badminton',
      readingTime: '6 min read',
      keywords: ['badminton', 'footwork', 'racket control', 'serve', 'stamina', 'shot selection', 'strategy'],
      relatedIds: ['blog-4', 'blog-6', 'blog-5'],
      sections: [
        {
          type: 'paragraph',
          text: 'Badminton rewards players who combine quick movement with calm decision-making. Many recreational players focus almost exclusively on hitting harder, yet matches are more often decided by positioning, shot variety, and consistency. Whether you are rallying in weekend doubles or working on singles court coverage, refining seven core fundamentals can transform how effortlessly you play.'
        },
        {
          type: 'heading',
          text: '1. Why Badminton Fundamentals Matter'
        },
        {
          type: 'paragraph',
          text: 'Every deceptive net drop or explosive smash rests on basic mechanics. When your grip, stance, and recovery step are automatic, you gain precious split-seconds to read your opponent instead of rushing your swing. Investing time in fundamentals prevents unforced errors under pressure and protects your joints during long indoor sessions.'
        },
        {
          type: 'heading',
          text: '2. Improve Footwork and Court Movement'
        },
        {
          type: 'paragraph',
          text: 'Efficient footwork is the fastest way to feel twice as quick on court without sprinting harder. Always start with a light split-step just as your opponent makes contact with the shuttlecock. Use a chasse step or lunging stride toward the corners, keeping your non-racket arm up for balance, and recover immediately toward the center base rather than admiring your shot.'
        },
        {
          type: 'tip',
          title: 'Quick Court Drill',
          text: 'Spend five minutes before each game doing shadow footwork to all four corners—front-left, front-right, back-left, and back-right—returning to the center T after every imaginary strike.'
        },
        {
          type: 'heading',
          text: '3. Develop Relaxed Racket Control'
        },
        {
          type: 'paragraph',
          text: 'A common mistake among developing players is squeezing the handle too tightly between shots. Hold your racket with a relaxed forehand or backhand grip, tightening your fingers only at the instant of impact. This finger-power whip generates sharper clears, tighter net tumbles, and cleaner defensive blocks.'
        },
        {
          type: 'heading',
          text: '4. Practise Your Serves Consistently'
        },
        {
          type: 'paragraph',
          text: 'The serve is the only stroke in badminton over which you have complete control. In doubles, aim for a low backhand serve that skims just over the tape to deny your opponent an easy downward attack. In singles, mix deep high serves to the back tramline with occasional flick serves to keep receivers honest.'
        },
        {
          type: 'heading',
          text: '5. Make Smarter Shot Selections'
        },
        {
          type: 'list',
          items: [
            'Play to open space rather than hitting straight back to a balanced opponent.',
            'Use high defensive clears when stretched out of position to buy recovery time.',
            'Follow a steep drop shot with forward readiness at the net to intercept weak lifts.',
            'Vary pace between fast drives and soft blocks to disrupt your opponent’s rhythm.'
          ]
        },
        {
          type: 'heading',
          text: '6. Build Match Stamina & Consistency'
        },
        {
          type: 'paragraph',
          text: 'Late-game fatigue causes footwork to slow down and shuttles to drift wide. Combine steady multi-shuttle rally drills with controlled breathing between points. Above all, stay consistent during practice—ten focused minutes on clean cross-court drops beats fifty rushed swings without a target.'
        },
        {
          type: 'heading',
          text: 'Final Practical Takeaways'
        },
        {
          type: 'paragraph',
          text: 'Pick just two habits to focus on during your next court booking—such as split-stepping before every return and relaxing your grip at the net. Over a few weeks at COURTLY, those deliberate habits will turn into natural instincts and smarter, more enjoyable matches.'
        }
      ]
    },
    {
      id: 'blog-2',
      slug: 'table-tennis-spin',
      title: 'Master the Spin: A Beginner\'s Guide to Table Tennis',
      excerpt: 'Discover how spin, timing, grip, and consistent practice can help you become a more confident table tennis player.',
      featuredImage: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Table tennis player preparing a spin shot at a blue competition table',
      author: AUTHORS.ryan,
      date: 'November 14, 2026',
      category: 'Table Tennis',
      readingTime: '6 min read',
      keywords: ['table tennis', 'spin', 'topspin', 'backspin', 'grip', 'timing', 'drills'],
      relatedIds: ['blog-4', 'blog-3', 'blog-6'],
      sections: [
        {
          type: 'paragraph',
          text: 'Few sights in indoor sport are as satisfying as watching a table tennis ball curve sharply and dip onto the edge of the table. While beginners often start by simply pushing the ball back over the net, learning how spin works unlocks a completely new dimension of control, rhythm, and confidence.'
        },
        {
          type: 'heading',
          text: 'Understanding How Spin Works'
        },
        {
          type: 'paragraph',
          text: 'Spin is created by brushing the ball with the rubber surface of your paddle rather than hitting it flatly head-on. The angle of your blade and the direction of your swing determine how the ball rotates in the air and how it rebounds off your opponent’s table and bat.'
        },
        {
          type: 'heading',
          text: 'Starting with the Shakehand Grip'
        },
        {
          type: 'paragraph',
          text: 'Most beginners thrive with the classic shakehand grip. Hold the handle naturally as if shaking hands, placing your index finger along the bottom edge of the backhand rubber and your thumb lightly on the forehand side. Keep your wrist loose so you can adjust blade angles smoothly between forehand and backhand strokes.'
        },
        {
          type: 'heading',
          text: 'Topspin vs. Backspin Essentials'
        },
        {
          type: 'list',
          items: [
            'Topspin: Brush upward and forward from low to high. The ball arcs over the net and dips quickly onto the table, kicking forward after the bounce.',
            'Backspin (Underspin): Open the paddle face slightly and slice downward beneath the ball. Backspin slows the rally and forces opponents to lift the ball carefully.',
            'Reading Opponent Spin: Watch your opponent’s bat motion at contact—an upward brush means topspin, while a downward chop signals backspin.'
          ]
        },
        {
          type: 'heading',
          text: 'Improving Timing, Footwork & Positioning'
        },
        {
          type: 'paragraph',
          text: 'Good spin relies on meeting the ball at the top of its bounce rather than reaching too early or letting it drop behind you. Stand about an arm’s length from the end line with knees slightly bent and weight on the balls of your feet. Use small side-to-side shuffles instead of leaning sideways with your upper body.'
        },
        {
          type: 'tip',
          title: 'Coach Tip for Beginners',
          text: 'Practise 30 consecutive forehand-to-forehand counter-drives at a steady pace before adding heavy topspin. Consistent contact builds the touch required for reliable spin.'
        },
        {
          type: 'heading',
          text: 'Common Mistakes to Avoid'
        },
        {
          type: 'paragraph',
          text: 'Avoid swinging exclusively from your shoulder with a stiff wrist, and resist the urge to hit every return at maximum power. Trying to smash a heavy backspin push flatly into the net is one of the most common early errors; instead, brush upward gently to lift the ball cleanly.'
        },
        {
          type: 'heading',
          text: 'Next Steps on the Table'
        },
        {
          type: 'paragraph',
          text: 'Book a dedicated table tennis session with a training partner or use a multi-ball feeder station to repeat one stroke at a time. With focused practice on grip, contact timing, and gentle brushing motion, your spin rallies will become sharper every week.'
        }
      ]
    },
    {
      id: 'blog-3',
      slug: 'indoor-sports-fitness',
      title: 'Why Indoor Sports Are Great for Your Everyday Fitness',
      excerpt: 'Discover how regular badminton and table tennis sessions can support an active lifestyle, improve coordination, and make fitness more enjoyable.',
      featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Woman doing a floor exercise in a bright indoor fitness studio',
      author: AUTHORS.sophia,
      date: 'November 10, 2026',
      category: 'Fitness',
      readingTime: '5 min read',
      keywords: ['fitness', 'indoor sports', 'active lifestyle', 'coordination', 'stamina', 'badminton', 'table tennis'],
      relatedIds: ['blog-5', 'blog-4', 'blog-1'],
      sections: [
        {
          type: 'paragraph',
          text: 'Staying active is much easier when your workout feels like play rather than a chore. Indoor racket sports such as badminton and table tennis offer a refreshing alternative to repetitive treadmill miles—combining brisk movement, mental focus, and social energy in a comfortable weather-proof environment.'
        },
        {
          type: 'heading',
          text: 'The Joy of Staying Physically Active'
        },
        {
          type: 'paragraph',
          text: 'Consistency is the secret behind any active routine. When you look forward to meeting friends for an hour on court, showing up twice or three times a week feels natural. Climate-controlled indoor halls mean rain, humidity, or late evening hours never derail your schedule.'
        },
        {
          type: 'heading',
          text: 'How Badminton Supports Movement & Stamina'
        },
        {
          type: 'paragraph',
          text: 'A lively badminton rally keeps you moving in short, dynamic bursts—lunging forward for net shots, pivoting laterally, and recovering smoothly to center court. Over a 45- to 60-minute session, those natural intervals challenge your agility, leg endurance, and cardiovascular stamina while staying engaging from the first serve to match point.'
        },
        {
          type: 'heading',
          text: 'How Table Tennis Sharpens Coordination & Reflexes'
        },
        {
          type: 'paragraph',
          text: 'Table tennis challenges your brain and body simultaneously. Tracking a fast-moving ball across a compact table builds hand-eye coordination, visual reaction speed, and quick foot adjustments. Because impact forces are gentle, table tennis is also approachable for players across many age groups and fitness backgrounds.'
        },
        {
          type: 'heading',
          text: 'Building a Sustainable Weekly Routine'
        },
        {
          type: 'list',
          items: [
            'Start with two 60-minute sessions per week and gradually increase intensity as your comfort grows.',
            'Warm up with 5–8 minutes of light mobility work for ankles, shoulders, and wrists before stepping onto the court.',
            'Pair high-tempo badminton days with precision table tennis sessions for variety.',
            'Keep water nearby and allow adequate rest days between demanding matches.'
          ]
        },
        {
          type: 'tip',
          title: 'Active Recovery Reminder',
          text: 'Always cool down with gentle calf, hamstring, and forearm stretches after your match so you feel fresh for your next session.'
        },
        {
          type: 'heading',
          text: 'Final Thoughts'
        },
        {
          type: 'paragraph',
          text: 'Whether your goal is staying energetic after work, improving agility, or simply spending more time moving with friends, indoor sports offer a balanced, rewarding way to keep active all year round.'
        }
      ]
    },
    {
      id: 'blog-4',
      slug: 'smarter-training-routine',
      title: 'From Beginner to Better Player: Build a Smarter Training Routine',
      excerpt: 'A practical guide to creating a consistent training routine, setting achievable goals, and developing your sports skills step by step.',
      featuredImage: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Player practising racket skills with structured drills',
      author: AUTHORS.daniel,
      date: 'November 05, 2026',
      category: 'Training',
      readingTime: '6 min read',
      keywords: ['training', 'routine', 'goals', 'practice', 'drills', 'progress', 'beginner'],
      relatedIds: ['blog-1', 'blog-2', 'blog-6'],
      sections: [
        {
          type: 'paragraph',
          text: 'Playing casual games every week is great fun, yet many players eventually hit a plateau where their shots feel stuck at the same level. Breaking through that plateau rarely requires training like a full-time professional—it simply requires adding a bit of structure to the court time you already have.'
        },
        {
          type: 'heading',
          text: 'Assess Your Current Skill Level'
        },
        {
          type: 'paragraph',
          text: 'Start by observing your last two matches honestly. Are you losing points because of rushed serves, late footwork to the backhand corner, or inconsistent returns under pressure? Identifying one or two clear bottlenecks gives every practice session a specific purpose.'
        },
        {
          type: 'heading',
          text: 'Set Realistic, Actionable Goals'
        },
        {
          type: 'paragraph',
          text: 'Instead of vague goals like "get better at badminton," choose measurable session targets—such as landing 8 out of 10 low serves cleanly or maintaining a 20-shot topspin rally in table tennis. Small, achievable wins keep motivation high week after week.'
        },
        {
          type: 'heading',
          text: 'A Simple 60-Minute Practice Structure'
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Minutes 0–10: Dynamic warm-up, shadow footwork, and gentle rally touch.',
            'Minutes 10–25: Focused skill block on one priority technique (e.g., net drops or backhand pushes).',
            'Minutes 25–40: Controlled pressure drills with a partner (serve-and-third-shot sequences).',
            'Minutes 40–60: Matchplay games where you actively apply the skill you just practised.'
          ]
        },
        {
          type: 'heading',
          text: 'Learn from Mistakes & Track Progress'
        },
        {
          type: 'paragraph',
          text: 'Every missed shot carries useful feedback. Notice whether the shuttle or ball missed long, wide, or into the net, and adjust your contact height or racket angle on the very next rep. Jotting down two quick notes in your phone after each session helps you see real improvement over a month.'
        },
        {
          type: 'tip',
          title: 'Consistency Beats Intensity',
          text: 'Two focused 60-minute sessions per week consistently outperform one exhausting three-hour marathon once a month.'
        },
        {
          type: 'heading',
          text: 'Final Training Recommendations'
        },
        {
          type: 'paragraph',
          text: 'Pair structured drill partners with friendly match days so practice never feels rigid. With a clear weekly rhythm and patient repetition, you will notice calmer footwork, cleaner strikes, and stronger confidence across every match.'
        }
      ]
    },
    {
      id: 'blog-5',
      slug: 'sports-community',
      title: 'More Than a Match: The Power of Playing Sports Together',
      excerpt: 'Explore how friendly matches, shared experiences, and sports communities make every game more memorable.',
      featuredImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Group of players sharing a friendly court session',
      author: AUTHORS.alex,
      date: 'October 29, 2026',
      category: 'Community',
      readingTime: '5 min read',
      keywords: ['community', 'doubles', 'teamwork', 'social', 'events', 'friends', 'sportsmanship'],
      relatedIds: ['blog-3', 'blog-6', 'blog-1'],
      sections: [
        {
          type: 'paragraph',
          text: 'Think back to your favourite sports memory. Chances are it was not just about the final score—it was about the laughter after an improbable net-cord bounce, the high-five with a doubles partner, or the post-match chat courtside. Great facilities bring players through the door, but community is what makes them feel at home.'
        },
        {
          type: 'heading',
          text: 'Why Sports Communities Matter'
        },
        {
          type: 'paragraph',
          text: 'In busy cities, finding genuine spaces to connect offline is increasingly rare. A welcoming sports club turns an ordinary Tuesday evening into an anchor point of your week—a place where people of different professions, ages, and backgrounds meet purely through a shared love of the game.'
        },
        {
          type: 'heading',
          text: 'Playing with New Partners & Opponents'
        },
        {
          type: 'paragraph',
          text: 'Stepping onto a court with someone new pushes your adaptability in the best way. Different players bring different tempos—some love fast flat drives, others rely on patient clears or deceptive spin. Rotating partners during open social sessions builds confidence and accelerates learning.'
        },
        {
          type: 'heading',
          text: 'Friendly Matches, Teamwork & Learning Together'
        },
        {
          type: 'list',
          items: [
            'Communicate clearly with your doubles partner on who takes middle shots and front-back rotations.',
            'Encourage good rallies on both sides of the net to keep matches upbeat and respectful.',
            'Ask experienced club regulars for quick tips on grip or serve placement after games.',
            'Join weekend social leagues to experience light competition without pressure.'
          ]
        },
        {
          type: 'heading',
          text: 'Creating a Welcoming Environment for Everyone'
        },
        {
          type: 'paragraph',
          text: 'A thriving community welcomes first-time beginners just as warmly as seasoned league players. Offering a friendly greeting, calling lines fairly, and sharing court space graciously ensures everyone leaves the arena energized and eager to return.'
        },
        {
          type: 'heading',
          text: 'Be Part of the Next Rally'
        },
        {
          type: 'paragraph',
          text: 'Whether you arrive with a regular group or book a trial session solo, COURTLY is built to connect players who love badminton and table tennis. Bring your energy, meet new teammates, and enjoy every rally together.'
        }
      ]
    },
    {
      id: 'blog-6',
      slug: 'first-sports-tournament',
      title: 'Your First Sports Tournament: How to Prepare with Confidence',
      excerpt: 'Getting ready for your first tournament? Learn how to prepare, practise, manage match-day nerves, and enjoy the experience.',
      featuredImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=85',
      coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Indoor tournament court ready for competitive matchplay',
      author: AUTHORS.ryan,
      date: 'October 22, 2026',
      category: 'Tournaments',
      readingTime: '6 min read',
      keywords: ['tournament', 'competition', 'preparation', 'warm-up', 'nerves', 'rules', 'sportsmanship'],
      relatedIds: ['blog-1', 'blog-2', 'blog-4'],
      sections: [
        {
          type: 'paragraph',
          text: 'Entering your first badminton or table tennis tournament is an exciting milestone. Even if you usually play friendly club games, stepping into an organized bracket brings a unique buzz—crisp court lines, focused opponents, and the thrill of testing your skills under real match conditions.'
        },
        {
          type: 'heading',
          text: 'Understand the Tournament Format & Rules'
        },
        {
          type: 'paragraph',
          text: 'Before match day, review the event format—whether it uses group stages followed by knockouts or a straight elimination draw. Double-check scoring rules (such as 21-point rally scoring in badminton or 11-point sets in table tennis), service regulations, and reporting times so there are zero surprises at the desk.'
        },
        {
          type: 'heading',
          text: 'Prepare Your Schedule & Equipment'
        },
        {
          type: 'list',
          items: [
            'Two weeks out: Play full practice sets keeping exact score to build match focus.',
            'Three days out: Inspect racket strings, grip tape, or paddle rubbers and pack a spare racket if available.',
            'Night before: Pack non-marking court shoes, two breathable jerseys, water, a towel, and light snacks.',
            'Taper heavy drills the day before so your legs feel springy on court.'
          ]
        },
        {
          type: 'heading',
          text: 'Match-Day Warm-Up Routine'
        },
        {
          type: 'paragraph',
          text: 'Arrive at the venue at least 30 minutes before your scheduled call time. Spend 10 minutes raising your heart rate with light jogging and dynamic mobility, followed by short rally warm-ups if practice courts are open. Entering your first point already warm prevents slow starts.'
        },
        {
          type: 'heading',
          text: 'Managing Match-Day Nerves'
        },
        {
          type: 'paragraph',
          text: 'Feeling butterflies before your first serve is completely normal—it means you care about the moment. Keep your focus simple: play one point at a time, take a slow breath before serving, and stick to high-percentage shots in the opening rally until your rhythm settles.'
        },
        {
          type: 'tip',
          title: 'Tournament Mindset',
          text: 'Treat your first tournament as a learning experience rather than a final exam. Every match reveals strengths to trust and skills to sharpen next.'
        },
        {
          type: 'heading',
          text: 'Sportsmanship & Enjoying the Moment'
        },
        {
          type: 'paragraph',
          text: 'Respect line calls, shake hands warmly at the net after every match, and stay around to watch higher-seeded rounds. You will pick up tactical ideas, make new friends in the community, and walk away excited for your next event at COURTLY.'
        }
      ]
    }
  ];

  const CATEGORIES = [
    'All Articles',
    'Badminton',
    'Table Tennis',
    'Fitness',
    'Training',
    'Community',
    'Tournaments'
  ];

  window.COURTLY_BLOG_DATA = {
    authors: AUTHORS,
    articles: BLOG_ARTICLES,
    categories: CATEGORIES,
    getBySlug: function (slug) {
      return BLOG_ARTICLES.find(a => a.slug === slug) || null;
    },
    getById: function (id) {
      return BLOG_ARTICLES.find(a => a.id === id) || null;
    }
  };
})();
