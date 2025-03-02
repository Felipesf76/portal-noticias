import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormGroup, FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

import { User } from '@app/models/User'
import { UserService } from '@app/services/user.service';
import { AdminsService } from '@app/services/admins.service';
import { Admins } from '@app/models/Admins';

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
    public adminsList: Admins[] = []
    public userInfo: User = new User('', '', '', '', '', '', new Date())
    isEditMode = false;

    fechaNacimientoError: string = '';
    fechaFinError: string = '';
    public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


    constructor(
      private userService: UserService,
      private adminService: AdminsService,
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
      this.adminService.getAdmins().subscribe(
        (response) => {
          this.adminsList = response;
        }
      )
    }

    onEdit(item:User):void{
      this.isEditMode = true
      this.userInfo = item
      this.myModal.nativeElement.show()
    }

    onDelete(item:User):void{
      this.deleteUser.emit(item)
    }

    handleNewUser(user: Object): void {
      this.myModal.nativeElement.close();
      this.userService.createUser(user).subscribe(
        (response) => {
          console.log(response);
          this.loadData()
        }
      )
    }

    handleEditUser(data: {formData: Object, userId: string}): void {
      this.myModal.nativeElement.close();
      this.userService.editUser(data.formData, data.userId).subscribe(
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

    createModalopen() {
      this.isEditMode = false
      this.myModal.nativeElement.show();
    }

    isAdministrator(userId: string): boolean {
      return !!this.adminsList.find(item => item.id === userId);
    }

    toggleAdmin(userId: string): void {
      const data = {
        id: userId
      }

      if (!this.isAdministrator(userId)) {
        this.adminService.createAdmin(data).subscribe(res => {
          console.log(res);
          this.loadData()
        })
      }else{
        this.adminService.deleteAdmin(userId).subscribe(res => {
          console.log(res);
          this.loadData()
        })
      }
    }

    closeModal() {
      this.myModal.nativeElement.close()
    }

}
