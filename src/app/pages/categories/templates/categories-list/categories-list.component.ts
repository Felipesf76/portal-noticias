import { Component } from '@angular/core';
import { CategorieService } from '@app/services/categories.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { Categories } from '@app/models/Categories';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '@app/services/subscription.service';


@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  providers: [CategorieService, SubscriptionService]
})
export class CategoriesListComponent {
  records_categories: Array<any> = []
  records_suscription_user:Array<any>=[]
  public updated_categories: Array<any> = []


  public id_user= "375290d0-85ef-42af-b5a3-2a2b1b63bf5a"

  constructor(
    private categoryService: CategorieService,
    private  subscriptionService: SubscriptionService

  )
  {
      this.categoryService.getCategories().subscribe({
        next:  (info)  => {
          this.records_categories = info
        },
        error: (error) => console.log("Error: ", error)
      }
    )
    
    //this.records_suscription_user = this.suscriptionService.getSuscriptionByUser(this.id_user)
      this.subscriptionService.getSuscriptionByUser(this.id_user).subscribe({
        next: (info) => {
          this.records_suscription_user = info
        }
      })

    this.updateCategoriesWithSubscription()

  }
  
  onCheckboxChange(event: { checked: boolean; categoria: Categories }) {
    if (event.checked) {
      this.suscribirCategorias(event.categoria);
    } else {
      this.anularCategoria(event.categoria);
    }
  }

  suscribirCategorias(var_category:Categories):void{
    console.log("suscribe: ", var_category.categoria)
  }

  anularCategoria(var_category:Categories):void{
    console.log("anular suscripcion de: ", var_category.categoria)
  }


  updateCategoriesWithSubscription(): void {
    // Creamos un Set con los ID de categorías suscritas para búsquedas rápidas
    const subscribedIds = new Set(this.records_suscription_user.map(sub => sub.id_categorias));

    // Generamos un nuevo array de categorías con la propiedad "is_suscribed"
    this.updated_categories = this.records_categories.map(category => ({
      ...category,
      is_suscribed: subscribedIds.has(category.id)
    }));

    console.log(this.updated_categories)
  }

}
