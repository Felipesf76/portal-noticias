import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-rating',
  imports: [CommonModule],
  templateUrl: './news-rating.component.html',
  styleUrl: './news-rating.component.css'
})
export class NewsRatingComponent {
  @Output() ratingSubmitted = new EventEmitter<number>();
  selectedRating: number = 0; // Calificación seleccionada por el usuario

  stars: number[] = [1, 2, 3, 4, 5];
  //TODO: Mejorar la lógica con la calificación
  rate(rating: number): void {
    this.selectedRating = rating;
  }
  onSubmit(): void {
    if (this.selectedRating === 0) {
      alert('Por favor, selecciona una calificación.');
      return;
    }
    this.ratingSubmitted.emit(this.selectedRating);
  }
}
