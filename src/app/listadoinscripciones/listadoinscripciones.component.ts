import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../model/inscripcion';

@Component({
  selector: 'app-listadoinscripciones',
  templateUrl: './listadoinscripciones.component.html',
  styleUrls: ['./listadoinscripciones.component.scss']
})
export class ListadoinscripcionesComponent implements OnInit {
  arregloinscripcion: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.arregloinscripcion.length = 0;
    this.db.collection('Inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{     
        let insobtenida = inscripcion.data();
        insobtenida.id = inscripcion.id;       
       this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{       
         insobtenida.clienteobtenido = cliente.data();
         insobtenida.fecha = new Date(insobtenida.fecha.seconds * 1000);
         insobtenida.fechafinal = new Date(insobtenida.fechafinal.seconds* 1000);
         this.arregloinscripcion.push(insobtenida);  
         console.log(insobtenida)      
         
        })
        
      })
    })
    
  }

}
