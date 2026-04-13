export interface PlanetData {
  name: string;
  radius: number;
  distance: number; // AU from sun
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  description: string;
  travelTime: string;
  atmosphere: string;
  temperature: string;
  funFacts: string[];
}

export const planetsData: PlanetData[] = [
  {
    name: 'Mercury',
    radius: 0.38,
    distance: 0.4,
    orbitSpeed: 0.024,
    rotationSpeed: 0.001,
    color: '#8C7853',
    description:
      'The swift messenger - closest planet to the Sun with extreme temperature variations.',
    travelTime: '6-7 months',
    atmosphere: 'Virtually none',
    temperature: '-173°C to 427°C',
    funFacts: [
      'A year on Mercury is just 88 Earth days',
      'Has ice in permanently shadowed craters',
      'Smallest planet in our solar system',
    ],
  },
  {
    name: 'Venus',
    radius: 0.95,
    distance: 0.7,
    orbitSpeed: 0.015,
    rotationSpeed: -0.0005,
    color: '#FFC649',
    description:
      "Earth's toxic twin - a hellish world of sulfuric acid clouds and crushing pressure.",
    travelTime: '5-6 months',
    atmosphere: '96% CO₂, sulfuric acid clouds',
    temperature: '462°C (hottest planet)',
    funFacts: [
      'Rotates backwards compared to most planets',
      'A day is longer than a year',
      "Atmospheric pressure is 92x Earth's",
    ],
  },
  {
    name: 'Earth',
    radius: 1.0,
    distance: 1.0,
    orbitSpeed: 0.01,
    rotationSpeed: 0.002,
    color: '#4169E1',
    description:
      'Our home - the only known planet with life, liquid water, and breathable atmosphere.',
    travelTime: 'You are here!',
    atmosphere: '78% N₂, 21% O₂',
    temperature: '-88°C to 58°C',
    funFacts: [
      'Only planet not named after a god',
      '71% covered by water',
      'Has one natural satellite: the Moon',
    ],
  },
  {
    name: 'Mars',
    radius: 0.53,
    distance: 1.5,
    orbitSpeed: 0.008,
    rotationSpeed: 0.0019,
    color: '#CD5C5C',
    description:
      "The Red Planet - humanity's next frontier with ancient riverbeds and polar ice caps.",
    travelTime: '6-9 months',
    atmosphere: '95% CO₂, very thin',
    temperature: '-125°C to 20°C',
    funFacts: [
      'Home to Olympus Mons, largest volcano in solar system',
      'Has two small moons: Phobos and Deimos',
      'A day is almost the same as Earth (24.6 hours)',
    ],
  },
  {
    name: 'Jupiter',
    radius: 11.2,
    distance: 5.2,
    orbitSpeed: 0.0043,
    rotationSpeed: 0.004,
    color: '#DAA520',
    description:
      'The Gas Giant - a massive storm-wracked world that could fit 1,300 Earths inside.',
    travelTime: '13-14 months',
    atmosphere: '90% H₂, 10% He',
    temperature: '-145°C',
    funFacts: [
      'Great Red Spot is a storm larger than Earth',
      'Has 95 known moons',
      'Strongest magnetic field of any planet',
    ],
  },
  {
    name: 'Saturn',
    radius: 9.4,
    distance: 9.5,
    orbitSpeed: 0.0032,
    rotationSpeed: 0.0038,
    color: '#F4A460',
    description:
      'The Ringed Beauty - adorned with spectacular ice rings visible from Earth.',
    travelTime: '6-7 years',
    atmosphere: '96% H₂, 3% He',
    temperature: '-178°C',
    funFacts: [
      'Rings are made of ice and rock particles',
      'Has 146 known moons',
      'Least dense planet - would float in water',
    ],
  },
  {
    name: 'Uranus',
    radius: 4.0,
    distance: 19.2,
    orbitSpeed: 0.0023,
    rotationSpeed: -0.003,
    color: '#4FD0E0',
    description:
      'The Tilted Giant - rolls on its side with a rotation axis tilted 98 degrees.',
    travelTime: '8-9 years',
    atmosphere: '83% H₂, 15% He, 2% CH₄',
    temperature: '-224°C',
    funFacts: [
      'Rotates on its side',
      'Has faint rings',
      'Coldest planetary atmosphere in solar system',
    ],
  },
  {
    name: 'Neptune',
    radius: 3.9,
    distance: 30.1,
    orbitSpeed: 0.0018,
    rotationSpeed: 0.0032,
    color: '#4169E1',
    description:
      'The Windswept World - featuring the fastest winds in the solar system at 2,100 km/h.',
    travelTime: '12 years',
    atmosphere: '80% H₂, 19% He, 1% CH₄',
    temperature: '-214°C',
    funFacts: [
      'Fastest winds in the solar system',
      'Has 16 known moons',
      'Takes 165 Earth years to orbit the Sun',
    ],
  },
];
