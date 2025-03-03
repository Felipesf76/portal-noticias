import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [UserService]
})
export class UserListComponent {
  public record_user: User[] = [] as User[];

  constructor(
    private userService: UserService
  ){
    this.userService.getUsers().subscribe(
      (response) => {
        this.record_user = response;
      }
    )
  }

  public createUser(new_user: Array<any>):void{
    console.log("Creando Usuario: ", new_user)
  }

  public editUser(item: User):void{
    console.log("Editando Usuario: ", item.nombre_completo)
  }

  public deleteUser(item: User):void{
    console.log("Eliminando Usuario: ", item.nombre_completo)
  }

}
