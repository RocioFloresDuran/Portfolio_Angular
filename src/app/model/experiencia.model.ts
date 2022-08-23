export class experiencia{
    id?: number;
    nombre_org: String;
    area_cargo: String;
    anio_inicio: number;
    anio_fin: number;
    url_imagen: String;

    constructor(nombre_org: String, area_cargo: String, anio_inicio: number, anio_fin: number, url_imagen: String){
        this.nombre_org = nombre_org;
        this.area_cargo = area_cargo;
        this.anio_inicio = anio_inicio;
        this.anio_fin = anio_fin;
        this.url_imagen = url_imagen;
    }
}