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
      name: 'დაგლას ჰარლი',
      role: 'მეთაური',
      bio: 'დუგლას ჯერალდ ჰარლი ამერიკელი ინჟინერი და საზღვაო ქვეითთა ​​​​კორპუსის ყოფილი პილოტია. ის კოსმოსში Crew Dragon Demo-2 მისიის მეთაურად გაფრინდა.',
      image: '/assets/assets/crew/image-douglas-hurley.png',
    },
    {
      name: 'მარკ შატლუორთი',
      role: 'პილოტი',
      bio: 'მარკ რიჩარდ შატლუორთი Canonical-ის დამფუძნებელი და აღმასრულებელი დირექტორია. ის პირველი სამხრეთ აფრიკელი გახდა, რომელმაც კოსმოსური ტურისტის სტატუსით კოსმოსში იმოგზაურა.',
      image: '/assets/assets/crew/image-mark-shuttleworth.png',
    },
    {
      name: 'ვიქტორ გლოვერი',
      role: 'მისიის სპეციალისტი',
      bio: 'SpaceX-ის Crew Dragon-ის პირველი ოპერატიული ფრენის პილოტი საერთაშორისო კოსმოსურ სადგურზე.',
      image: '/assets/assets/crew/image-victor-glover.png',
    },
    {
      name: 'ანუშე ანსარი',
      role: 'ფრენის ინჟინერი',
      bio: 'ანუშე ანსარი ირანელი-ამერიკელი ინჟინერი და Prodea Systems-ის თანადამფუძნებელია; ის იყო პირველი ქალი კერძო კოსმოსური მკვლევარი.',
      image: '/assets/assets/crew/image-anousheh-ansari.png',
    },
  ];

  selected = 0;

  select(i: number) {
    this.selected = i;
  }
}
