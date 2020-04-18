import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion{
    fecha: Date;
    fechafinal: Date;
    cliente : DocumentReference;
    precios: DocumentReference;
    subtotal: number;
    isv: number;
    total: number;

    constructor(){
        this.fecha = null;
        this.fechafinal = null;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.subtotal = this.subtotal;
        this.isv = this.isv;
        this.total = this.total;
    }

    validar(): any{
        let respuesta = {
            esvalido: true,
            mensaje: ''
        }
        if(this.cliente == null || this.cliente == undefined)
        {
            respuesta.esvalido = false;
            respuesta.mensaje = 'Seleccione un cliente';
            return respuesta;
        }
        if(this.precios == null || this.precios == undefined)
        {
            respuesta.esvalido = false;
            respuesta.mensaje = 'Seleccione un precio';
            return respuesta;
        }
       
        respuesta.esvalido = true;
        return respuesta;

    }
    

}