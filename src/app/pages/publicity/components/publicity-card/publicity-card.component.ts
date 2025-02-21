import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


import { Publicity } from '@app/models/Publicity';
import { Console } from 'console';
@Component({
  selector: 'app-publicity-card',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './publicity-card.component.html',
  styleUrl: './publicity-card.component.css',
})
export class PublicityCardComponent {
@Input() public record_publicity:Array<any>=[]
@Output() createPublicity = new EventEmitter<Array<any>>()
@Output() editPublicity = new EventEmitter<Publicity>()
@Output() deletePublicity = new EventEmitter<Publicity>()
@Output() fileSelected = new EventEmitter<File>()
public new_publicity: any

fechaActivacionError: string = '';
fechaFinError: string = '';
public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


 constructor(){
  this.new_publicity = {
    titulo:"",
    url:"",
    fecha_creacion: new Date(),
    fecha_activacion:'',
    fecha_fin: '',
    multimedia: null
  }
 }

onAdd():void{
  
  this.createPublicity.emit(this.new_publicity)
    
}

onEdit(item:Publicity):void{
  this.editPublicity.emit(item)
}

onDelete(item:Publicity):void{
  this.deletePublicity.emit(item)
}


validateDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegurar que la comparación es solo por fecha

  const fechaActivacion = this.parseDate(this.new_publicity.fecha_activacion);
  const fechaFin = this.parseDate(this.new_publicity.fecha_fin);

  this.fechaActivacionError = '';
  this.fechaFinError = '';

  // Validar que la fecha de activación sea mayor o igual a hoy
  if (fechaActivacion && fechaActivacion < today) {
      this.fechaActivacionError = 'La fecha de activación debe ser hoy o una fecha futura.';
  }

  // Validar que la fecha de fin sea mayor a la fecha de activación
  if (fechaActivacion && fechaFin && fechaFin <= fechaActivacion) {
      this.fechaFinError = 'La fecha de fin debe ser mayor a la fecha de activación.';
  }

  // Validar que la fecha de fin no esté vacía
  if (!this.new_publicity.fecha_fin) {
    this.fechaFinError = 'La fecha de fin es obligatoria.';
  }

   // Si hay errores en fechas, marcamos el formulario como inválido
   this.customFormInvalid = !!(this.fechaActivacionError || this.fechaFinError);
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


