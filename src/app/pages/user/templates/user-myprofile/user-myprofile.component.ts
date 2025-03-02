import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { User } from '@app/models/User';
<<<<<<< HEAD
import { MatIconModule } from '@angular/material/icon';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator, passwordValidator } from '@app/shared/components/form/form.validators';
=======
import { SlidePublicidadComponent } from '@app/shared/components/slide-publicidad/slide-publicidad.component';
>>>>>>> origin/main

@Component({
  imports: [SlidePublicidadComponent],
  selector: 'app-user-myprofile',
  imports: [MatIconModule, UserFormComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-myprofile.component.html',
  styleUrl: './user-myprofile.component.css'
})
export class MyProfileComponent implements OnInit {
  @ViewChild('myModal') myModal: any
  @ViewChild('passwordModal') passwordModal: any
  @ViewChild('myModalChangePhoto') myModalChangePhoto: any
  public userInfo: User = {} as User;
  public isEditMode = true;
  changePasswordForm: FormGroup = new FormGroup({});
  changePhotoForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadData();
    this.changePasswordForm = new FormGroup({
      contrasenaVieja: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, passwordValidator]),
      repeatContrasena: new FormControl('', [Validators.required])
    },
    {
      validators: passwordMatchValidator
    })

    this.changePhotoForm = new FormGroup({
      multimedia: new FormControl('', [Validators.required])
    });
  }

  logout() {
    const result = this.userService.logout();
    if (result) {
      this.router.navigate(['/']);
    }else{
      console.log('No se pudo cerrar sesión');
    }
  }

  loadData() {
    const userId = sessionStorage.getItem('user_id');
    if (userId !== null) {
      this.userService.getById(userId).subscribe(
        (response) => {
          console.log(response);
          this.userInfo = response;
        }
      )
    }
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

  onSubmit(event: Event) {
    event.preventDefault();
    const userId = sessionStorage.getItem('user_id');
    const passwordData = {
      currentPassword: this.changePasswordForm.get('contrasenaVieja')?.value,
      newPassword: this.changePasswordForm.get('contrasena')?.value,
      id:userId
    }

    console.log('Contraseña', passwordData);


    if (userId) {
      this.userService.changePassword(passwordData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.changePasswordForm.reset()
            this.passwordModal.nativeElement.close()
          },
          error: (error) => {
            console.log('Error al cambiar la contraseña: ' + error.error.message);
          },
        });
    }
  }

  openChangePhotoModal(): void {
    this.myModalChangePhoto.nativeElement.show()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openModal(): void {
    this.myModal.nativeElement.show()
  }

  closeModal() {
    this.myModal.nativeElement.close()
  }

  onClose() {
    this.changePasswordForm.reset()
    this.passwordModal.nativeElement.close()
  }
  onClosePasswordModal() {
    this.changePhotoForm.reset()
    this.passwordModal.nativeElement.close()
  }

  onSubmitPhoto(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('multimedia', this.selectedFile, this.selectedFile?.name);
    }
    this.userService.changePhoto(formData, this.userInfo.id).subscribe({
      next: (response) => {
        console.log(response);
        this.changePhotoForm.reset()
        this.myModalChangePhoto.nativeElement.close()
      },
      error: (error) => {
        console.log('Error al cambiar la foto: ' + error.error.message);
      },
    });
  }

}
