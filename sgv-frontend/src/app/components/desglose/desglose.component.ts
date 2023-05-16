import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-desglose',
  templateUrl: './desglose.component.html',
  styleUrls: ['./desglose.component.css']
})
export class DesgloseComponent implements OnInit {

  public mostrarDatos = null;
  public mesSeleccionado: number;
  public anioSeleccionado: number;

  public anio: any = {
    idanio: ''
  };
  public mes: any = {
    idmes: ''
  };
  public years: number[] = [];

  constructor( private _ventaService: VentaService) { }

  ngOnInit(): void {
    this.obtenerAnios();
  }

  public getDataAnio(id:any) {
    console.log("Año seleccionado: ", +id.value);
    console.log("Año seleccionado: ", typeof +id.value);
    this.anioSeleccionado = +id.value;
  }

  public getDataMes(id:any) {
    console.log("Mes seleccionado: ", +id.value);
    console.log("Mes seleccionado: ", typeof +id.value);
    this.mesSeleccionado = +id.value;

    console.log("año: ", this.anioSeleccionado, "mes: ", this.mesSeleccionado);
    //Llamar al servicio y llenar data
  }

  private obtenerAnios() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5; // Rango de años que deseas mostrar (10 años en este ejemplo)

    for (let i = startYear; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

}
