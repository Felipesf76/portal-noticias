import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface DateFilter {
  startDate: Date | null;
  endDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categoryFilter = new BehaviorSubject<string>('');
  private locationFilter = new BehaviorSubject<string>('');
  private dateFilter = new BehaviorSubject<DateFilter>({ startDate: null, endDate: null });

  categoryFilter$ = this.categoryFilter.asObservable();
  locationFilter$ = this.locationFilter.asObservable();
  dateFilter$ = this.dateFilter.asObservable();

  updateDateFilter(value: DateFilter) {
    this.dateFilter.next(value);
  }

  updateLocationFilter(value: string) {
    this.locationFilter.next(value);
  }

  updateCategoryFilter(value: string) {
    this.categoryFilter.next(value);
  }
}
