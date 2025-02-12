import { Component } from '@angular/core';
import { NewsService } from '@services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { News } from '@app/models/News';


@Component({
  selector: 'app-news-list',
  imports: [NewsCardComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  providers: [NewsService]
})
export class NewsListComponent {
  public records_new: Array<News>

  constructor(private newsService: NewsService){
    this.records_new = this.newsService.getNewsTest()
  }
}
