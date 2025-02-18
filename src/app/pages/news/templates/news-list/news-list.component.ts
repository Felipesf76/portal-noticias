import { Component } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';


@Component({
  selector: 'app-news-list',
  imports: [NewsCardComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  providers: [NewsService]
})
export class NewsListComponent {
  public records_new: Array<any>

  constructor(private newsService: NewsService){
    this.records_new = this.newsService.getNewsTest()
  }
}
