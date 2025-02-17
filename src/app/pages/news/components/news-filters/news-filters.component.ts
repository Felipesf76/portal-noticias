import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '@models/Categories';
import { FilterService } from '@services/filters.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-news-filters',
  imports: [TitleCasePipe],
  templateUrl: './news-filters.component.html',
  styleUrl: './news-filters.component.css'
})
export class NewsFiltersComponent implements OnInit {
  @Output() category: EventEmitter<string> = new EventEmitter<string>()
  @Input() categories: Categories[] = []
  @Input() locations: string[] = []
  @Input() dates: Date[] = []
  locationQuery: string = '';
  selectedCategory: string = '';
  selectedDate: string = '';

  public categorySelected = ''
  public locationSelected = ''
  public dateSelected = ''
  public paramCategory = ''
  public paramLocation = ''
  public paramDate = ''
  public dateOptions = [
    'Cualquier momento',
    'Mes pasado',
    'Semana pasada',
    'Últimas 24 horas'
  ]

  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramCategory = params["category"] || ''
      this.paramLocation = params["location"] || ''
      this.paramDate = params["date"] || ''
    });
  }

  applyDateFilter(event: Event) {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    this.dateSelected = (event.target as HTMLSelectElement).value

    const now = new Date();

    switch (this.dateSelected) {
      case 'Mes pasado':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'Semana pasada':
        const startOfLastWeek = new Date(now);
        startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
        startDate = startOfLastWeek;
        endDate = new Date(startOfLastWeek);
        endDate.setDate(startOfLastWeek.getDate() + 6);
        break;
      case 'Últimas 24 horas':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case 'Cualquier momento':
        startDate = null;
        endDate = null;
        break;
      default:
        startDate = null;
        endDate = null;
        break;
    }

    let result = {
      startDate: startDate,
      endDate: endDate
    }

    this.filterService.updateDateFilter(result)
    this.updateUrl()
  }

  onCategoryChange(event: Event): void{
    this.categorySelected = (event.target as HTMLSelectElement).value
    this.filterService.updateCategoryFilter(this.categorySelected)
    this.updateUrl()
  }
  onLocationChange(event: Event): void{
    this.locationSelected = (event.target as HTMLSelectElement).value
    this.filterService.updateLocationFilter(this.locationSelected)
    this.updateUrl()
  }

  updateUrl() {
    const queryParams: any = {}
    if (this.categorySelected) queryParams.category = this.categorySelected
    if (this.locationSelected) queryParams.location = this.locationSelected
    if (this.dateSelected) queryParams.date = this.dateSelected

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
