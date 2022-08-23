import { domicilio } from "./domicilio.model";

export class persona{
    id?: number;
    nombres: String;
    apellidos:String;
    fecha_nac: Date;
    nacionalidad: String;
    descripcion: String
    ocupacion: String;
    mail: String;
    url_foto: String;
    url_header: String;
    domicilio: domicilio;

    constructor(nombres: String, apellidos:String, fecha_nac: Date, nacionalidad: String, descripcion: String, ocupacion: String, mail: String, url_foto: String, url_header: String, domicilio: domicilio){
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fecha_nac = fecha_nac;
        this.nacionalidad = nacionalidad;
        this.descripcion = descripcion;
        this.ocupacion = ocupacion;
        this.mail = mail;
        this.url_foto = url_foto;
        this.url_header = url_header;
        this.domicilio = domicilio;
    }

}