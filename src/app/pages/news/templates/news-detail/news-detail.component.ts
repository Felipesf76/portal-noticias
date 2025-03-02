import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comments, CreateComment } from '@app/models/Comments';
import { CommentService } from '@services/comments.service';
import { NewsRatingComponent } from '@pages/califications/components/news-rating/news-rating.component';
import { NewsCommentsListComponent } from '@pages/news/components/news-comments-list/news-comments-list.component';
import { FormAddCommentComponent } from '@pages/news/components/form-add-comment/form-add-comment.component';
import { takeUntil, Subject } from 'rxjs';
import { NewsService } from '@app/services/news.service';
import { News } from '@app/models/News';
import { ActivatedRoute } from '@angular/router';
import { CreateRating, UserInfo } from '@app/models/Califications';
import { CalificationService } from '@app/services/califications.service';
import { SlidePublicidadComponent } from '@app/shared/components/slide-publicidad/slide-publicidad.component';


@Component({
  selector: 'app-news-detail',
  imports: [NewsRatingComponent, NewsCommentsListComponent, FormAddCommentComponent, SlidePublicidadComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
  providers: [CommentService, NewsService],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  public commentsByUser: Comments[] = []
  private destroy$ = new Subject<void>()
  private getIdNews = ''
  public newsId: string | null = ''
  public newsContent: News = new News('', '', '', '', '', '', '', 0, new Date(), '', '')
  public rating = 0

  constructor(
    private _commentService: CommentService,
    private _newsService: NewsService,
    private route: ActivatedRoute,
    private ratingService: CalificationService
  ){ }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.newsId = params.get('id');
      if(this.newsId !== null){
        this.getIdNews = this.newsId
        this._newsService.getOneNews(this.newsId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(news => {
          this.newsContent = news
        })

        this.getComments(this.newsId)
        const userInfo:UserInfo = {
          id_noticias: this.getIdNews,
          id_usuarios: 'a3414a51-84dc-48f1-b967-9ad4106b8cba'
        }

        this.ratingService.getCalification(userInfo).subscribe(rating => {
          //TODO: Crear la lógica para taer los datos
          if(rating){
            this.rating = rating[0].valor
          }else {
            this.rating = 0
          }
        })

      }
    });

  }

  getComments (newsId: string) {
    this._commentService.getAllComments(newsId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(comments => {
        this.commentsByUser = comments
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleRatingSubmission(rating: number): void {
    const newsRating: CreateRating = {
      id_noticias: this.getIdNews,
      //TODO: Añadir la información del usuario
      id_usuarios: 'a3414a51-84dc-48f1-b967-9ad4106b8cba',
      valor: rating
    }
    this.ratingService.createCalifications(newsRating).subscribe(response => {
      console.log(response);
    })
  }

  handleCommentText(text: string): void {
    const commentToSend: CreateComment = {
      texto: text,
      //TODO: Agregar el dato del usuario cuando se cree la sesión
      id_usuarios: 'a3414a51-84dc-48f1-b967-9ad4106b8cba',
      id_noticias: this.getIdNews
    }

    this._commentService.createComment(commentToSend)
      .subscribe(response => {
        console.log(response);
        this.getComments(this.getIdNews)
      })
  }
}
