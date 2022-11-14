import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Reporte } from 'src/app/models/reporte';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  mes: number;
  anio: number;
  mostrarGrafico: boolean = false;
  mostrarNoHayDatos: boolean = false;
  private labels: string[] = [''];

  private suscripcion = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private serviceEmpleado: EmpleadoService
  ) {
    this.formulario = this.formBuilder.group({
      mes: ['', Validators.required],
      anio: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datos: ChartData<'bar', number[], string>;

  ngOnInit(): void {}

  actualizarReporte() {
    if (this.formulario.valid) {
      this.suscripcion.add(
        this.serviceEmpleado
          .obtenerReporte(
            this.formulario.controls['anio'].value,
            this.formulario.controls['mes'].value
          )
          .subscribe({
            next: (respuesta: Reporte[]) => {
              if (respuesta.length != 0) {
                this.mostrarGrafico=true;
                this.mostrarNoHayDatos=false;
                const datosTransformados = respuesta.map((datos) => {
                  return {
                    data: [datos.neto],
                    label: datos.area,
                    barThickness: 45,
                    borderRadius: 4,
                    maxBarThickness: 40,
                  };
                });
                this.datos = {
                  labels: this.labels,
                  datasets: datosTransformados,
                };
              } else {
                this.mostrarNoHayDatos = true;
                this.mostrarGrafico=false;
              }
            },
            error: () => alert('API no responde'),
          })
      );
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          font: {
            family: 'sans-serif',
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
      // datalabels: {
      //   color: 'white',
      // },
    },
    scales: {
      x: {
        grid: {
          color: 'white',
          drawBorder: false,
        },
        ticks: { color: 'white' },
        offset: true,
      },
      y: {
        grid: {
          color: 'white',
          drawBorder: false,
        },
        ticks: { color: 'white' },
      },
    },
    color: 'white',
  };
}
