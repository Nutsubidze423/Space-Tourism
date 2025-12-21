import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechItem {
  name: string;
  description: string;
  imageLandscape: string;
  imagePortrait: string;
}

@Component({
  selector: 'app-tech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech.html',
  styleUrls: ['./tech.css'],
})
export class Tech {
  items: TechItem[] = [
    {
      name: 'LAUNCH VEHICLE',
      description:
        'A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth into space.',
      imageLandscape: '/assets/assets/technology/image-launch-vehicle-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-launch-vehicle-portrait.jpg',
    },
    {
      name: 'SPACEPORT',
      description:
        'A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to seaport for ships or airport for aircraft.',
      imageLandscape: '/assets/assets/technology/image-spaceport-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-spaceport-portrait.jpg',
    },
    {
      name: 'SPACE CAPSULE',
      description:
        "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings.",
      imageLandscape: '/assets/assets/technology/image-space-capsule-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-space-capsule-portrait.jpg',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
