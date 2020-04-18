import { DocumentReference } from '@angular/fire/firestore';


export class Cliente{
    id: string;
    Nombre: string;
    Apellido:string;
    Correo: string;
    Telefono: number;
    Cedula: String;
    FechaNacimiento:Date;
    ImgUrl: string;
    ref: DocumentReference;
    visible: boolean;
    constructor()
    {

    }

}