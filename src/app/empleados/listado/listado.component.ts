import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit, OnDestroy {
  empleados: Empleado[];

  private subscription = new Subscription();

  constructor(private serviceEmpleado: EmpleadoService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.actualizarListado();
  }

  actualizarListado() {
    this.subscription.add(
      this.serviceEmpleado.obtenerListado().subscribe({
        next: (respuesta: Empleado[]) => {
          this.empleados = respuesta;
        },
        error: () => {
          alert('Error al obtener los empleados');
        },
      })
    );
  }
}
