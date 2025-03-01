import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { passwordValidator } from '@form/form.validators';
import { UserService } from '@app/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = '';
  loginUserForm: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private router: Router
  )
  {
    this.title = 'Iniciar Sesión';
  }

  ngOnInit(): void {
    this.loginUserForm = new FormGroup({
            correo: new FormControl('', [Validators.required, Validators.email]),
            contrasena: new FormControl('', [Validators.required, passwordValidator])
          }
        );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.userService.login(this.loginUserForm.value).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        if (this.userService.isLoggedIn()) {
          this.router.navigate(['/news']);
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
      }
    });
  }

}
