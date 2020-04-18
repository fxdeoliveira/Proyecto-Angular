import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listadoclientes',
  templateUrl: './listadoclientes.component.html',
  styleUrls: ['./listadoclientes.component.scss']
})
export class ListadoclientesComponent implements OnInit {
Clientes : any[] = new Array<any>();
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
   // this.firestore.collection('Clientes').valueChanges().subscribe((resultado)=>{
  //    this.Clientes = resultado;
  //  })

  //Busco en la base de datos y lo guardo dentro de mi arreglo de objetos
    this.Clientes.length =0;
  this.firestore.collection('Clientes').get().subscribe((resultado)=>{
    
    resultado.docs.forEach((item)=>{
      let cliente = item.data();
      cliente.id = item.id;
      cliente.ref = item.ref;
      this.Clientes.push(cliente);
    })   
  })

}
}
