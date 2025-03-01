import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
    @Input() userEdit: User = new User('', '', '', '', '', '', new Date())
    @Output() formValues = new EventEmitter<FormGroup>();
    @Output() formValuesEdit = new EventEmitter<FormGroup>();
    @Output() closeModal = new EventEmitter<void>();

    createUserForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
      this.initializeForm()
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   if (changes['newsEdit'] || changes['categoriesList']) {
    //     this.initializeForm(true);
    //   }
    // }

    //private initializeForm(isEdit: boolean): void {
    private initializeForm(): void {
      // this.createUserForm = new FormGroup({
      //   nombre_usuario: new FormControl(this.userEdit?.nombre_usuario || '', [Validators.required, Validators.minLength(4)]),
      //   correo: new FormControl(this.userEdit?.correo || '', [Validators.required, Validators.minLength(10)]),
      //   genero: new FormControl(this.userEdit?.sexo || ''),
      //   fecha_nacimiento: new FormControl(this.userEdit?.fecha_nacimiento || ''),
      //   password: new FormControl(this.userEdit?.password || '', [Validators.required, Validators.minLength(10)])
      // });
      this.createUserForm = new FormGroup({
        nombre_usuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
        nombre_completo: new FormControl('', [Validators.required, Validators.minLength(4)]),
        correo: new FormControl('', [Validators.required, Validators.minLength(10)]),
        sexo: new FormControl(''),
        fecha_nacimiento: new FormControl(''),
        contrasena: new FormControl('', [Validators.required, Validators.minLength(10)])
      });
      // if (isEdit) {
      //   this.createUserForm = new FormGroup({
      //     titulo: new FormControl(this.newsEdit?.titulo || ''),
      //     descripcion: new FormControl(this.newsEdit?.descripcion || ''),
      //     categoria: new FormControl(''),
      //     pais: new FormControl(this.newsEdit?.pais || ''),
      //     fuente: new FormControl(this.newsEdit?.url || ''),
      //     multimedia: new FormControl('')
      //   });
      // } else {
      //   this.createNewsForm = new FormGroup({
      //     titulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      //     descripcion: new FormControl('', [Validators.required, Validators.minLength(100)]),
      //     categoria: new FormControl(''),
      //     pais: new FormControl('', Validators.required),
      //     fuente: new FormControl('', Validators.required),
      //     multimedia: new FormControl('')
      //   });
      //}

    }

    onSubmit(event: Event) {
      // event.preventDefault();
      // let formData = new FormData();

      // formData.append('titulo', this.createNewsForm.get('titulo')?.value);
      // formData.append('descripcion', this.createNewsForm.get('descripcion')?.value);
      // formData.append('id_categorias', this.createNewsForm.get('categoria')?.value);
      // formData.append('pais', this.createNewsForm.get('pais')?.value);
      // formData.append('url', this.createNewsForm.get('fuente')?.value);

      // if (this.selectedFile) {
      // formData.append('multimedia', this.selectedFile, this.selectedFile?.name);
      // }

      // console.log('titulo', formData.get('titulo'))
      // console.log('descripcion', formData.get('descripcion'))
      // console.log('id_categorias', formData.get('id_categorias'))
      // console.log('pais', formData.get('pais'))
      // console.log('url', formData.get('url'))
      // console.log('multimedia', formData.get('multimedia'))


      if(this.userEdit.id){
        this.formValuesEdit.emit(this.createUserForm);
      }else {
        this.formValues.emit(this.createUserForm);
      }
    }
    // Método para cerrar el modal
    onClose() {
      this.createUserForm.reset();
      this.closeModal.emit(); // Emite el evento
    }
}
