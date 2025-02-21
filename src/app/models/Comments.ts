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
