export class User {
  constructor(
    public id: string,
    public corre: string,
    public password: string,
    public nombre_usuario: string,
    public nombre_completo: string,
    public sexo: string,
    public fecha_nacimiento: Date
  ) {}
}
