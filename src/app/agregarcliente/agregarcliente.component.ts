import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MensajesService } from '../Servicios/mensajes.service';


@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.component.html',
  styleUrls: ['./agregarcliente.component.scss']
})
export class AgregarclienteComponent implements OnInit {
formulariocliente : FormGroup
UrlImg: string = ''
eseditable :boolean = false;
id : string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private mensaje: MensajesService
    ) { }

  ngOnInit(): void {
    
    this.formulariocliente = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      Cedula: [''],
      FechaNacimiento: ['', Validators.required],
      Telefono: [''],
      ImgUrl: ['', Validators.required]      
    })

    this.id = this.activeRoute.snapshot.params.clientesID;

    if (this.id != undefined){
      this.eseditable = true;
      this.db.doc<any>('Clientes' + '/' + this.id ).valueChanges().subscribe((cliente)=>{      
        this.formulariocliente.setValue({
        Nombre: cliente.Nombre,
        Apellido: cliente.Apellido,
        Correo: cliente.Correo,
        Cedula: cliente.Cedula,
        FechaNacimiento: new Date(cliente.FechaNacimiento.seconds * 1000).toISOString().substr(0,10),
        Telefono: cliente.Telefono,
        ImgUrl: ''        
        
      })
      this.UrlImg = cliente.ImgUrl;
    });
    }
    
  }

  agregar(){
        this.formulariocliente.value.ImgUrl = this.UrlImg;
        this.formulariocliente.value.FechaNacimiento = new Date(this.formulariocliente.value.FechaNacimiento)        
        this.db.collection('Clientes').add(this.formulariocliente.value).then((mino)=>{
         this.mensaje.menssajeok("Agregado","Se agrego correctamente");
         this.formulariocliente.reset();
        }).catch(()=>{
          this.mensaje.menssajeerror("Errror","Algo salio mal, intenta nuevamente");
        })
  }

  editar(){
    this.formulariocliente.value.ImgUrl = this.UrlImg;
    this.formulariocliente.value.FechaNacimiento = new Date(this.formulariocliente.value.FechaNacimiento)        
    this.db.doc('Clientes/' + this.id).update(this.formulariocliente.value).then((termino)=>{
      this.mensaje.menssajeok("Agregado","Se agrego correctamente");
    }).catch(()=>{
      this.mensaje.menssajeerror("Errror","Algo salio mal, intenta nuevamente");
    })     
  }

  subirimagen(event){
    
    if(event.target.files.length >0)
    {
    let nombre = new Date().getTime().toString();
    let archivo = event.target.files[0]
    let ext =archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
    let ruta = 'Clientes/' + nombre + ext;
    const ref = this.storage.ref(ruta)
    const tarea = ref.put(archivo)
    tarea.then((objeto)=>{
    ref.getDownloadURL().subscribe((url)=>{
     this.UrlImg = url;
      })
    })
   }
    
    
    
  }

}
