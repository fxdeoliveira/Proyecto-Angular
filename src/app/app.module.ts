import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ListadoclientesComponent } from './listadoclientes/listadoclientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarclienteComponent } from './agregarcliente/agregarcliente.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {TabModule} from 'angular-tabs-component';
import { MensajesService } from './Servicios/mensajes.service';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionarclienteComponent } from './seleccionarcliente/seleccionarcliente.component';
import { ListadoinscripcionesComponent } from './listadoinscripciones/listadoinscripciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoclientesComponent,
    AgregarclienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarclienteComponent,
    ListadoinscripcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    TabModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
