import { HttpClient } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';
import { CreateUser, FormValuesLogin, SessionInfo, User } from '@app/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export var urlRecord = "http://147.93.114.243/api"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAuthenticatedSignal = signal(this.checkAuthentication());

  constructor(
    private http: HttpClient
  ) {
    this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
      if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('auth_token');
         return !!token
      }
      return false
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  login (loginData: FormValuesLogin) : Observable<SessionInfo>{
    return this.http.post<SessionInfo>(`${urlRecord}/login`, loginData).pipe(
      tap((response: SessionInfo) => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('auth_token', response.token);
          sessionStorage.setItem('user_id', response.user.id);
          sessionStorage.setItem('user', JSON.stringify(response.user));
          this.isAuthenticatedSignal.set(true);
        }
      })
    )
  }

  logout(): Boolean | void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('user');
      this.isAuthenticatedSignal.set(false);
      return true
    }
    return false
  }


  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${urlRecord}/users`)
  }

  createUser(user: CreateUser): Observable<String>{
    return this.http.post<String>(`${urlRecord}/users`, user)
  }

  deleteUser(id: string): Observable<String>{
    return this.http.delete<String>(`${urlRecord}/users/${id}`)
  }

}
