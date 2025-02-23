import { Component,OnInit } from '@angular/core';
import { CategorieService } from '@app/services/categories.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { Categories } from '@app/models/Categories';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '@app/services/subscription.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  providers: [CategorieService, SubscriptionService]
})
export class CategoriesListComponent implements OnInit{
  records_categories: Array<any> = []
  records_suscription_user:Array<any>=[]
  public updated_categories: Array<any> = []


  public id_user: string | null = null;

  constructor(
    private categoryService: CategorieService,
    private  subscriptionService: SubscriptionService

  )
  {
   
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.id_user = sessionStorage.getItem('user_id');
    }
    this.loadData();
  }
      /**
   * Carga los datos de categorías y suscripciones en paralelo y actualiza la lista de categorías
   */
  private loadData(): void {
    if (!this.id_user) {
      console.log("El id de usuario no debe ser nulo");
      return;
    }

    // Ejecutar ambas peticiones en paralelo y esperar sus respuestas
    forkJoin({
      categories: this.categoryService.getCategories(),
      subscriptions: this.subscriptionService.getSubscriptionByUser(this.id_user)
    }).subscribe({
      next: ({ categories, subscriptions }) => {
        console.log("Datos de categorías recibidos:", categories);
        console.log("Datos de suscripciones recibidos:", subscriptions);

        this.records_categories = categories;
        this.records_suscription_user = subscriptions;

        // Actualizar las categorías con la información de suscripción
        this.updateCategoriesWithSubscription();
      },
      error: (error) => console.error("Error al cargar datos:", error)
    });
  }
  
  onCheckboxChange(event: { checked: boolean; categoria: Categories }) {
    if (event.checked) {
      this.subscribirCategorias(event.categoria);
    } else {
      this.anularCategoria(event.categoria);
    }
  }

  subscribirCategorias(var_category:Categories):void{
    if (this.id_user){
      this.subscriptionService.createSubscription(var_category.id, this.id_user).subscribe({
        next: (response) => console.log('Suscripción creada:', response),
        error: (error) => console.error('Error creando suscripción:', error)
      })
    }
  }

  anularCategoria(var_category:Categories):void{
    if (this.id_user){
      this.subscriptionService.deleteSubscription(var_category.id, this.id_user).subscribe({
        next: (response) => console.log('Suscripción eliminada:', response),
        error: (error) => console.error('Error al eliminar suscripción:', error)
      })
    }
  }


  private updateCategoriesWithSubscription(): void {
    // Creamos un Set con los ID de categorías suscritas para búsqueda rápida
    const subscribedIds = new Set(this.records_suscription_user.map(sub => sub.id_categorias));

    // Generamos un nuevo array de categorías con la propiedad "is_suscribed"
    this.updated_categories = this.records_categories.map(category => ({
      ...category,
      is_suscribed: subscribedIds.has(category.id)
    }));

    console.log("Categorías actualizadas:", this.updated_categories);
  }  

}
