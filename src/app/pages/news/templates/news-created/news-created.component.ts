import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { News } from '@app/models/News';
import { NewsService } from '@app/services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalFormComponent } from '@news/components/modal-form/modal-form.component';
import { Categories } from '@app/models/Categories';
import { CategorieService } from '@app/services/categories.service';
import { SubscriptionService } from '@app/services/subscription.service';
import { MatIconModule } from '@angular/material/icon';
<<<<<<< HEAD
import { User } from '@app/models/User';
=======
import { SlidePublicidadComponent } from '@app/shared/components/slide-publicidad/slide-publicidad.component';
>>>>>>> origin/main


@Component({
  selector: 'app-news-created',
  imports: [NewsCardComponent, ModalFormComponent, MatIconModule,SlidePublicidadComponent],
  templateUrl: './news-created.component.html',
  styleUrl: './news-created.component.css',
  providers: [NewsService, CategorieService, SubscriptionService]
})
export class NewsCreatedComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') myModal: any
  @ViewChild('myModalDelete') myModalDelete: any
  public records_new: News[] = []
  public categoriesList: Categories[] = []
  private destroy$ = new Subject<void>();
  public modal: boolean = false;
  public newsInfo: News = new News('', '', '', '', '', '', 0, new Date(), '', '','')
  public id_user : string | null = null;
  public newsId: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null;
  isEditMode = false;

  constructor(
    private newsService: NewsService,
    private categoriesService: CategorieService,
    private subscriptionService: SubscriptionService
  ){
    this.userId = sessionStorage.getItem('user_id')
    const userData = sessionStorage.getItem('user');

    if (userData) {
      // Convertir el string a objeto
      const user = JSON.parse(userData);

      // Acceder a la propiedad 'name'
      this.userName = user.nombre_completo;
    }

    // this.categoriesService.getCategories().subscribe({
    //   next:  (info)  => {
    //     this.categoriesList = info
    //   },
    //   error: (error) => console.log("Error: ", error)
    // })
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.id_user = sessionStorage.getItem('user_id');
    }

    this.loadData()
    // forkJoin({
    //   categories: this.categoriesService.getCategories(),
    //   news: this.newsService.getNews()
    // }).subscribe({
    //   next: ({ categories, news }) => {
    //     console.log("Datos de categorías recibidos:", categories);
    //     console.log("Datos de suscripciones recibidos:", news);

    //     this.categoriesList = categories;
    //     this.records_new = news;
    //   },
    //   error: (error) => console.error("Error al cargar datos:", error)
    // });

    // this.newsService.getNews()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(news => {
    //   this.records_new = news
    // });
    // this.newsService.getNews()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(news => {
    //   this.records_new = news;
    // })
    // this.categoriesService.getCategories()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(categories => {
    //   this.categoriesList = categories;
    // })
  }

  private loadData(): void {
    if (!this.id_user) {
      console.log("El id de usuario no debe ser nulo");
      return;
    }

    // Ejecutar ambas peticiones en paralelo y esperar sus respuestas
    forkJoin({
      categories: this.categoriesService.getCategories(),
      news: this.newsService.getNewsByUser(this.id_user)
    }).subscribe({
      next: ({ categories, news }) => {
        this.categoriesList = categories;
        this.records_new = news;

      },
      error: (error) => console.error("Error al cargar datos:", error)
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleNewsCreated(news: FormData): void {
    let user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      if (this.userId && this.userName) {
        news.append('id_usuarios', this.userId)
        news.append('autor', 'David Felipe')
      }
    }

    this.newsService.createNews(news).subscribe(res => {
      this.loadData()
    })
    this.myModal.nativeElement.close();

  }
  onCloseModal() {
    this.myModal.nativeElement.close();
  }
  onEditNewsModal(id: string) {
    //TODO: Crear la lógica del Modal
    if(id){
      this.isEditMode = true
      this.newsService.getOneNews(id).subscribe(news => {
        this.newsInfo = news
        this.myModal.nativeElement.show()
      })
    }
  }

  // public editPublicity(item: FormData):void{

  //   const idPublicity = item.get("id") as string;

  //   this.publicityService.editPublicity(item,idPublicity).subscribe({
  //     next: (response) => console.log("edit exitoso: ", response),
  //     error: (error) => console.error("Error al editar datos:", error)
  //   })
  // }
  handleEditNews(news: FormData): void {
    this.myModal.nativeElement.close();
    this.newsService.updateNews(news, this.newsInfo.id).subscribe(res => {
      console.log(res);
    })
  }

  handleDeleteNewsModal(id: string): void {
    this.newsId = id
    this.myModalDelete.nativeElement.show()
  }

  DeleteNews(): void {
    this.myModalDelete.nativeElement.close();
    if (this.newsId !== null){
      const id = this.newsId
      this.newsService.deleteNews(id).subscribe(res => {
        console.log(res);
        this.loadData()
      })
    }
  }

  modalCreateOpen(): void {
    this.myModal.nativeElement.show()
  }

}
