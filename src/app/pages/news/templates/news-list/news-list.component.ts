import { Component } from '@angular/core';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';


@Component({
  selector: 'app-news-list',
  imports: [NewsCardComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {

}
