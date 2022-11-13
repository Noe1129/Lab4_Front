import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css'],
})
export class AltaEmpleadoComponent implements OnInit, OnDestroy {
  empleado: Empleado;
  formulario: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private serviceEmpleado: EmpleadoService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      area: ['', Validators.required],
      sueldoBruto: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.empleado = new Empleado();
  }

  guardar() {
    this.empleado = this.formulario.value as Empleado;

    if (this.formulario.valid) {
      this.subscription.add(
        this.serviceEmpleado.agregarEmpleado(this.empleado).subscribe({
          next: (respuesta: Empleado) => {
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente el empleado',
              showConfirmButton: false,
              timer: 1500,
            });

            this.router.navigate(['empleados']);
          },
          error: (e) => {
            console.log(e);
            alert('No se puede cargar un nuevo empleado');
          },
        })
      );
    }
  }
}
