import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


export interface ICardData {
  title: string;
  description: string;
  route?: string;
  image?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input() cardData!: ICardData;

  constructor(private router: Router) {}

  navigate() {
    if (this.cardData.route) {
      this.router.navigate([this.cardData.route]);
    }
  }
}
