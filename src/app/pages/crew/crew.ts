import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CrewMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crew.html',
  styleUrls: ['./crew.css'],
})
export class Crew {
  members: CrewMember[] = [
    {
      name: 'DOUGLAS HURLEY',
      role: 'COMMANDER',
      bio: 'Douglas Gerald Hurley is an American engineer and former Marine Corps pilot. He launched into space as commander of the Crew Dragon Demo-2 mission.',
      image: '/assets/assets/crew/image-douglas-hurley.png',
    },
    {
      name: 'MARK SHUTTLEWORTH',
      role: 'PILOT',
      bio: 'Mark Richard Shuttleworth is the founder and CEO of Canonical. He became the first South African to travel to space as a space tourist.',
      image: '/assets/assets/crew/image-mark-shuttleworth.png',
    },
    {
      name: 'VICTOR GLOVER',
      role: 'MISSION SPECIALIST',
      bio: 'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station.',
      image: '/assets/assets/crew/image-victor-glover.png',
    },
    {
      name: 'ANOUSHEH ANSARI',
      role: 'FLIGHT ENGINEER',
      bio: 'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems; she was the first female private space explorer.',
      image: '/assets/assets/crew/image-anousheh-ansari.png',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
