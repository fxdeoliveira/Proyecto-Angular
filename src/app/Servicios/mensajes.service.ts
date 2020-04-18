import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  menssajeok(tiutlo: string, mensaje: string){
    Swal.fire({
      title: tiutlo,
      text: mensaje,
      icon: 'success', 
    })
  } 

  menssajeAdvertencia(tiutlo: string, mensaje: string){
    Swal.fire({
      title: tiutlo,
      text: mensaje,
      icon: 'warning', 
    })
  } 

  menssajeerror(tiutlo: string, mensaje: string){
    Swal.fire({
      title: tiutlo,
      text: mensaje,
      icon: 'error', 
    }) 
  }
}
