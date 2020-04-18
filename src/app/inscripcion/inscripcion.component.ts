import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../model/inscripcion';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../model/precio';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MensajesService } from '../Servicios/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
 inscripcion : Inscripcion  = new Inscripcion();
 clienteseleccionado: Cliente = new Cliente();
 precioSeleccionado: Precio = new Precio();
 precios: Precio [] = new Array <Precio>();
 idprecio: string = 'null';

  constructor(private db: AngularFirestore, private mensaje: MensajesService) { }


  ngOnInit(): void {
    this.db.collection('Precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref =item.ref;
        this.precios.push(precio);
      })
    })
  }

  asignarcli(cliente: Cliente)
  {
    this.inscripcion.cliente = cliente.ref;
    this.clienteseleccionado = cliente;
  }

  eliminarcliente()
  {
      this.clienteseleccionado = new Cliente();
      this.inscripcion.cliente = undefined;
  }

  guardar(){
    if(this.inscripcion.validar().esvalido){
      let inscripagregar = 
      {
        fecha: this.inscripcion.fecha,
        fechafinal: this.inscripcion.fechafinal,
        cliente : this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subtotal: this.inscripcion.subtotal,
        isv: this.inscripcion.isv,
        total: this.inscripcion.total,
      }
      this.db.collection('Inscripciones').add(inscripagregar).then((resultado)=>{
        this.inscripcion = new Inscripcion();
        this.clienteseleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idprecio = 'null';
        this.mensaje.menssajeok('Guardado', 'Se guardo correctamente');
      }).catch(()=>{
        this.mensaje.menssajeerror('Error', 'No se guardo correctamente');
      })
      
    }  
  else
    {
        this.mensaje.menssajeAdvertencia('Advertencia', this.inscripcion.validar().mensaje);
        
    }
  }

  seleccionarPrecio(id: string){

    if(id != "null"){
      this.precioSeleccionado = this.precios.find(x=> x.id == id);
    this.inscripcion.precios = this.precioSeleccionado.ref;
    this.inscripcion.subtotal = this.precioSeleccionado.costo;
    this.inscripcion.isv = this.inscripcion.subtotal * 0.22;
    this.inscripcion.total = this.inscripcion.subtotal + this.inscripcion.isv;

    this.inscripcion.fecha = new Date();

    if(this.precioSeleccionado.tipoduracion == 1){
      // Calculo fecha final
      // 0 enero, 1 febrero .... 11 Diciembre en Javascript
      let dia: number = this.precioSeleccionado.duracion;
      let fechafin = 
      new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dia);
      this.inscripcion.fechafinal = fechafin;    
    }
    if(this.precioSeleccionado.tipoduracion == 2){
      let dia: number = this.precioSeleccionado.duracion * 7;
      let fechafin = 
      new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dia);
      this.inscripcion.fechafinal = fechafin;
    }
    if(this.precioSeleccionado.tipoduracion == 3){
      let dia: number = this.precioSeleccionado.duracion * 15;
      let fechafin = 
      new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dia);
      this.inscripcion.fechafinal = fechafin;
    }
    if(this.precioSeleccionado.tipoduracion == 4){
      let mes = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
      let anio: number = this.inscripcion.fecha.getFullYear();
      let dia: number = this.inscripcion.fecha.getDate()
      
      let fechafin = 
      new Date(anio,mes,dia );
      this.inscripcion.fechafinal = fechafin;
    }
    if(this.precioSeleccionado.tipoduracion == 5){
      let mes = this.inscripcion.fecha.getMonth();
      let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
      let dia: number = this.inscripcion.fecha.getDate()
      
      let fechafin = 
      new Date(anio,mes,dia );
      this.inscripcion.fechafinal = fechafin;
    }   
    }
    else
    {
      this.precioSeleccionado = new Precio();
      this.inscripcion.precios = null;
      this.inscripcion.fecha = null;
      this.inscripcion.fechafinal =null;
      this.inscripcion.subtotal = 0;
      this.inscripcion.isv = 0;
      this.inscripcion.total = 0;
    }
    
    
  }



}
