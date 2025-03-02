import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { News } from '@app/models/News';
import { log } from 'console';
import { Observable, of } from 'rxjs';

export var baseUrl = "http://147.93.114.243/api"

@Injectable()
export class NewsService {
  constructor(
    private http: HttpClient
  ) { }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(`${baseUrl}/news`)
  }

  getOneNews(id: string): Observable<News> {
    return this.http.get<News>(`${baseUrl}/news/${id}`)
  }

  getNewsByUser(userId: string): Observable<News[]> {
    return this.http.get<News[]>(`${baseUrl}/news/user/${userId}`)
  }

  createNews(news: FormData): Observable<string> {
  console.log('Autor', news.get('autor'));

    return this.http.post<string>(`${baseUrl}/news`, news)
  }

  updateNews(news: FormData, newsId: string): Observable<string> {
    return this.http.post<string>(`${baseUrl}/news/${newsId}`, news)
  }

  deleteNews(newsId: string): Observable<string> {
    return this.http.delete<string>(`${baseUrl}/news/${newsId}`)
  }
}
