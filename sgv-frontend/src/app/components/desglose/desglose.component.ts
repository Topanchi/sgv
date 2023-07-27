import { Component, OnInit } from '@angular/core';
import { ConstantesCategorias } from '../../utils/constantes-categorias';
import { VentaService } from '../../services/venta.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-desglose',
  templateUrl: './desglose.component.html',
  styleUrls: ['./desglose.component.css']
})
export class DesgloseComponent implements OnInit {

  public mostrarDatos: boolean = false;
  public mostrarDatosTotales: boolean = false;
  public selectoresCompletos: boolean = false;
  public mostrarSelectorMes: boolean = false;
  public mesSeleccionado: number;
  public anioSeleccionado: number;
  public totalMesActual: number = 0;
  public totalMesActualDulce: number = 0;
  public totalMesActualSalada: number = 0;
  public totalMesActualEventos: number = 0;

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
    this.totalMesActual = 0;
    this.totalMesActualDulce = 0;
    this.anioSeleccionado = +id.value;

    if(this.anioSeleccionado !== null){
      this.mostrarSelectorMes = true;
    }
  }

  public getDataMes(id:any) {
    this.totalMesActual = 0;
    this.totalMesActualDulce = 0;
    this.mesSeleccionado = +id.value;

    if(this.anioSeleccionado !== null && this.mesSeleccionado !== null){
      this.selectoresCompletos = true;
    }
  }

  public buscarDatos() {
    console.log("Mes: ", this.mesSeleccionado);
    console.log("Año: ", this.anioSeleccionado);

    if(this.anioSeleccionado !== null && this.mesSeleccionado !== null){
      this.obtenerMontosData(this.anioSeleccionado, this.mesSeleccionado);
      this.obtenerDataGraficosTortas(this.anioSeleccionado, this.mesSeleccionado);
      this.obtenerDataGraficosBanqDulce(this.anioSeleccionado, this.mesSeleccionado);
      this.obtenerDataGraficosBanqSalada(this.anioSeleccionado, this.mesSeleccionado);
    }
  }

  private obtenerMontosData(anioSeleccionado: number, mesSeleccionado: number) {
    const llamadas = [
      this.llamadaMontosData(anioSeleccionado, mesSeleccionado, ConstantesCategorias.TORTA),
      this.llamadaMontosData(anioSeleccionado, mesSeleccionado, ConstantesCategorias.BANQUETERIA_DULCE),
      this.llamadaMontosData(anioSeleccionado, mesSeleccionado, ConstantesCategorias.BANQUETERIA_SALADA)
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadas.map(call => call.toPromise());
     // Esperar a que se resuelvan todas las promesas con Promise.all()
     Promise.all(promises).then(responses => {
       // Almacenar los valores en el arreglo de resultados
       responses.forEach((element, index) => {
        if(element !== 0){
          this.mostrarDatosTotales = true;
          if(index == 0){
            this.totalMesActual = element.venta_total;
          }
          if(index == 1){
            this.totalMesActualDulce = element.venta_total;
          }
          if(index == 2){
            this.totalMesActualSalada = element.venta_total;
          }
          console.log(element, index)
        }
      });
     })
     .catch(error => {
       console.error(error);
     });
  }

  private obtenerDataGraficosTortas(anioSeleccionado: number, mesSeleccionado: number) {
    const dataResults = [];
    const dataLabels = [];

    const llamadas = [
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA),

      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR),

      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE),

      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA)
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadas.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }else{
          this.mostrarDatos = false;
        }
      });
      this.setgraficoMesActual(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });
  }

  private obtenerDataGraficosBanqDulce(anioSeleccionado: number, mesSeleccionado: number) {
    const dataResults = [];
    const dataLabels = [];

    const llamadas = [
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.REPOLLITOS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MIX_DULCE_TRADICIONAL),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MIX_DULCE_ESPECIAL),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MIX_DULCE_ESTACION),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CAJA_DULCE_1),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CAJA_DULCE_2),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CAJA_DULCE_3),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MINI_POSTRES)
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadas.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }else{
          this.mostrarDatos = false;
        }
      });
      this.setgraficoMesActualBanqDulce(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });
  }

  private obtenerDataGraficosBanqSalada(anioSeleccionado: number, mesSeleccionado: number) {
    const dataResults = [];
    const dataLabels = [];

    const llamadas = [
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.EMPANADAS_SURTIDAS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.EMPANADAS_VEGETARIANAS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TAPADITOS_SURTIDOS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CANAPES_SURTIDOS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CROSTINIS_SURTIDOS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MINI_PIZZAS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MINI_BROCHETAS_POLLO),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MINI_CHAPARRITAS),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MIX_SALADO),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CAJA_SALADA_1),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.CAJA_SALADA_2),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.MINI_QUICHE_SURTIDO),
      this.obtenerVentasMesActual(mesSeleccionado, anioSeleccionado, ConstantesCategorias.TAPADITOS_PREMUIM_SURTIDO)
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadas.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }else{
          this.mostrarDatos = false;
        }
      });
      this.setgraficoMesActualBanqSalada(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });
  }

  

  private llamadaMontosData(anioSeleccionado: number, mesSeleccionado: number, constante: String) {
    let data = {
      "mes": mesSeleccionado,
      "anio": anioSeleccionado,
      "tipo_producto": constante
    }

    let dataEncontrada = this._ventaService.contadorMontoVenta(data);

    return dataEncontrada;
  }

  private obtenerVentasMesActual(mesActual: number, anioActual: number, constante: String) {
    let dataMMesActual = {
      "mes": mesActual,
      "anio": anioActual,
      "producto_vendido": constante
    }

    let valor = this._ventaService.contadorProductoPorMeses(dataMMesActual); 
    return valor;
  }

  private obtenerAnios() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5; // Rango de años que deseas mostrar (10 años en este ejemplo)

    for (let i = startYear; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

  /* Generación de gráficos */
  private setgraficoMesActual(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    this.mostrarDatos = true;
    const canvas: any = document.getElementById('tortaChartTortas');
    const ctx = canvas.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: tiposDeTortas,
        datasets: [{
          data: cantidadDeTortas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',

            'rgba(238, 130, 238, 0.7)',
            'rgba(106, 90, 205, 0.7)',
            'rgba(89, 89, 16, 0.7)',
            'rgba(182, 10, 16, 0.7)',
            'rgba(182, 10, 181, 0.7)',
            'rgba(89, 10, 181 0.7)',

            'rgba(89, 147, 181, 0.7)',
            'rgba(89, 147, 255, 0.7)',
            'rgba(255, 217, 255, 0.7)'
          ]
        }]
      }
    });
  }

  private setgraficoMesActualBanqDulce(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    this.mostrarDatos = true;
    const canvas: any = document.getElementById('barraChartBanqueteriaDulce');
    const ctx = canvas.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: tiposDeTortas,
        datasets: [{
          data: cantidadDeTortas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',

            'rgba(238, 130, 238, 0.7)',
            'rgba(106, 90, 205, 0.7)',
            'rgba(89, 89, 16, 0.7)',
            'rgba(182, 10, 16, 0.7)',
            'rgba(182, 10, 181, 0.7)',
            'rgba(89, 10, 181 0.7)',

            'rgba(89, 147, 181, 0.7)',
            'rgba(89, 147, 255, 0.7)',
            'rgba(255, 217, 255, 0.7)'
          ]
        }]
      }
    });
  }

  private setgraficoMesActualBanqSalada(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    this.mostrarDatos = true;
    const canvas: any = document.getElementById('barraChartBanqueteriaSalada');
    const ctx = canvas.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: tiposDeTortas,
        datasets: [{
          data: cantidadDeTortas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',

            'rgba(238, 130, 238, 0.7)',
            'rgba(106, 90, 205, 0.7)',
            'rgba(89, 89, 16, 0.7)',
            'rgba(182, 10, 16, 0.7)',
            'rgba(182, 10, 181, 0.7)',
            'rgba(89, 10, 181 0.7)',

            'rgba(89, 147, 181, 0.7)',
            'rgba(89, 147, 255, 0.7)',
            'rgba(255, 217, 255, 0.7)'
          ]
        }]
      }
    });
  }

}
