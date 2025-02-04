import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '@shared/components/form/form.component';
import { FormField } from '@shared/components/form/model/form.model';

@Component({
  selector: 'app-register',
  imports: [FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = '';
    constructor() {
      this.title = 'Registrarse';
    }
    registerFields: FormField[] = [
      {
        type: 'text',
        label: 'Nombre Completo',
        name: 'fullName',
        validators: [Validators.required],
      },
      {
        type: 'text',
        label: 'Usuario único',
        name: 'userName',
        validators: [Validators.required],
      },
      {
        type: 'date',
        label: 'Fecha de nacimiento',
        name: 'birthDate',
        validators: [Validators.required],
      },
      {
        type: 'email',
        label: 'Correo Electrónico',
        name: 'email',
        validators: [Validators.required],
      },
      {
        type: 'password',
        label: 'Contraseña',
        name: 'password',
        validators: [Validators.required, Validators.minLength(6)],
      },
      {
        type: 'password',
        label: 'Validar contraseña',
        name: 'confirmPassword',
        validators: [Validators.required, Validators.minLength(6)],
      }
    ];
    onFormSubmit(formValues: object): void {
      //TODO: Lógica para registrarse
      console.log('Form Values in Parent:', formValues);
      // Aquí puedes hacer algo con los valores del formulario, como enviarlos a una API
    }
}
