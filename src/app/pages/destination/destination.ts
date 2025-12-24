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
        'დედამიწის ბუნებრივი თანამგზავრი. იგი დედამიწის სინქრონულად მბრუნავი რეგულარული თანამგზავრი და უახლოესი ციური სხეულია მზის სისტემაში.',
      image: '/assets/assets/destination/image-moon.png',
    },
    {
      name: 'მარსი',
      short: 'მარსი',
      description: ' მეოთხე პლანეტა სიშორითა და მერკურის შემდეგ, ზომით ყველაზე მცირე პლანეტა მზის სისტემაში. მას რომაული ომის ღმერთის მარსის სახელი ჰქვია.',
      image: '/assets/assets/destination/image-mars.png',
    },
    {
      name: 'ევროპა',
      short: 'ევროპა',
      description: ' ციური სხეული, პლანეტა იუპიტერის ბუნებრივი თანამგზავრი. შედის იუპიტერის გალილეისეულ თანამგზავრთა ჯგუფში.',
      image: '/assets/assets/destination/image-europa.png',
    },
    {
      name: 'ტიტანი',
      short: 'ტიტანი',
      description: " სატურნის ყველაზე დიდი თანამგზავრი (მზის სისტემაში სიდიდით მეორე). მეხუთეა პლანეტიდან დაშორების მხრივ.",
      image: '/assets/assets/destination/image-titan.png',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
