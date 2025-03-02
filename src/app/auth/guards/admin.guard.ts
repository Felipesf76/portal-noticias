import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminsService } from '@app/services/admins.service';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private adminService: AdminsService,
    private router: Router
  ) {}

  canActivate(): boolean{
      if (this.userService.isAdminSignal()) {
        return true;
      } else {
        return false
      }
  }
}
