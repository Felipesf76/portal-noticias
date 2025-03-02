import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';
import { Publicity } from '@app/models/Publicity';
import { Observable } from 'rxjs';

export var urlRecord = "http://147.93.114.243/api"

@Injectable()
export class PublicityService {

  constructor(
    private http: HttpClient
  ) { }


  getPublicity(): Observable<Publicity[]>{
    return  this.http.get<Publicity[]>(`${urlRecord}/advertisement`)
  }

  getPublicityRandom(): Observable<Publicity>{
    return  this.http.get<Publicity>(`${urlRecord}/advertisement/random`)
  }

  editPublicity(advertisement: FormData, idPublicity: string):Observable<string>{
    return this.http.post<string>(urlRecord+'/advertisement/'+idPublicity,advertisement)
  }


  deletePublicity(id_publicity: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  
    return this.http.delete(`${urlRecord}/advertisement/${id_publicity}`, { headers });
  }

    createPublicity(advertisement: FormData):Observable<string>{
      return this.http.post<string>(urlRecord+'/advertisement',advertisement)
    }


}
