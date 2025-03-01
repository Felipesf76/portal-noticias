export class Comments{
    constructor(
        public id:string,
        public fecha_comentario:Date,
        public texto: string,
        public id_usuarios: string,
        public id_noticias: string
    )
    {

    }
}

export interface CreateComment {
  texto: string,
  id_usuarios: string,
  id_noticias: string
}
