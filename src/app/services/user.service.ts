import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { User } from '@app/models/User';
import { BehaviorSubject, Observable } from 'rxjs';

export var urlRecord = "http://147.93.114.243/api/"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    try {
      if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('auth_token');
        const isAuthenticated = !!token;
        this.isAuthenticatedSubject.next(isAuthenticated);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    } catch (error) {
      console.error('Error al acceder a sessionStorage:', error);
      this.isAuthenticatedSubject.next(false);
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login (mail: string, password:string): Observable<any>{
    const loginData = { correo: mail, contrasena: password };
    this.isAuthenticatedSubject.next(true);
    return this.http.post(urlRecord+'login', loginData)
  }

  getUsers(): Array<User>{
    return  [
        new User('2537a549-0968-4d00-9a98-f8f23e60e3c2','juan.perez@example.com', 'password123', 'juanperez', 'Juan Pérez', 'M', new Date('1988-04-15')),
        new User('bb383bbb-7a4a-4ba3-ada2-4d33559cd916', 'maria.garcia@example.com', 'securepass', 'mariag', 'María García', 'F', new Date('1992-08-30')),
        new User('a3414a51-84dc-48f1-b967-9ad4106b8cba','carlos.hernandez@example.com', 'abc12345', 'carlosh', 'Carlos Hernández', 'M', new Date('1995-06-20')),
        new User('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', 'ana.lopez@example.com', 'mypassword', 'analopez', 'Ana López', 'F', new Date('1990-12-12')),
        new User('4fa006d9-e5cc-47ea-b885-eb3d0085c17a', 'luis.rodriguez@example.com', 'rodriguez89', 'luisr', 'Luis Rodríguez', 'M', new Date('1989-11-05')),
        new User('a081b055-2929-4fbe-a715-713bf38430e7', 'sofia.martinez@example.com', 'sofia2023', 'sofiamtz', 'Sofía Martínez', 'F', new Date('1997-03-10')),
        new User('18349965-b565-42c1-a943-e8b6a6b2df21', 'pedro.gomez@example.com', 'passwordPedro', 'pedrogz', 'Pedro Gómez', 'M', new Date('1993-09-18')),
        new User('a1928160-ee2a-4dcd-b75d-e15b9e0122d0', 'claudia.torres@example.com', 'claudiapass', 'claudiat', 'Claudia Torres', 'F', new Date('1996-07-25')),
        new User('9b3588cb-6f6a-4e9e-848c-86e22dd3c205', 'diego.ramirez@example.com', 'diego987', 'diegoram', 'Diego Ramírez', 'M', new Date('1991-01-07'))
    ]
  }
}
