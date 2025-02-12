import { Component } from '@angular/core';
import { NewsService } from '@services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { News } from '@app/models/News';
import { NewsFiltersComponent } from '@news/components/news-filters/news-filters.component';
import { SearchComponent } from '@news/components/search/search.component';
import { CategorieService } from '@services/categories.service';
import { Categories } from '@models/Categories';

@Component({
  selector: 'app-news-list',
  imports: [NewsCardComponent, NewsFiltersComponent, SearchComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  providers: [NewsService, CategorieService]
})
export class NewsListComponent {
  public records_new: Array<News>
  public categories: Categories[]

  constructor(private newsService: NewsService , private categoryService: CategorieService){
    this.records_new = this.newsService.getNewsTest()
    this.categories = this.categoryService.getCategories()
  }


  onSearch(text: string){
    console.log(text)
    //this.records_new = this.newsService.getNewsBySearch(text)
  }
}
