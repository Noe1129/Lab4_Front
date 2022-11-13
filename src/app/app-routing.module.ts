import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './empleados/listado/listado.component';
import { RecibosListadoComponent } from './empleados/recibos-listado/recibos-listado.component';

const routes: Routes = [
  { path: 'empleados', component: ListadoComponent },
  { path: 'recibos', component: RecibosListadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
