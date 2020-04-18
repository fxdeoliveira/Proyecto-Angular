import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoclientesComponent } from './listadoclientes/listadoclientes.component';
import { AgregarclienteComponent } from './agregarcliente/agregarcliente.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoinscripcionesComponent } from './listadoinscripciones/listadoinscripciones.component';


const routes: Routes = [
  {path: '', redirectTo: 'inscripcion', pathMatch: 'full'},
  {path: 'inscripcion', component: InscripcionComponent},
  {path: 'listado-clientes', component: ListadoclientesComponent},
  {path: 'agregar-cliente', component: AgregarclienteComponent},
  {path: 'agregar-cliente/:clientesID', component: AgregarclienteComponent},
  {path: 'app-precios', component: PreciosComponent},
  {path: 'app-listadoinscripciones', component: ListadoinscripcionesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
