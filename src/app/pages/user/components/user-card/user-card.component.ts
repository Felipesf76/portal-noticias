import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


import { User } from '@app/models/User';
import { Console } from 'console';
@Component({
  selector: 'app-user-card',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
@Input() public record_user:Array<any>=[]
@Output() createUser = new EventEmitter<Array<any>>()
@Output() editUser = new EventEmitter<User>()
@Output() deleteUser = new EventEmitter<User>()
@Output() fileSelected = new EventEmitter<File>()
public new_user: any

fechaActivacionError: string = '';
fechaFinError: string = '';
public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


 constructor(){
  this.new_user = {
    corre:"",
    password:"",
    nombre_usuario: new Date(),
    nombre_completo:'',
    sexo: '',
    fecha_nacimiento: null
  }
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


validateDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegurar que la comparación es solo por fecha

  const fechaNacimiento = this.parseDate(this.new_user.fecha_nacimiento);


  //this.fechaActivacionError = '';
  //this.fechaFinError = '';

  // Validar que la fecha de activación sea mayor o igual a hoy
  //if (fechaActivacion && fechaActivacion < today) {
   //   this.fechaActivacionError = 'La fecha de activación debe ser hoy o una fecha futura.';
  //}

  // Validar que la fecha de fin sea mayor a la fecha de activación
  //if (fechaActivacion && fechaFin && fechaFin <= fechaActivacion) {
      //this.fechaFinError = 'La fecha de fin debe ser mayor a la fecha de activación.';
  //}

  // Validar que la fecha de fin no esté vacía
  //if (!this.new_publicity.fecha_fin) {
  //  this.fechaFinError = 'La fecha de fin es obligatoria.';
  //}

   // Si hay errores en fechas, marcamos el formulario como inválido
   //this.customFormInvalid = !!(this.fechaActivacionError || this.fechaFinError);
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
}


