import { Component, inject, Input } from '@angular/core';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [UserService]
})
export class UserListComponent {
  @Input() user: any; // Asegúrate de tener esta propieda
   public users: User[]
    constructor(private _userService: UserService){
      this.users = this._userService.getUsers()
    }
}
