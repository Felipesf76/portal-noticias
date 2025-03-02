import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,  ViewChild, ElementRef } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


import { Publicity } from '@app/models/Publicity';

@Component({
  selector: 'app-publicity-card',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './publicity-card.component.html',
  styleUrl: './publicity-card.component.css',
})
export class PublicityCardComponent {
@ViewChild('myModal') myModal!: ElementRef<HTMLDialogElement>;
@Input() public record_publicity:Array<any>=[]
@Output() createPublicity = new EventEmitter<FormData>()
@Output() editPublicity = new EventEmitter<FormData>()
@Output() deletePublicity = new EventEmitter<Publicity>()
@Output() fileSelected = new EventEmitter<File>()
public new_publicity: any
public is_editing: boolean  = false;
selectedFile: File | null = null;
fechaActivacionError: string = '';
fechaFinError: string = '';
public customFormInvalid: boolean = true; // Nueva propiedad para forzar la invalidación del formulario


 constructor(){
  this.new_publicity = {
    titulo: '',
    url: '',
    fecha_activacion: '',
    fecha_fin: '',
    multimedia: null,
    fecha_publicacion: '',
    id_administrador: ''
};
 }


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

onAdd():void{

    this.new_publicity.id_administrador = sessionStorage.getItem('user_id');
    
    let formData = new FormData();

    formData.append('titulo',this.new_publicity.titulo)
    formData.append('url',this.new_publicity.url)
    formData.append('fecha_activacion',this.new_publicity.fecha_activacion)
    formData.append('fecha_fin',this.new_publicity.fecha_fin)
    formData.append('fecha_publicacion',this.new_publicity.fecha_publicacion)
    formData.append('id_administrador',this.new_publicity.id_administrador)
    
    if (this.selectedFile) {
      formData.append('multimedia', this.selectedFile, this.new_publicity.multimedia);
      }

    if (this.is_editing){

      this.is_editing = false;
      formData.append('id', this.new_publicity.id);
      this.editPublicity.emit(formData )

    } else{

      this.new_publicity.fecha_publicacion = new Date().toISOString().split('T')[0];
      formData.append('fecha_publicacion',this.new_publicity.fecha_publicacion)
      this.createPublicity.emit(formData)
    }

    this.myModal.nativeElement.close()
  
    
}

onEdit(item:Publicity):void{

  this.is_editing = true
  this.new_publicity = item
  this.myModal.nativeElement.showModal()

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

}


