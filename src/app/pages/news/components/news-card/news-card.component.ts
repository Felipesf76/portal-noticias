import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '@app/models/News';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
  
})
export class NewsCardComponent {
  @Input() public var_news:News = new News("", "", "", "", "", "", "", 0, new Date('2024-11-01'), "", "")

  private router = inject(Router)

  goToNews() {
    this.router.navigate(['/news/fsdfd'])
  }
}
