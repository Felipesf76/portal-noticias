import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

export var urlRecord = "http://147.93.114.243/api/"


@Injectable()
export class SubscriptionService {

  constructor
  (
    private http:HttpClient
  ) { 

  }
  
  getSubscription(): Observable<any>{
    return this.http.get(urlRecord+'subscriptions')
  }

  getSubscriptionByUser(id_user:string): Observable<any>{
    return this.http.get(urlRecord+'subscriptions'+"/"+id_user)
  }  
 
  deleteSubscription(id_categoria: string, id_usuarios: string): Observable<any> {
    return this.http.delete(urlRecord+'subscriptions', { body: { id_categoria, id_usuarios } });
  }

  createSubscription(id_categoria:string, id_usuarios:string):Observable<any>{
    return this.http.post(urlRecord+'subscriptions', {id_categoria, id_usuarios})
  }
}
