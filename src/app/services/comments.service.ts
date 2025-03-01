import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Comments, CreateComment } from '@app/models/Comments';
import { Observable } from 'rxjs';

export var baseUrl = "http://147.93.114.243/api"


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  getAllComments(userId: string): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${baseUrl}/comments/${userId}`)
  }

  createComment(comment: CreateComment): Observable<Object> {
    return this.http.post<Object>(`${baseUrl}/comments`, comment)
  }
}
