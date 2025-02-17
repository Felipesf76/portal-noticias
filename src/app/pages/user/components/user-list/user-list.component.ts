import { Component, inject, Input } from '@angular/core';
import { User } from '@app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() user:User = new User('','', '', '', '','',new Date())


  
}
