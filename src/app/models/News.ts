export class News {
    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public multimedia: string,
        public pais: string,
        public autor: string,
        public url: string,
        public vistas: number,
        public fecha_creacion: Date,
        public id_usuarios: string,
        public id_categorias: string
    ){ }
}
