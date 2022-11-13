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
registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    RecibosListadoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }, EmpleadoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
