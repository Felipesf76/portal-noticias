import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { News } from '@app/models/News';
import { NewsService } from '@app/services/news.service';
import { NewsCardComponent } from '@news/components/news-card/news-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalFormComponent } from '@news/components/modal-form/modal-form.component';
import { Categories } from '@app/models/Categories';
import { CategorieService } from '@app/services/categories.service';


@Component({
  selector: 'app-news-created',
  imports: [NewsCardComponent, ModalFormComponent],
  templateUrl: './news-created.component.html',
  styleUrl: './news-created.component.css',
  providers: [NewsService, CategorieService]
})
export class NewsCreatedComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') myModal: any;
  public records_new: News[] = []
  public categoriesList: Categories[] = []
  private destroy$ = new Subject<void>();
  public modal: boolean = false;
  public newsInfo: News = new News('', '', '', '', '', '', '', 0, new Date(), '', '')

  constructor(
    private newsService: NewsService,
    private categoriesService: CategorieService
  ){}

  ngOnInit(): void {
    this.newsService.getNews()
    .pipe(takeUntil(this.destroy$))
    .subscribe(news => {
      this.records_new = news;
    })
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe(categories => {
      this.categoriesList = categories;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleNewsCreated(news: FormData): void {
    this.myModal.nativeElement.close();
    // TODO: Ajustar los datos del usuario con la sesión
    news.append('id_usuarios', 'bb383bbb-7a4a-4ba3-ada2-4d33559cd916')
    news.append('autor', 'Maria Garcia')
    // Verifica que los campos se hayan agregado correctamente
    for (const value of news.values()) {
      console.log(value);
    }

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
    // TODO: Ajustar los datos del usuario con la sesión
    news.append('id_usuarios', 'bb383bbb-7a4a-4ba3-ada2-4d33559cd916')
    news.append('autor', 'Maria Garcia')
    // Verifica que los campos se hayan agregado correctamente
    for (const value of news.values()) {
      console.log(value);
    }

    // this.newsService.updateNews(news).subscribe(res => {
    //   console.log(res);
    // })

  }

  modalCreateOpen() {
    this.newsInfo = new News('', '', '', '', '', '', '', 0, new Date(), '', '')
    this.myModal.nativeElement.show()
  }

}
