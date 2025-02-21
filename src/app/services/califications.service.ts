import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Califications, CreateRating, UserInfo } from "@app/models/Califications";
import { Observable } from "rxjs";

export var baseUrl = "http://147.93.114.243/api"

@Injectable({
  providedIn: 'root'
})
export class CalificationService{

    constructor(
      private http: HttpClient,
    ){ }

    getCalification(params: UserInfo): Observable<Califications[]>{
      return this.http.get<Califications[]>(`${baseUrl}/ratings`, {params})
    }

    createCalifications(ratings: CreateRating): Observable<string>{
      return this.http.post<string>(`${baseUrl}/ratings`, ratings)
    }
}
