import { Component } from '@angular/core';
import { NewsRatingComponent } from '@app/pages/califications/components/news-rating/news-rating.component';

@Component({
  selector: 'app-news-detail',
  imports: [NewsRatingComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent {

  handleRatingSubmission(rating: number): void {
    console.log(rating);

  }
}
