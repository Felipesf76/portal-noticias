import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from '@shared/components/form/form.component';
import { FormField } from '@shared/components/form/model/form.model';
import { isEmptyValidator, minimunLenghtValidator } from '@form/form.validators';
import { UserService } from '@app/services/user.service';
import { FormValuesLogin } from '@app/models/User';
import { log } from 'console';


@Component({
  selector: 'app-login',
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = '';

  constructor(
    private userService: UserService,
    private router: Router
  )
  {
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

  onFormSubmit(formValues: FormValuesLogin): void {

    // Llamar al servicio login y suscribirse a la respuesta
    this.userService.login(formValues.name, formValues.password).subscribe({
      next: (response) => {
        console.log('Login Success:', response);

        // Almacenar token en sessionStorage y user_id
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('auth_token', response.token);
          sessionStorage.setItem('user_id', response.user.id);
        }
        if (this.userService.isLoggedIn()) {
          console.log('Redirigir a noticias');
          this.router.navigate(['/news']);
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
      }
    });
  }

}
