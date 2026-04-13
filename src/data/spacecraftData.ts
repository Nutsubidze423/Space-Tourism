export interface SpacecraftData {
  id: string;
  name: string;
  class: string;
  description: string;
  specs: {
    length: string;
    crew: number;
    speed: string;
    range: string;
    propulsion: string;
  };
  features: string[];
  color: string;
}

export const spacecraftList: SpacecraftData[] = [
  {
    id: 'orion-x',
    name: 'Orion-X Explorer',
    class: 'Long-Range Cruiser',
    description:
      'The flagship of our fleet, designed for deep space exploration and luxury interplanetary travel.',
    specs: {
      length: '120m',
      crew: 12,
      speed: '0.15c',
      range: '150 AU',
      propulsion: 'Fusion Drive Mk IV',
    },
    features: [
      'Artificial Gravity',
      'Observation Deck',
      'Cryo-Pods',
      'Quantum Comms',
    ],
    color: '#00d4ff',
  },
  {
    id: 'nebula-runner',
    name: 'Nebula Runner',
    class: 'High-Speed Yacht',
    description:
      'Built for speed and agility, this vessel offers the fastest transit times between inner planets.',
    specs: {
      length: '45m',
      crew: 4,
      speed: '0.22c',
      range: '40 AU',
      propulsion: 'Ion Thruster Array',
    },
    features: [
      'Stealth Coating',
      'Luxury Suites',
      'Holographic HUD',
      'Auto-Pilot',
    ],
    color: '#ffaa00',
  },
  {
    id: 'titan-hauler',
    name: 'Titan Heavy',
    class: 'Transport Vessel',
    description:
      'A rugged, dependable ship capable of transporting large crew and cargo to the outer rim.',
    specs: {
      length: '280m',
      crew: 45,
      speed: '0.08c',
      range: '300 AU',
      propulsion: 'Matter-Antimatter Core',
    },
    features: ['Heavy Shielding', 'Cargo Bays', 'Med-Bay', 'Shuttle Hangar'],
    color: '#ff4444',
  },
];
