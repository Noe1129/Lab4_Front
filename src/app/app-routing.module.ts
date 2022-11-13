import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEmpleadoComponent } from './empleados/alta-empleado/alta-empleado.component';
import { AltaReciboComponent } from './empleados/alta-recibo/alta-recibo.component';
import { ListadoComponent } from './empleados/listado/listado.component';
import { RecibosListadoComponent } from './empleados/recibos-listado/recibos-listado.component';
import { ReporteComponent } from './empleados/reporte/reporte.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empleados', component: ListadoComponent },
  { path: 'recibos', component: RecibosListadoComponent },
  { path: 'nuevo', component: AltaEmpleadoComponent },
  { path: 'recibos/nuevo', component: AltaReciboComponent },
  { path: 'reporte', component: ReporteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
