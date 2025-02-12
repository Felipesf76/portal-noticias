import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '@app/models/News';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-news-card',
  imports: [MatIconModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',

})
export class NewsCardComponent {
  @Input() public varNews:News = new News("", "", "", "", "", "", "", 0, new Date('2024-11-01'), "", "")
  @Input() public editNews: boolean = false

  private router = inject(Router)

  goToNews() {
    this.router.navigate(['/news/fsdfd'])
  }
}
