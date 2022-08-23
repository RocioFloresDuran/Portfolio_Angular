export class educacion{
    id?: number;
    escuela: string;
    titulo: string;
    carrera: string;
    anio_inicio: number;
    anio_fin: number;
    url_imagen: string;

    constructor(escuela:string, titulo:string, carrera:string, anio_inicio:number, anio_fin:number, url_imagen:string){
        this.escuela = escuela;
        this.titulo = titulo;
        this.carrera = carrera;
        this.anio_inicio = anio_inicio;
        this.anio_fin = anio_fin;
        this.url_imagen = url_imagen;
    }
}