import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '@app/models/User';
import { dateAfterValidator, passwordValidator } from '@app/shared/components/form/form.validators';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
    @Input() userEdit: User = new User('', '', '', '', '', '', new Date())
    @Input() isEditMode: boolean = false
    @Output() formValues = new EventEmitter<Object>();
    @Output() formValuesEdit = new EventEmitter<{formData: Object, userId: string}>();
    @Output() closeModal = new EventEmitter<void>();

    createUserForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
     //this.initializeForm(false)
     this.createUserForm = new FormGroup({
      nombre_usuario: new FormControl('', [Validators.required, Validators.minLength(5)]),
      nombre_completo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      sexo: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [dateAfterValidator, Validators.required]),
      contrasena: new FormControl('', [Validators.required, passwordValidator])
    });
     console.log('userEdit', this.userEdit)
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (this.isEditMode && this.userEdit) {
        this.createUserForm.patchValue(this.userEdit)
        //this.initializeForm(true);
      }else {
        this.createUserForm.reset()
      }
    }

    onSubmit(event: Event) {
      event.preventDefault();
      const formData = {
        nombre_usuario: this.createUserForm.get('nombre_usuario')?.value,
        nombre_completo: this.createUserForm.get('nombre_completo')?.value,
        correo: this.createUserForm.get('correo')?.value,
        contrasena: this.createUserForm.get('contrasena')?.value,
        sexo: this.createUserForm.get('sexo')?.value,
        fecha_nacimiento: this.createUserForm.get('fecha_nacimiento')?.value
      };
      console.log(formData);

      const userId = this.userEdit.id;

      if(this.isEditMode){
        this.formValuesEdit.emit({formData, userId});
        this.createUserForm.updateValueAndValidity();
      }else {
        this.formValues.emit(formData);
      }
    }
    // Método para cerrar el modal
    onClose() {
      this.createUserForm.reset();
      this.closeModal.emit(); // Emite el evento
    }
}
