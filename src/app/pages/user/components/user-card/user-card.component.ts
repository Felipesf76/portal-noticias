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
    public userList: User[] = []
    @Output() createUser = new EventEmitter<Array<any>>()
    @Output() editUser = new EventEmitter<User>()
    @Output() deleteUser = new EventEmitter<User>()
    @Output() fileSelected = new EventEmitter<File>()
    public new_user: any

    fechaNacimientoError: string = '';
    fechaFinError: string = '';
    public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


    constructor(
      private userService: UserService,
    ){

    }

    ngOnInit(): void {
      this.userService.getUsers().subscribe(
        (response) => {
          this.userList = response;
        }
      )
    }

    onAdd():void{

      this.createUser.emit(this.new_user)

    }

    onEdit(item:User):void{
      this.editUser.emit(item)
    }

    onDelete(item:User):void{
      this.deleteUser.emit(item)
    }

    //cambiar la validacion de acuerdo a los Usuarios
    validateDates() {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Asegurar que la comparación es solo por fecha

      const fechaActivacion = this.parseDate(this.new_user.fecha_activacion);
      const fechaFin = this.parseDate(this.new_user.fecha_fin);

      this.fechaNacimientoError = '';
      this.fechaFinError = '';

      // Validar que la fecha de activación sea mayor o igual a hoy
      if (fechaActivacion && fechaActivacion < today) {
          this.fechaNacimientoError = 'La fecha de activación debe ser hoy o una fecha futura.';
      }

      // Validar que la fecha de fin sea mayor a la fecha de activación
      if (fechaActivacion && fechaFin && fechaFin <= fechaActivacion) {
          this.fechaFinError = 'La fecha de fin debe ser mayor a la fecha de activación.';
      }

      // Validar que la fecha de fin no esté vacía
      if (!this.new_user.fecha_fin) {
        this.fechaFinError = 'La fecha de fin es obligatoria.';
      }

      // Si hay errores en fechas, marcamos el formulario como inválido
      this.customFormInvalid = !!(this.fechaNacimientoError || this.fechaFinError);
    }

    // Función para convertir 'YYYY-MM-DD' a una fecha sin problemas de zona horaria
    private parseDate(dateString: any): Date | null {
      if (!dateString || typeof dateString !== 'string') return null;
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day); // Ajustar mes porque en JS enero es 0
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        this.fileSelected.emit(file);
      }
    }

    handleNewUser(user: FormGroup): void {
      console.log(user.value);
      this.userService.createUser(user.value).subscribe(
        (response) => {
          console.log(response);
        }
      )
    }

    closeModal() {
      this.myModal.nativeElement.close()
    }

}
