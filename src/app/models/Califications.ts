export class Califications{
    constructor(
        public id_usuarios:string,
        public id_noticias:string,
        public valor:number
    ){}
}


export interface CreateRating {
  valor: number,
  id_usuarios: string,
  id_noticias: string
}
export interface UserInfo extends Omit<CreateRating, 'valor'> {}
