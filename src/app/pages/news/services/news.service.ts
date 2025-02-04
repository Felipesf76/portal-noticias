import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient)
  //TODO: Change to real url
  private baseUrl = 'http://localhost'
  constructor() { }
  getNews() {
    return this.http.get(`${this.baseUrl}/api/news`)
  }
  getNewsById(id: number) {
    return this.http.get(`${this.baseUrl}/api/news/${id}`)
  }
  createNews(news: any) {
    return this.http.post(`${this.baseUrl}/api/news`, news)
  }
  updateNews(news: any) {
    return this.http.put(`${this.baseUrl}/api/news`, news)
  }
  deleteNews(id: number) {
    return this.http.delete(`${this.baseUrl}/api/news/${id}`)
  }
}
