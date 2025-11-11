export type EventLevel = 'standard' | 'verified';

export type EventItem = {
  id: string;
  name: string;
  date: string;
  venue: string;
  priceRange: string;
  description: string;
  heroImage: string;
};

export const featuredEvents: EventItem[] = [
  {
    id: 'taylor-swift-eras',
    name: 'Taylor Swift | The Eras Tour',
    date: 'May 18, 2026 · 7:00 PM',
    venue: 'Gillette Stadium · Foxborough, MA',
    priceRange: '$125 – $799',
    description:
      'Ticketmaster prioritizes VerifID fans for the most in-demand tour of the decade.',
    heroImage: '/images/eras-tour.svg'
  },
  {
    id: 'nba-finals-game-7',
    name: 'NBA Finals · Game 7',
    date: 'June 16, 2026 · 8:30 PM',
    venue: 'TD Garden · Boston, MA',
    priceRange: '$210 – $1,050',
    description: 'VerifID keeps championship seats in the hands of real fans.',
    heroImage: '/images/nba-finals.svg'
  },
  {
    id: 'coachella-2026',
    name: 'Coachella Valley Music & Arts Festival',
    date: 'April 17–19, 2026 · All Day',
    venue: 'Empire Polo Club · Indio, CA',
    priceRange: '$499 – $1,299',
    description: 'Festival access stays equitable when every Ticketmaster entry is VerifID bound.',
    heroImage: '/images/coachella.svg'
  }
];

export const mockUser = {
  name: 'Elaine Wang',
  email: 'elaine.liuwang@gmail.com',
  avatarUrl: '/images/avatar.svg'
};
