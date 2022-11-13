import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Recibo } from 'src/app/models/recibo';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-recibos-listado',
  templateUrl: './recibos-listado.component.html',
  styleUrls: ['./recibos-listado.component.css'],
})
export class RecibosListadoComponent implements OnInit, OnDestroy {
  recibos: Recibo[];
  empleados: Empleado[];

  formulario: FormGroup;

  private suscription = new Subscription();

  constructor(
    private serviceEmpleado: EmpleadoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      empleadoLegajo: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarComboEmpleados();
    this.actualizarListado();
  }

  cargarComboEmpleados() {
    this.suscription.add(
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

  actualizarListado() {
    this.formulario.controls['empleadoLegajo'].valueChanges.subscribe((x) => {
      this.suscription.add(
        this.serviceEmpleado.obtenerRecibosPorEmpleado(x).subscribe({
          next: (respuesta: Recibo[]) => {
            this.recibos = respuesta;
          },
          error: () => {
            alert('Error al obtener los recibos');
          },
        })
      );
    });
  }
}
