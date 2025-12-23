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
      name: 'გაშვების მანქანა',
      description:
        'გამშვები მოწყობილობა ან გადამზიდავი რაკეტა არის რაკეტსაწინააღმდეგო მოწყობილობა, რომელიც გამოიყენება დედამიწიდან კოსმოსში ტვირთის გადასატანად. ეს არის გაშვების სისტემა.',
      imageLandscape: '/assets/assets/technology/image-launch-vehicle-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-launch-vehicle-portrait.jpg',
    },
    {
      name: 'კოსმოსური პორტი',
      description:
        'კოსმოსური პორტი ან კოსმოდრომი არის ადგილი კოსმოსური ხომალდების გაშვების (ან მიღების)თვის, ანალოგიურად გემებისთვის საზღვაო პორტისა ან თვითმფრინავებისთვის აეროპორტისა.',
      imageLandscape: '/assets/assets/technology/image-spaceport-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-spaceport-portrait.jpg',
    },
    {
      name: 'კოსმოსური კაფსულა',
      description:
        "კოსმოსური კაფსულა არის ხშირად ეკიპაჟით დაკომპლექტებული კოსმოსური ხომალდი, რომელიც იყენებს ბლაგვი კორპუსის მქონე უკან შესვლის კაფსულას დედამიწის ატმოსფეროში ფრთების გარეშე დასაბრუნებლად.",
      imageLandscape: '/assets/assets/technology/image-space-capsule-landscape.jpg',
      imagePortrait: '/assets/assets/technology/image-space-capsule-portrait.jpg',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
