import { Component } from '@angular/core';
import { Comments } from '@app/models/Comments';
import { CommentService } from '@services/comments.service';
import { NewsRatingComponent } from '@app/pages/califications/components/news-rating/news-rating.component';
import { NewsCommentsListComponent } from '../../components/news-comments-list/news-comments-list.component';
import { FormAddCommentComponent } from '../../components/form-add-comment/form-add-comment.component';


@Component({
  selector: 'app-news-detail',
  imports: [NewsRatingComponent, NewsCommentsListComponent, FormAddCommentComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
  providers: [CommentService]
})
export class NewsDetailComponent {
  public comments: Comments[]
  constructor(private _commentService: CommentService){
    this.comments = this._commentService.getComments()
  }
  handleRatingSubmission(rating: number): void {
    //TODO: Añadir la información de la calificación
    console.log(rating);
  }
  handleCommentText(text: string): void {
    //TODO: Añadir la información del comentario
    console.log(text);
  }
}
