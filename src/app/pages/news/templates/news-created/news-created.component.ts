import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '@app/models/News';
import { NewsService } from '@app/services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-news-created',
  imports: [NewsCardComponent],
  templateUrl: './news-created.component.html',
  styleUrl: './news-created.component.css',
  providers: [NewsService]
})
export class NewsCreatedComponent implements OnInit, OnDestroy {
  public records_new: News[] = []
  private destroy$ = new Subject<void>();

  constructor(
    private newsService: NewsService,
  ){}

  ngOnInit(): void {
    this.newsService.getNews()
    .pipe(takeUntil(this.destroy$))
    .subscribe(news => {
      this.records_new = news;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
