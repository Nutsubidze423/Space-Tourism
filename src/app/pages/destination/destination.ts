import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DestinationItem {
  name: string;
  short: string;
  description: string;
  image: string;
}
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination.html',
  styleUrls: ['./destination.css'],
})
export class Destination {
  destinations: DestinationItem[] = [
    {
      name: 'MOON',
      short: 'MOON',
      description:
        'See our planets and moons. Choose a destination to get detailed info about travel time and required equipment.',
      image: '/assets/assets/destination/image-moon.png',
    },
    {
      name: 'MARS',
      short: 'MARS',
      description: 'The red planet awaits. Learn about travel time and conditions on Mars.',
      image: '/assets/assets/destination/image-mars.png',
    },
    {
      name: 'EUROPA',
      short: 'EUROPA',
      description: 'Explore Europa and its icy surface.',
      image: '/assets/assets/destination/image-europa.png',
    },
    {
      name: 'TITAN',
      short: 'TITAN',
      description: "Visit Titan's lakes and nitrogen-rich atmosphere.",
      image: '/assets/assets/destination/image-titan.png',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
