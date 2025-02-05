import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
  providers: [NewsService]
})
export class NewsCardComponent {

  public records_new: Array<any>

  // newsTitle = ''
  // newsDescription = ''
  // newsImge = ''
  // newsAutor = ''
  // newsCategory = ''
  // newsPlace = ''
  // newsViews = 0
  private router = inject(Router)

  constructor(
    private newsService: NewsService

  ) {

    this.records_new = this.newsService.getNewsTest()

    // this.newsTitle = 'Titulo de noticia'
    // this.newsDescription = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ewfsdftwerwerwer et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    // this.newsImge = 'http://placekitten.com/200/300'
    // this.newsAutor = 'Autor de noticia'
    // this.newsCategory = 'Categoría de noticia'
    // this.newsPlace = 'Lugar de noticia'
    // this.newsViews = 10
  }
  goToNews() {
    this.router.navigate(['/news/fsdfd'])
  }
}
