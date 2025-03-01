import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-rating',
  imports: [CommonModule],
  templateUrl: './news-rating.component.html',
  styleUrl: './news-rating.component.css'
})
export class NewsRatingComponent {
  @Output() ratingSubmitted = new EventEmitter<number>();
  @Input() rating: number = 0;// Calificación seleccionada por el usuario

  stars: number[] = [1, 2, 3, 4, 5];

  //TODO: Mejorar la lógica con la calificación
  rate(rating: number): void {
    this.rating = rating;
  }
  onSubmit(): void {
    this.ratingSubmitted.emit(this.rating);
  }
}
