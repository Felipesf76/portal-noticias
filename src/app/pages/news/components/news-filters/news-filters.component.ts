import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categories } from '@models/Categories';

@Component({
  selector: 'app-news-filters',
  imports: [],
  templateUrl: './news-filters.component.html',
  styleUrl: './news-filters.component.css'
})
export class NewsFiltersComponent {
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input() categories: Categories[] = []
  public text = ''

  public search(event: MouseEvent){
    event.preventDefault()
    this.textSearch.emit(this.text)
  }
  public onChange(event: Event){
    this.text = (event.target as HTMLInputElement).value
  }
}
