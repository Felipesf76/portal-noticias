export class Publicity{
    constructor(
        public id:string, 
        public titulo:string,
        public url: string,
        public multimedia: string,
        public fecha_activacion: Date,
        public fecha_fin: Date,
        public fecha_publicacion: Date,
        public id_administrador: string
    )
    {
        
    }

}