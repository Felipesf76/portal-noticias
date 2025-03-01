import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-myprofile',
  templateUrl: './user-myprofile.component.html',
  styleUrl: './user-myprofile.component.css'
})
export class MyProfileComponent implements OnInit {
  public userInfo: User = {} as User;

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('user') as string);
    console.log('User myprofile');
    console.log(this.user);
  }

  logout() {
    const result = this.userService.logout();
    if (result) {
      this.router.navigate(['/']);
    }else{
      console.log('No se pudo cerrar sesión');
    }
  }

  //cambiar la API con el id del usuario de inicio de sesión
  user = {
    nombre_completo: 'Juan Pérez',
    corre: 'juan.perez@example.com',
    nombre_usuario: 'juanperez',
    fecha_nacimiento: new Date('1988-04-15'),
    sexo: 'Masculino'
  };

}
