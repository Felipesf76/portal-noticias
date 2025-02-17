import { Component, inject, Input } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  public users: User[]
    constructor(private _userService: UserService){
      this.users = this._userService.getUsers()
    }

}
