import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '@services/news.service';
import { FilterService } from '@services/filters.service';
import { ActivatedRoute } from '@angular/router';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { News } from '@app/models/News';
import { NewsFiltersComponent } from '@news/components/news-filters/news-filters.component';
import { SearchComponent } from '@news/components/search/search.component';
import { CategorieService } from '@services/categories.service';
import { Categories } from '@models/Categories';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news-list',
  imports: [NewsCardComponent, NewsFiltersComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
  providers: [CategorieService, NewsService]
})
export class NewsListComponent implements OnInit, OnDestroy {
  public newsList: News[] = []
  public categories: any = []
  public filteredNews: News[] = []
  public selectedCategory = ''
  public selectedDate = new Date()
  public filterQuery = ''
  public locationList: string[] = []
  public dateList: Date[] = []
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategorieService,
    private filterService: FilterService
  ){
    this.categoryService.getCategories().subscribe({
      next:  (info)  => {
        this.categories = info
      },
      error: (error) => console.log("Error: ", error)
    })
  }

  ngOnInit() {
    // Obtener las noticias del servicio
    this.newsService.getNews()
    .pipe(takeUntil(this.destroy$))
    .subscribe(news => {
      this.newsList = news
      this.filteredNews = news
      this.locationList = Array.from(new Set<string>(news.map(news => news.pais)))
      this.dateList = Array.from(new Set<Date>(news.map(news => news.fecha_creacion)))
    });

    this.route.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      const category = params['category'] || ''
      const location = params['location'] || ''
      const date = params['date'] || ''

      this.filterService.updateCategoryFilter(category);
      this.filterService.updateLocationFilter(location);
      this.filterService.updateDateFilter(date);
    });

    combineLatest([
      this.filterService.categoryFilter$,
      this.filterService.locationFilter$,
      this.filterService.dateFilter$
    ]).subscribe(([category, location, date]) => {
      this.filteredNews = this.newsList.filter(news => {
      const resultDate = new Date(news.fecha_creacion);
      const startDate = date.startDate ? new Date(date.startDate) : null;
      const endDate = date.endDate ? new Date(date.endDate) : null;
      return (
        (!location || news.pais === location) &&
        (!category || news.id_categorias === category) &&
        ((!startDate || resultDate >= startDate) &&
        (!endDate || resultDate <= endDate))
      );
    });
    })
  }

  // filterNews() {
  //   if(this.selectedCategory === ''){
  //     this.filteredNews = this.newsList
  //   }else{
  //     this.filteredNews = this.newsList.filter(news => news.id_categorias == this.selectedCategory)
  //   }
  // }

  // changeUrl(){
  //   const queryParams: any = {};
  //   if (this.selectedCategory) queryParams.category = this.selectedCategory;
  //   if (this.selectedDate) queryParams.date = this.selectedDate;

  //   this.router.navigate(['/news'], { queryParams });
  // }

  // onCategoryChange(category: string) {
  //   this.router.navigate(['/news'], { queryParams: { search: category } });
  // }

  onSearch(text: string){
    console.log(text)
    //this.records_new = this.newsService.getNewsBySearch(text)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
