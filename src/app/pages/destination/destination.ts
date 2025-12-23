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
      name: 'მთვარე',
      short: 'მთვარე',
      description:
        'დედამიწის ბუნებრივი თანამგზავრი.',
      image: '/assets/assets/destination/image-moon.png',
    },
    {
      name: 'მარსი',
      short: 'მარსი',
      description: 'მეოთხე პლანეტა მზის სისტემაში ცნობილი როგორც წითელი პლანეტა.',
      image: '/assets/assets/destination/image-mars.png',
    },
    {
      name: 'ევროპა',
      short: 'ევროპა',
      description: ' პლანეტა იუპიტერის ბუნებრივი თანამგზავრი.',
      image: '/assets/assets/destination/image-europa.png',
    },
    {
      name: 'ტიტანი',
      short: 'ტიტანი',
      description: " სატურნის ყველაზე დიდი თანამგზავრი.",
      image: '/assets/assets/destination/image-titan.png',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
