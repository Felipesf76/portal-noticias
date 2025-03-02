import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Admins } from "@app/models/Admins";
import { map, Observable } from "rxjs";

export var urlRecord = "http://147.93.114.243/api"

@Injectable({
  providedIn: 'root'
})
export class AdminsService{

    constructor(
      private http: HttpClient
    ){}
    getAdmins(): Observable<Admins[]>{
        return this.http.get<Admins[]>(`${urlRecord}/administrator`);
    }

    getAdminById(id: string): Observable<Admins>{
        return this.http.get<Admins>(`${urlRecord}/administrator/${id}`);
    }

    createAdmin(userId: Object): Observable<string>{
        return this.http.post<string>(`${urlRecord}/administrator`, userId);
    }

    deleteAdmin(userId: string): Observable<string>{
        return this.http.delete<string>(`${urlRecord}/administrator/${userId}`);
    }
}
