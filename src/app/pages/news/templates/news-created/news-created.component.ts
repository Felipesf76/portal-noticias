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


@Component({
  selector: 'app-news-created',
  imports: [NewsCardComponent, ModalFormComponent, MatIconModule],
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
  public newsInfo: News = new News('', '', '', '', '', '', '', 0, new Date(), '', '')
  public id_user : string | null = null;
  public newsId: string | null = null;

  constructor(
    private newsService: NewsService,
    private categoriesService: CategorieService,
    private subscriptionService: SubscriptionService

  ){
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
    this.myModal.nativeElement.close();
    //TODO: Ajustar los datos del usuario con la sesión
    news.append('id_usuarios', 'bb383bbb-7a4a-4ba3-ada2-4d33559cd916')
    news.append('autor', 'Maria Garcia')

    this.newsService.createNews(news).subscribe(res => {
      console.log(res);
    })

  }
  onCloseModal() {
    this.myModal.nativeElement.close();
  }
  onEditNewsModal(id: string) {
    //TODO: Crear la lógica del Modal
    if(id){
      console.log(id)
      this.newsService.getOneNews(id).subscribe(news => {
        this.newsInfo = news
      })
      this.myModal.nativeElement.show()
    }
  }

  handleEditNews(news: FormData): void {
    this.myModal.nativeElement.close();
    //TODO: Ajustar los datos del usuario con la sesión
    // news.append('id_usuarios', 'bb383bbb-7a4a-4ba3-ada2-4d33559cd916')
    // news.append('autor', 'Maria Garcia')
    console.log('pADRE A ENVIAR: ', news.values());
    console.log('titulo', news.get('titulo'))
    console.log('descripcion', news.get('descripcion'))
    console.log('id_categorias', news.get('id_categorias'))
    console.log('pais', news.get('pais'))
    console.log('url', news.get('url'))
    console.log('multimedia', news.get('multimedia'))

    this.newsService.updateNews(this.newsInfo.id, news).subscribe(res => {
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
    this.newsInfo = new News('', '', '', '', '', '', '', 0, new Date(), '', '')
    this.myModal.nativeElement.show()
  }

}
