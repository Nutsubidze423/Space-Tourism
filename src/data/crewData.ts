export interface CrewMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  stats: {
    missions: number;
    hoursInSpace: number;
    spacewalks: number;
  };
  image: string;
}

export const crewList: CrewMember[] = [
  {
    id: 'commander',
    name: 'Cmdr. Sarah Vance',
    role: 'Mission Commander',
    bio: 'Former test pilot with 15 years of orbital experience. Specialized in deep-space navigation and crisis management.',
    stats: {
      missions: 12,
      hoursInSpace: 4500,
      spacewalks: 28,
    },
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'engineer',
    name: 'Dr. Leo Chen',
    role: 'Chief Engineer',
    bio: 'Propulsion systems expert who helped design the Orion-X fusion drive. Can fix anything with a wrench and duct tape.',
    stats: {
      missions: 8,
      hoursInSpace: 2800,
      spacewalks: 15,
    },
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'specialist',
    name: 'Elena Rodriguez',
    role: 'Mission Specialist',
    bio: 'Astrobiologist and medical officer ensuring crew health and safety during long-duration voyages.',
    stats: {
      missions: 5,
      hoursInSpace: 1200,
      spacewalks: 8,
    },
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'pilot',
    name: 'Maj. James Ford',
    role: 'Pilot',
    bio: 'Ace pilot known for precise docking maneuvers and smooth atmospheric entries. Holds the record for fastest Mars transit.',
    stats: {
      missions: 9,
      hoursInSpace: 3100,
      spacewalks: 12,
    },
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
  },
];
