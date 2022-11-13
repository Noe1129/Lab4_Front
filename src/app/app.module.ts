import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './empleados/listado/listado.component';
import { RecibosListadoComponent } from './empleados/recibos-listado/recibos-listado.component';
import { HomeComponent } from './home/home/home.component';
import { EmpleadoService } from './services/empleado.service';
import localeEs from '@angular/common/locales/es-AR';
import { AltaEmpleadoComponent } from './empleados/alta-empleado/alta-empleado.component';
import { AltaReciboComponent } from './empleados/alta-recibo/alta-recibo.component';
import { ReporteComponent } from './empleados/reporte/reporte.component';
import { NgChartsModule } from 'ng2-charts';
registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    RecibosListadoComponent,
    HomeComponent,
    AltaEmpleadoComponent,
    AltaReciboComponent,
    ReporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }, EmpleadoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
