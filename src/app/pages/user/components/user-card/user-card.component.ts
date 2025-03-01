import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormGroup, FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

import { User } from '@app/models/User'
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, MatIconModule, FormsModule, UserFormComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
    @ViewChild('myModal') myModal: any
    @ViewChild('myModalDelete') myModalDelete: any
    public userList: User[] = []
    @Output() createUser = new EventEmitter<Array<any>>()
    @Output() editUser = new EventEmitter<User>()
    @Output() deleteUser = new EventEmitter<User>()
    @Output() fileSelected = new EventEmitter<File>()
    public new_user: any
    public userId: string = '';

    fechaNacimientoError: string = '';
    fechaFinError: string = '';
    public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


    constructor(
      private userService: UserService,
    ){

    }

    ngOnInit(): void {
      this.loadData()
    }

    loadData(): void {
      this.userService.getUsers().subscribe(
        (response) => {
          this.userList = response;
        }
      )
    }

    onEdit(item:User):void{
      this.editUser.emit(item)
    }

    onDelete(item:User):void{
      this.deleteUser.emit(item)
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        this.fileSelected.emit(file);
      }
    }

    handleNewUser(user: FormGroup): void {
      this.myModal.nativeElement.close();
      this.userService.createUser(user.value).subscribe(
        (response) => {
          console.log(response);
          this.loadData()
        }
      )
    }

    openConfirmation(id: string) {
      this.userId = id
      this.myModalDelete.nativeElement.show()
    }

    DeleteUser(): void {
      this.myModalDelete.nativeElement.close();
      if (this.userId !== null){
        const id = this.userId
        this.userService.deleteUser(id).subscribe(res => {
          console.log(res);
          this.loadData()
        })
      }
    }

    closeModal() {
      this.myModal.nativeElement.close()
    }

}
