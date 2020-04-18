import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../Servicios/mensajes.service';
import { Precio } from '../model/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup;
  precios: any[] = Array<Precio>();
  esEditar:boolean = false;
  id: string;

  constructor(private fb: FormBuilder,
    private afs: AngularFirestore,
     private mensaje: MensajesService,
     ) { }

  ngOnInit(): void {
    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoduracion: ['', Validators.required]
    })
    this.mostrar();
  }

  mostrar(){
    this.afs.collection<Precio>('Precios').get().subscribe((resultado)=>{
      this.precios.length =0;
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precio;
        precio.id = dato.id,
        precio.ref = dato.ref
        this.precios.push(precio);
      })
    })
  }
  agregar(){
    this.afs.collection<Precio>('Precios').add(this.formularioPrecios.value).then(()=>{
      this.mensaje.menssajeok('Agregado','Se agrego correctamente')
      this.formularioPrecios.reset();
      this.mostrar();
      }).catch(()=>{
      this.mensaje.menssajeerror('Error','Algo salio mal');     
    })
  }

  editar(){
    this.afs.doc('Precios/' + this.id).update(this.formularioPrecios.value).then(()=>{
      this.mensaje.menssajeok("Editado",'Se edito correctamente');
      this.formularioPrecios.reset();
      this.esEditar = false;
      this.mostrar();
    }).catch(()=>{
      this.mensaje.menssajeerror('Error','Ocurrio un error');
     

    })
  }


  modificar(precio: Precio){
    this.esEditar = true;
    this.formularioPrecios.setValue({      
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoduracion: precio.tipoduracion,

    })
    this.id = precio.id;
  }
}
