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
  @Input() newsEdit: News = new News('', '', '', '', '', '', 0, new Date(), '', '','')
  @Input() categoriesList: Categories[] = []
  @Input() isEditMode: boolean = false
  @Output() formValues = new EventEmitter<FormData>();
  @Output() formValuesEdit = new EventEmitter<FormData>();
  @Output() closeModal = new EventEmitter<void>();

  createNewsForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  public categories: Categories[] = []

  ngOnInit(): void {
    this.updateCategories()
    this.createNewsForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(100)]),
      categoria: new FormControl(''),
      pais: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      multimedia: new FormControl('')
    });
    //this.initializeForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode && this.newsEdit) {
      const userEditSinFile = { ...this.newsEdit };
      delete userEditSinFile.multimedia;
      this.createNewsForm.patchValue(userEditSinFile)
      //this.initializeForm(true);
    }else {
      this.createNewsForm.reset()
    }
  }

  private initializeForm(isEdit: boolean): void {
    if (isEdit) {
      this.createNewsForm = new FormGroup({
        titulo: new FormControl(this.newsEdit?.titulo || ''),
        descripcion: new FormControl(this.newsEdit?.descripcion || ''),
        categoria: new FormControl(''),
        pais: new FormControl(this.newsEdit?.pais || ''),
        fuente: new FormControl(this.newsEdit?.url || ''),
        multimedia: new FormControl('')
      });
    } else {
      this.createNewsForm = new FormGroup({
        titulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
        descripcion: new FormControl('', [Validators.required, Validators.minLength(100)]),
        categoria: new FormControl(''),
        pais: new FormControl('', Validators.required),
        fuente: new FormControl('', Validators.required),
        multimedia: new FormControl('')
      });
    }

  }

  private updateCategories():void {
    this.categories = this.categoriesList
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: Event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('titulo', this.createNewsForm.get('titulo')?.value);
    formData.append('descripcion', this.createNewsForm.get('descripcion')?.value);
    formData.append('id_categorias', this.createNewsForm.get('categoria')?.value);
    formData.append('pais', this.createNewsForm.get('pais')?.value);
    formData.append('url', this.createNewsForm.get('url')?.value);

    if (this.selectedFile) {
    formData.append('multimedia', this.selectedFile, this.selectedFile?.name);
    }
    if(this.newsEdit.id){
      this.formValuesEdit.emit(formData);
    }else {
      this.formValues.emit(formData);
    }
  }
  // Método para cerrar el modal
  onClose() {
    this.createNewsForm.reset();
    this.closeModal.emit(); // Emite el evento
  }
}
