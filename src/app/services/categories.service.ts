import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

export var urlRecord = "http://147.93.114.243/api/"

@Injectable()
export class CategorieService {

  constructor
  (
    private http: HttpClient
  ) {

  }

  getCategories(): Observable<any>{
    return  this.http.get(urlRecord+'categories')
  }

  
}
