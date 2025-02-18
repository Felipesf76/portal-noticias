import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Categories } from '@app/models/Categories';


@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() var_id:string = ""
  @Input() var_categoria:string = ""
  @Input() public var_suscribe:boolean = false

  @Output() suscribeCategory = new EventEmitter<{checked: boolean; categoria:Categories}>()

  public var_category= new Categories(this.var_id, this.var_categoria)

  constructor() {
    this.actualizarCategoria(); // Inicializa var_category
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['var_id'] || changes['var_categoria']) {
      this.actualizarCategoria();
    }
  }
  
  private actualizarCategoria(): void {
    this.var_category = new Categories(this.var_id, this.var_categoria);
  }



  onCheckboxChange(event: Event):void{
    const checked_event = (event.target as HTMLInputElement).checked;
    this.suscribeCategory.emit(
      {
      checked: checked_event,
      categoria: this.var_category
    }
     )
  }

}

