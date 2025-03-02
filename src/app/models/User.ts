export class User {
  constructor(
    public id: string,
    public correo: string,
    public contrasena: string,
    public nombre_usuario: string,
    public nombre_completo: string,
    public sexo: string,
    public fecha_nacimiento: Date,
    public multimedia?: string
  ) {}
}

export interface CreateUser {
  nombre_usuario: string,
  nombre_completo: string,
  correo: string,
  sexo: string,
  fecha_nacimiento: Date,
  contrasena: string
}

export interface FormValuesLogin {
  correo: string;
  contrasena: string
}

export interface SessionInfo {
  token: string,
  user: User
}
