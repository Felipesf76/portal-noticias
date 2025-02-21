import { Component } from '@angular/core';

@Component({
  selector: 'app-user-myprofile',
  templateUrl: './user-myprofile.component.html',
  styleUrl: './user-myprofile.component.css',
  providers: []
})
export class MyProfileComponent {
  
  //cambiar la API con el id del usuario de inicio de sesión
  user = {
    nombre_completo: 'Juan Pérez',
    corre: 'juan.perez@example.com',
    nombre_usuario: 'juanperez',
    fecha_nacimiento: new Date('1988-04-15'),
    sexo: 'Masculino'
  };

  constructor(){
   
  
  }
}
