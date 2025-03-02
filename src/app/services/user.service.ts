import { HttpClient } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';
import { CreateUser, FormValuesLogin, SessionInfo, User } from '@app/models/User';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AdminsService } from './admins.service';
import { Admins } from '@app/models/Admins';

export var urlRecord = "http://147.93.114.243/api"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAuthenticatedSignal = signal(this.checkAuthentication());
  public isAdminSignal = signal(false);

  currentUserId: string |null = ''

  constructor(
    private http: HttpClient,
    private adminService: AdminsService
  ) {
    this.checkAuthentication();
    this.checkAdminStatus();
  }

  private checkAuthentication(): boolean {
      if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('auth_token');
         return !!token
      }
      return false
  }

  private checkAdminStatus() {
    if (this.isAuthenticatedSignal()) {
      const userId = sessionStorage.getItem('user_id');
      if (userId) {
        this.adminService.getAdmins().pipe(
          tap((admins) => {
            this.isAdminSignal.set(admins.some((admin) => admin.id === userId));
          }),
          catchError(() => {
            this.isAdminSignal.set(false);
            return of(null);
          })
        ).subscribe();
      } else {
        this.isAdminSignal.set(false);
      }
    } else {
      this.isAdminSignal.set(false);
    }
  }

  private getIsAdmin(): boolean {
    return this.isAdminSignal();
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
          this.currentUserId = response.user.id
          this.isAuthenticatedSignal.set(true);
          this.checkAdminStatus();
        }
      })
    )
  }

  getCurrentUserId(): string | null {
    return this.currentUserId
  }

  logout(): Boolean | void {

    this.http.post(`${urlRecord}/logout`,'')
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

  getById(id: string): Observable<User>{
    return this.http.get<User>(`${urlRecord}/users/${id}`)
  }

  changePassword(passwords: Object): Observable<String>{
    return this.http.post<String>(`${urlRecord}/users/change-password`, passwords)
  }

  createUser(user: Object): Observable<String>{
    return this.http.post<String>(`${urlRecord}/users`, user)
  }

  editUser(user: Object, userId: string): Observable<String>{
    return this.http.put<String>(`${urlRecord}/users/${userId}`, user)
  }

  deleteUser(id: string): Observable<String>{
    return this.http.delete<String>(`${urlRecord}/users/${id}`)
  }
  changePhoto(formData: FormData, userId: string): Observable<String>{
    return this.http.post<String>(`${urlRecord}/users/change-photo/${userId}`, formData)
  }

}
