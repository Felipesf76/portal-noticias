export class UserModel {
  constructor(
    public id: number,
    public fullName: string,
    public userName: string,
    public birthDate: Date,
    public email: string,
    public password: string
  ) {}
}
