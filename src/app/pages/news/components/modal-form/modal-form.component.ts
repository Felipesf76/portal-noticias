import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Categories } from '@app/models/Categories';
import { News } from '@app/models/News';


@Component({
  selector: 'app-modal-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css',
})
export class ModalFormComponent implements OnInit {
  @Input() newsEdit: News = new News('', '', '', '', '', '', '', 0, new Date(), '', '')
  @Input() categoriesList: Categories[] = []
  @Output() formValues = new EventEmitter<FormData>();
  @Output() formValuesEdit = new EventEmitter<FormData>();
  @Output() closeModal = new EventEmitter<void>();

  createNewsForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  public categories: Categories[] = []

  ngOnInit(): void {
    this.updateCategories()
    this.initializeForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newsEdit'] || changes['categoriesList']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.createNewsForm = new FormGroup({
      titulo: new FormControl(this.newsEdit?.titulo || '', [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl(this.newsEdit?.descripcion || '', [Validators.required, Validators.minLength(100)]),
      categoria: new FormControl('', Validators.required),
      pais: new FormControl(this.newsEdit?.pais || '', Validators.required),
      fuente: new FormControl(this.newsEdit?.url || '', Validators.required),
      multimedia: new FormControl('', Validators.required)
    });
  }

  private updateCategories():void {
    this.categories = this.categoriesList
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Obtiene el archivo seleccionado
  }
  onSubmit(event: Event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('titulo', this.createNewsForm.get('titulo')?.value);
    formData.append('descripcion', this.createNewsForm.get('descripcion')?.value);
    formData.append('id_categorias', this.createNewsForm.get('categoria')?.value);
    formData.append('pais', this.createNewsForm.get('pais')?.value);
    formData.append('url', this.createNewsForm.get('fuente')?.value);

    if (this.selectedFile) {
    formData.append('multimedia', this.selectedFile, this.selectedFile?.name);
    }
    console.log(formData.values);

    // if(this.newsEdit.id){
    //   this.formValuesEdit.emit(formData);
    // }else {
      this.formValues.emit(formData);

  }
  // Método para cerrar el modal
  onClose() {
    this.createNewsForm.reset();
    this.closeModal.emit(); // Emite el evento
  }
}
