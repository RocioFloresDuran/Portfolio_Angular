export class domicilio{

    id?: number;
    provincia: string;
    localidad: string;

    constructor(provincia:string, localidad: string){
        this.provincia = provincia;
        this.localidad = localidad;
    }

}