import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '@shared/components/form/form.component';
import { FormField } from '@shared/components/form/model/form.model';
import { isEmptyValidator, minimunLenghtValidator } from '@form/form.validators';

@Component({
  selector: 'app-login',
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = '';
  constructor() {
    this.title = 'Iniciar Sesión';
  }
  registerFields: FormField[] = [
    {
      type: 'text',
      label: 'Usuario o Correo electrónico',
      name: 'name',
      validators: [isEmptyValidator],
    },
    {
      type: 'password',
      label: 'Contraseña',
      name: 'password',
      validators: [minimunLenghtValidator(6)],
    }
  ];
  onFormSubmit(formValues: object): void {
    //TODO: Lógica para iniciar sesión
    console.log('Form Values in Parent:', formValues);
    // Aquí puedes hacer algo con los valores del formulario, como enviarlos a una API
  }
}
