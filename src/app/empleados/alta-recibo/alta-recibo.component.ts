import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Recibo } from 'src/app/models/recibo';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-recibo',
  templateUrl: './alta-recibo.component.html',
  styleUrls: ['./alta-recibo.component.css']
})
export class AltaReciboComponent implements OnInit,OnDestroy {
  formulario:FormGroup;
  empleados:Empleado[];
  recibo:Recibo;

  private subscription=new Subscription();

  constructor(   private formBuilder: FormBuilder,
    private serviceEmpleado: EmpleadoService,
    private router: Router) { 
      this.formulario = this.formBuilder.group({
        legajo: ['', Validators.required],
        mes: ['', Validators.required],
        anio: ['', Validators.required],
        antiguedad: ['', Validators.required],
        jubilacion: ['', Validators.required],
        obraSocial: ['', Validators.required],
        fondoComplejidad: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.cargarComboEmpleados();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarComboEmpleados() {
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

  guardar() {
    this.recibo = this.formulario.value;

    if (this.formulario.valid) {
      this.subscription.add(
        this.serviceEmpleado.agregarRecibo(this.recibo).subscribe({
          next: (respuesta: Recibo) => {
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente el recibo',
              showConfirmButton: false,
              timer: 1500,
            });

            this.router.navigate(['recibos']);
          },
          error: (e) => {
            console.log(e);
            alert('No se puede cargar un nuevo recibo');
          },
        })
      );
    }
  }

}
