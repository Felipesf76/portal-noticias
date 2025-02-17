import { Component, inject, Input } from '@angular/core';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() user:User = new User('','', '', '', '','',new Date())
}
