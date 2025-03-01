import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from '@app/models/User';
import { UserService } from '@app/services/user.service';
import { dateAfterValidator, passwordMatchValidator, passwordValidator } from '@app/shared/components/form/form.validators';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
    title = '';
    createUserForm: FormGroup = new FormGroup({});
    constructor(
      private userService: UserService,
      private router: Router
    ) {
      this.title = 'Registrarse';
    }

    ngOnInit(): void {
      this.createUserForm = new FormGroup({
              nombre_usuario: new FormControl('', [Validators.required, Validators.minLength(5)]),
              nombre_completo: new FormControl('', [Validators.required, Validators.minLength(4)]),
              correo: new FormControl('', [Validators.required, Validators.email]),
              sexo: new FormControl('', [Validators.required]),
              fecha_nacimiento: new FormControl('', [dateAfterValidator, Validators.required]),
              contrasena: new FormControl('', [Validators.required, passwordValidator]),
              repeatContrasena: new FormControl('', [Validators.required])
            },
            {
              validators: passwordMatchValidator
            }
          );
    }

    onFormSubmit(): void {
      const createUserForm = this.createUserForm;
      this.userService.createUser(createUserForm.value).subscribe(
        (response) => {
          console.log(response);
        }
      )
    }

    onSubmit(event: Event) {
      event.preventDefault();
      const formValues = {
        nombre_usuario: this.createUserForm.get('nombre_usuario')?.value,
        nombre_completo: this.createUserForm.get('nombre_completo')?.value,
        correo: this.createUserForm.get('correo')?.value,
        sexo: this.createUserForm.get('sexo')?.value,
        fecha_nacimiento: this.createUserForm.get('fecha_nacimiento')?.value,
        contrasena: this.createUserForm.get('contrasena')?.value
      }
      console.log('Form Values in Parent:', formValues);
      // Aquí puedes hacer algo con los valores del formulario, como enviarlos a una API
      this.userService.createUser(formValues).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
        }
      )
    }
}
