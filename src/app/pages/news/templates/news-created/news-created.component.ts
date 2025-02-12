import { Component } from '@angular/core';
import { News } from '@app/models/News';
import { NewsService } from '@app/services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';


@Component({
  selector: 'app-news-created',
  imports: [NewsCardComponent],
  templateUrl: './news-created.component.html',
  styleUrl: './news-created.component.css',
  providers: [NewsService]
})
export class NewsCreatedComponent {
  public records_new: Array<News>

  constructor(private newsService: NewsService){
    this.records_new = this.newsService.getNewsTest()
  }
}
