import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cliente } from '../model/cliente';


@Component({
  selector: 'app-seleccionarcliente',
  templateUrl: './seleccionarcliente.component.html',
  styleUrls: ['./seleccionarcliente.component.scss']
})
export class SeleccionarclienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') aaa: string;
   @Output('seleccli') seleccli = new EventEmitter();
   @Output('canceli') canceli = new EventEmitter();

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.db.collection<any>('Clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0;
      resultado.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id =  item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
      console.log(this.clientes)
    })
  }

  buscarcli(nombre: string){
    this.clientes.forEach((cliente)=>{
      if(cliente.Nombre.toLowerCase().includes(nombre.toLocaleLowerCase())){
        cliente.visible=true;
      }
      else{
        cliente.visible = false;
      }
    })
  }
  seleccliente(cliente: Cliente){
    this.aaa = cliente.Nombre + ' ' +cliente.Apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })
    this.seleccli.emit(cliente)
  }

  cancelarcli(){
    this.aaa = undefined;
    this.canceli.emit();
  }

}
