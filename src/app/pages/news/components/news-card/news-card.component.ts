import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Input() public varNews: News = new News("", "", "", "", "", "", 0, new Date(), "", "", "")
  @Input() public editNews: boolean = false
  @Output() editNewsModal = new EventEmitter<string>()
  @Output() deleteNewsModal = new EventEmitter<string>()

  private router = inject(Router)

  goToNews() {
    this.router.navigate([`/news/${this.varNews.id}`])
  }

  openEditNewsModal() {
    this.editNewsModal.emit(this.varNews.id)
  }
  openDeleteNewsModal(){
    this.deleteNewsModal.emit(this.varNews.id)
  }
}
