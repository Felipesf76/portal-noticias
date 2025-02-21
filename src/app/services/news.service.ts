import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { News } from '@app/models/News';
import { Observable, of } from 'rxjs';

export var baseUrl = "http://147.93.114.243/api"

@Injectable()
export class NewsService {
  //private baseUrl = 'http://localhost'
  constructor(
    private http: HttpClient
  ) { }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(`${baseUrl}/news`)
  }

  getOneNews(id: string): Observable<News> {
    return this.http.get<News>(`${baseUrl}/news/${id}`)
  }


  // getNewsById(id: number) {
  //   return this.http.get(`${this.baseUrl}/api/news/${id}`)
  // }
  // createNews(news: any) {
  //   return this.http.post(`${this.baseUrl}/api/news`, news)
  // }
  // updateNews(news: any) {
  //   return this.http.put(`${this.baseUrl}/api/news`, news)
  // }
  // deleteNews(id: number) {
  //   return this.http.delete(`${this.baseUrl}/api/news/${id}`)
  // }
}
