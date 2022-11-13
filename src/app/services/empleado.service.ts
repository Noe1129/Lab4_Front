import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
import { Recibo } from '../models/recibo';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private API_URL: string = 'http://localhost:8080/empleados/';

  constructor(private http: HttpClient) {}

  obtenerListado(): Observable<Empleado[]> {
    const result = this.http.get<Empleado[]>(this.API_URL);
    return result;
  }
  obtenerRecibosPorEmpleado(idEmpleado: string): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(this.API_URL+ 'recibo/'+ idEmpleado );
  }
}
