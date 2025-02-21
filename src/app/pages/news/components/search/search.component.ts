import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>();
    public text = ''

    public search(event: MouseEvent){
      event.preventDefault()
      this.textSearch.emit(this.text)
    }
    public onChange(event: Event){
      this.text = (event.target as HTMLInputElement).value
    }
}
