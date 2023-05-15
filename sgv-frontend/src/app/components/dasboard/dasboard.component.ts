import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { ConstantesCategorias } from '../../utils/constantes-categorias';
//import Chart from 'chart.js/auto';
//import { ChartType } from 'chart.js';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  public identity: any;
  public ventas: any = {
    
  };

  public ventasMesActualArray: Array<any> = [];

  public data_ventas: Array<any> = [];
  public data_detalles : Array<any> = [];
  public totalMesActual:any = 0;
  public totalTrimestre:any = 0;
  public totalSemestrePrimer:any = 0;
  public totalSemestreSegundo:any = 0;
  public totalAnioActual:any = 0;
  public ventasMesActual:any = 0;
  public ventasUltimoTrimestre:any = 0;
  public ventasUltimoSemestre:any = 0;
  public ventasAnioActual:any = 0;

  public cantidadMesActualTortaBiscocho15Redonda:any = 0;
  public cantidadMesActualTortaBiscocho20Redonda:any = 0;
  public cantidadMesActualTortaBiscocho30Redonda:any = 0;
  public cantidadMesActualTortaBiscocho40Redonda:any = 0;
  public cantidadMesActualTortaBiscocho50Redonda:any = 0;
  public cantidadMesActualTortaBiscocho15Rectangular:any = 0;
  public cantidadMesActualTortaBiscocho30Rectangular:any = 0;
  public cantidadMesActualTortaBiscocho40Rectangular:any = 0;
  public cantidadMesActualTortaBiscocho60Rectangular:any = 0;
  public cantidadMesActualTortaEspecial12Panqueue:any = 0;
  public cantidadMesActualTortaEspecial20Panqueue:any = 0;
  public cantidadMesActualTortaEspecial30Panqueue:any = 0;
  public cantidadMesActualTortaEspecial15HojarascaMilhoja:any = 0;
  public cantidadMesActualTortaEspecial20HojarascaMilhoja:any = 0;
  public cantidadMesActualTortaEspecial30HojarascaMilhoja:any = 0;

  public cantidadUltimosTresTortaBiscocho15Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho20Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho30Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho40Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho50Redonda:any = 0;
  public cantidaUltimosTresTortaBiscocho15Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho30Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho40Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho60Rectangular:any = 0;
  public cantidadUltimosTresTortaEspecial12Panqueue:any = 0;
  public cantidadUltimosTresTortaEspecial20Panqueue:any = 0;
  public cantidadUltimosTresTortaEspecial30Panqueue:any = 0;
  public cantidadUltimosTresTortaEspecial15HojarascaMilhoja:any = 0;
  public cantidadUltimosTresTortaEspecial20HojarascaMilhoja:any = 0;
  public cantidadUltimosTresTortaEspecial30HojarascaMilhoja:any = 0;

  public cantidadUltimosSeisTortaBiscocho15Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho20Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho30Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho40Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho50Redonda:any = 0;
  public cantidaUltimosSeisTortaBiscocho15Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho30Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho40Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho60Rectangular:any = 0;
  public cantidadUltimosSeisTortaEspecial12Panqueue:any = 0;
  public cantidadUltimosSeisTortaEspecial20Panqueue:any = 0;
  public cantidadUltimosSeisTortaEspecial30Panqueue:any = 0;
  public cantidadUltimosSeisTortaEspecial15HojarascaMilhoja:any = 0;
  public cantidadUltimosSeisTortaEspecial20HojarascaMilhoja:any = 0;
  public cantidadUltimosSeisTortaEspecial30HojarascaMilhoja:any = 0;

  public cantidadAnioActualTortaBiscocho15Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho20Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho30Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho40Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho50Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho15Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho30Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho40Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho60Rectangular:any = 0;
  public cantidadAnioActualTortaEspecial12Panqueue:any = 0;
  public cantidadAnioActualTortaEspecial20Panqueue:any = 0;
  public cantidadAnioActualTortaEspecial30Panqueue:any = 0;
  public cantidadAnioActualTortaEspecial15HojarascaMilhoja:any = 0;
  public cantidadAnioActualTortaEspecial20HojarascaMilhoja:any = 0;
  public cantidadAnioActualTortaEspecial30HojarascaMilhoja:any = 0;

  public cantidadTrimestre:any = 0;
  public cantidadSemestrePrimer:any = 0;
  public cantidadSemestreSegundo:any = 0;
  public cantidadAnioActual:any = 0;

 
  //public barChartType: ChartType = "pie";
  //barChartLabels: any[] = [];
  /* barChartData: any[] = [
    {
      data: [65, 76, 33],
      label: 'Label'
    }
  ]; */

  public cantidadDeTortasVendidasMesActual: Array<any> = [];
  public cantidadDeTortasVendidasMesActual15Redonda: Array<any> = [];
  public cantidadDeTortasVendidasMesActual20Redonda: Array<any> = [];
  public cantidadDeTortasVendidasMesActual30Redonda: Array<any> = [];
  public cantidadDeTortasVendidasMesActual40Redonda: Array<any> = [];
  public cantidadDeTortasVendidasMesActual15Rectangular: Array<any> = [];
  public cantidadDeTortasVendidas: Array<any> = [];
  public tiposDeTortasVendidas: Array<any> = [];
  public contadorMesActual: number = 0;

  public labelsMesActualTorta15Redonda: any = 'Torta bizcocho 15 redonda';
  public labelsMesActualTorta20Redonda: any = 'Torta bizcocho 20 redonda';
  public labelsMesActualTorta30Redonda: any = 'Torta bizcocho 30 redonda';
  public labelsMesActualTorta40Redonda: any= 'Torta bizcocho 40 redonda';
  public labelsMesActualTorta50Redonda: any = 'Torta bizcocho 50 redonda';
  public labelsMesActualTorta15Rectangular: any= 'Torta bizcocho 15 rectangular';
  public labelsMesActualTorta30Rectangular: any= 'Torta bizcocho 30 rectangular';
  public labelsMesActualTorta40Rectangular: any= 'Torta bizcocho 40 rectangular';
  public labelsMesActualTorta60Rectangular: any= 'Torta bizcocho 60 rectangular';
  public labelsMesActualTorta12Panqueque: any= 'Torta especial 12 panqueque';
  public labelsMesActualTorta20Panqueque: any= 'Torta especial 20 panqueque';
  public labelsMesActualTorta30Panqueque: any= 'Torta especial 30 panqueque';
  public labelsMesActualTorta15Hojarasca: any= 'Torta especial 15 hojarasca/milhoja';
  public labelsMesActualTorta20Hojarasca: any= 'Torta especial 20 hojarasca/milhoja';
  public labelsMesActualTorta30Hojarasca: any= 'Torta especial 30 hojarasca/milhoja';

  constructor(
    private _ventaService: VentaService,
  ) { }

  async ngOnInit(): Promise<void> {
    const fecha = new Date();
    //console.log("Mes actual: ", fecha.getMonth()+1);
    //console.log("ültimos tres meses: ", fecha.getMonth()-1, fecha.getMonth(), fecha.getMonth()+1);
    //console.log("ültimos seis meses: ", fecha.getMonth()-2, fecha.getMonth()-1, fecha.getMonth(), fecha.getMonth()+1, fecha.getMonth()+2, fecha.getMonth()+3,);
    
    this.obtenerDatosMesActual(fecha);
    this.obtenerDatosTresMeses(fecha);
    this.obtenerDatosAnioActual(fecha);

    this.obtenerVentas();
  }
  
  private obtenerDatosMesActual(fecha: Date) {
    const mesActual = fecha.getMonth()+1;
    const anioActual = fecha.getFullYear();

    const dataResults = [];
    const dataLabels = [];

    const llamadasServicio = [
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA),

      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR),

      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE),

      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA),
      this.obtenerVentasMesActual(mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA),
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadasServicio.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }
      });
      this.setgraficoMesActual(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });


    
  }

  private obtenerDatosTresMeses(fecha: Date) {
    const mesActual = fecha.getMonth()+1;
    const mesAnterior = fecha.getMonth();
    const mesAnteAnterior = fecha.getMonth()-1;
    const anioActual = fecha.getFullYear();

    const dataResults = [];
    const dataLabels = [];

    const llamadasServicio = [
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA),

      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR),

      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE),

      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA),
      this.obtenerVentasTresMeses(mesAnteAnterior, mesAnterior, mesActual, anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA),
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadasServicio.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }
      });
      this.setgraficoTresMeses(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });
  }

  private obtenerDatosAnioActual(fecha: Date) {
    const anioActual = fecha.getFullYear();

    const dataResults = [];
    const dataLabels = [];

    const llamadasServicio = [
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA),

      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR),

      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE),

      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA),
      this.obtenerVentasAnioActual(anioActual, ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA),
    ];

    // Promesas para cada llamada al servicio
    const promises = llamadasServicio.map(call => call.toPromise());

    // Esperar a que se resuelvan todas las promesas con Promise.all()
    Promise.all(promises).then(responses => {
      // Almacenar los valores en el arreglo de resultados
      responses.forEach(response => {
        if(response.cantidadVentas !== 0){
          dataResults.push(response.cantidadVentas);
          dataLabels.push(response.producto);
        }
      });
      console.log("anio dataResults: ",dataResults);
      console.log("anio dataLabels:: " ,dataLabels);
      this.setgraficoAnioActual(dataLabels, dataResults);
    })
    .catch(error => {
      console.error(error);
    });

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

  private obtenerVentasTresMeses(mesAnteAnterior: number, mesAnterior: number, mesActual: number, anioActual: number, constante: string) {
    let dataTrimestre = {
      "mes_uno": mesAnteAnterior,
      "mes_dos": mesAnterior,
      "mes_tres": mesActual,
      "anio": anioActual,
      "producto_vendido": constante
    }

    let valor = this._ventaService.contadorProductoPorTresMeses(dataTrimestre); 
    return valor;
  }

  private obtenerVentasAnioActual(anioActual: number, constante: String) {
    let dataAnioActual = {
      "anio": anioActual,
      "producto_vendido": constante
    }

    let valor = this._ventaService.contadorProductoPorAnio(dataAnioActual); 
    return valor;
  }

 

  private obtenerVentas() {
    const fecha = new Date();

    this._ventaService.getVentas('').subscribe(
      response => {
        //console.log(response);
        this.data_ventas = (response);
        //console.log(this.data_ventas);
        this.data_ventas.forEach((venta,index) => {
          /* INICIO lógica de total año actual */
          if(venta.anio == (fecha.getFullYear())){
            this.ventasAnioActual++;
            this.totalAnioActual = this.totalAnioActual + venta.valor_venta; /* Total en ventas en mes actual */
            this.cantidadAnioActualTortaBiscocho15Redonda = this.cantidadAnioActualTortaBiscocho15Redonda + venta.torta_bizcocho_15_redonda;
            this.cantidadAnioActualTortaBiscocho20Redonda = this.cantidadAnioActualTortaBiscocho20Redonda + venta.torta_bizcocho_20_redonda;
            this.cantidadAnioActualTortaBiscocho30Redonda = this.cantidadAnioActualTortaBiscocho30Redonda + venta.torta_bizcocho_30_redonda;
            this.cantidadAnioActualTortaBiscocho40Redonda = this.cantidadAnioActualTortaBiscocho40Redonda + venta.torta_bizcocho_40_redonda;
            this.cantidadAnioActualTortaBiscocho50Redonda = this.cantidadAnioActualTortaBiscocho50Redonda + venta.torta_bizcocho_50_redonda;
            this.cantidadAnioActualTortaBiscocho15Rectangular = this.cantidadAnioActualTortaBiscocho15Rectangular + venta.torta_bizcocho_15_rectangular;
            this.cantidadAnioActualTortaBiscocho30Rectangular = this.cantidadAnioActualTortaBiscocho30Rectangular + venta.torta_bizcocho_30_rectangular;
            this.cantidadAnioActualTortaBiscocho40Rectangular = this.cantidadAnioActualTortaBiscocho40Rectangular + venta.torta_bizcocho_40_rectangular;
            this.cantidadAnioActualTortaBiscocho60Rectangular = this.cantidadAnioActualTortaBiscocho60Rectangular + venta.torta_bizcocho_60_rectangular;
            this.cantidadAnioActualTortaEspecial12Panqueue = this.cantidadAnioActualTortaEspecial12Panqueue + venta.torta_especial_12_panqueque;
            this.cantidadAnioActualTortaEspecial20Panqueue = this.cantidadAnioActualTortaEspecial20Panqueue + venta.torta_especial_20_panqueque;
            this.cantidadAnioActualTortaEspecial30Panqueue = this.cantidadAnioActualTortaEspecial30Panqueue + venta.torta_especial_30_panqueque;
            this.cantidadAnioActualTortaEspecial15HojarascaMilhoja = this.cantidadAnioActualTortaEspecial15HojarascaMilhoja + venta.torta_especial_15_hojarasca_milhoja;
            this.cantidadAnioActualTortaEspecial20HojarascaMilhoja = this.cantidadAnioActualTortaEspecial15HojarascaMilhoja + venta.torta_especial_20_hojarasca_milhoja;
            this.cantidadAnioActualTortaEspecial30HojarascaMilhoja = this.cantidadAnioActualTortaEspecial15HojarascaMilhoja + venta.torta_especial_30_hojarasca_milhoja;
          }
          /* FIN lógica de de total año actual */


          /* INICIO lógica de mes actual */
          
          if(venta.mes == (fecha.getMonth()+1)){
            this.contadorMesActual++
            //console.log("Pasé por acá: ", this.contadorMesActual);
            //this.ventasMesActual++; /* Cantidad de ventas en mes actual */
            this.totalMesActual = this.totalMesActual + venta.valor_venta; /* Total en ventas en mes actual */
            //.ventasMesActualArray.push(venta);
          }
          /* FIN lógica de mes actual */

          /* INICIO lógica de último trimestre */
          if((venta.mes == (fecha.getMonth()-1)) || (venta.mes == (fecha.getMonth()) || (venta.mes == (fecha.getMonth()+1)))){
            this.ventasUltimoTrimestre++;
            this.totalTrimestre = this.totalTrimestre + venta.valor_venta; /* Total en ventas en mes actual */
            this.cantidadUltimosTresTortaBiscocho15Redonda = this.cantidadUltimosTresTortaBiscocho15Redonda + venta.torta_bizcocho_15_redonda;
            this.cantidadUltimosTresTortaBiscocho20Redonda = this.cantidadUltimosTresTortaBiscocho20Redonda + venta.torta_bizcocho_20_redonda;
            this.cantidadUltimosTresTortaBiscocho30Redonda = this.cantidadUltimosTresTortaBiscocho30Redonda + venta.torta_bizcocho_30_redonda;
            this.cantidadUltimosTresTortaBiscocho40Redonda = this.cantidadUltimosTresTortaBiscocho40Redonda + venta.torta_bizcocho_40_redonda;
            this.cantidadUltimosTresTortaBiscocho50Redonda = this.cantidadUltimosTresTortaBiscocho50Redonda + venta.torta_bizcocho_50_redonda;
            this.cantidaUltimosTresTortaBiscocho15Rectangular = this.cantidaUltimosTresTortaBiscocho15Rectangular + venta.torta_bizcocho_15_rectangular;
            this.cantidadUltimosTresTortaBiscocho30Rectangular = this.cantidadUltimosTresTortaBiscocho30Rectangular + venta.torta_bizcocho_30_rectangular;
            this.cantidadUltimosTresTortaBiscocho40Rectangular = this.cantidadUltimosTresTortaBiscocho40Rectangular + venta.torta_bizcocho_40_rectangular;
            this.cantidadUltimosTresTortaBiscocho60Rectangular = this.cantidadUltimosTresTortaBiscocho60Rectangular + venta.torta_bizcocho_60_rectangular;
            this.cantidadUltimosTresTortaEspecial12Panqueue = this.cantidadUltimosTresTortaEspecial12Panqueue + venta.torta_especial_12_panqueque;
            this.cantidadUltimosTresTortaEspecial20Panqueue = this.cantidadUltimosTresTortaEspecial20Panqueue + venta.torta_especial_20_panqueque;
            this.cantidadUltimosTresTortaEspecial30Panqueue = this.cantidadUltimosTresTortaEspecial30Panqueue + venta.torta_especial_30_panqueque;
            this.cantidadUltimosTresTortaEspecial15HojarascaMilhoja = this.cantidadUltimosTresTortaEspecial15HojarascaMilhoja + venta.torta_especial_15_hojarasca_milhoja;
            this.cantidadUltimosTresTortaEspecial20HojarascaMilhoja = this.cantidadUltimosTresTortaEspecial20HojarascaMilhoja + venta.torta_especial_20_hojarasca_milhoja;
            this.cantidadUltimosTresTortaEspecial30HojarascaMilhoja = this.cantidadUltimosTresTortaEspecial30HojarascaMilhoja + venta.torta_especial_30_hojarasca_milhoja;
          }
          /* FIN lógica de último trimestre */

          /* INICIO lógica de último semestre */
          if((venta.mes == (fecha.getMonth()-2)) || (venta.mes == (fecha.getMonth()-1) || (venta.mes == (fecha.getMonth()) || (venta.mes == (fecha.getMonth()+1)|| (venta.mes == (fecha.getMonth()+2) || (venta.mes == (fecha.getMonth()+3))))))){
            this.ventasAnioActual++;
            this.totalSemestrePrimer = this.totalSemestrePrimer + venta.valor_venta; /* Total en ventas en mes actual */
            this.cantidadUltimosSeisTortaBiscocho15Redonda = this.cantidadUltimosSeisTortaBiscocho15Redonda + venta.torta_bizcocho_15_redonda;
            this.cantidadUltimosSeisTortaBiscocho20Redonda = this.cantidadUltimosSeisTortaBiscocho20Redonda + venta.torta_bizcocho_20_redonda;
            this.cantidadUltimosSeisTortaBiscocho30Redonda = this.cantidadUltimosSeisTortaBiscocho30Redonda + venta.torta_bizcocho_30_redonda;
            this.cantidadUltimosSeisTortaBiscocho40Redonda = this.cantidadUltimosSeisTortaBiscocho40Redonda + venta.torta_bizcocho_40_redonda;
            this.cantidadUltimosSeisTortaBiscocho50Redonda = this.cantidadUltimosSeisTortaBiscocho50Redonda + venta.torta_bizcocho_50_redonda;
            this.cantidaUltimosSeisTortaBiscocho15Rectangular = this.cantidaUltimosSeisTortaBiscocho15Rectangular + venta.torta_bizcocho_15_rectangular;
            this.cantidadUltimosSeisTortaBiscocho30Rectangular = this.cantidadUltimosSeisTortaBiscocho30Rectangular + venta.torta_bizcocho_30_rectangular;
            this.cantidadUltimosSeisTortaBiscocho40Rectangular = this.cantidadUltimosSeisTortaBiscocho40Rectangular + venta.torta_bizcocho_40_rectangular;
            this.cantidadUltimosSeisTortaBiscocho60Rectangular = this.cantidadUltimosSeisTortaBiscocho60Rectangular + venta.torta_bizcocho_60_rectangular;
            this.cantidadUltimosSeisTortaEspecial12Panqueue = this.cantidadUltimosSeisTortaEspecial12Panqueue + venta.torta_especial_12_panqueque;
            this.cantidadUltimosSeisTortaEspecial20Panqueue = this.cantidadUltimosSeisTortaEspecial20Panqueue + venta.torta_especial_20_panqueque;
            this.cantidadUltimosSeisTortaEspecial30Panqueue = this.cantidadUltimosSeisTortaEspecial30Panqueue + venta.torta_especial_30_panqueque;
            this.cantidadUltimosSeisTortaEspecial15HojarascaMilhoja = this.cantidadUltimosSeisTortaEspecial15HojarascaMilhoja + venta.torta_especial_15_hojarasca_milhoja;
            this.cantidadUltimosSeisTortaEspecial20HojarascaMilhoja = this.cantidadUltimosSeisTortaEspecial20HojarascaMilhoja + venta.torta_especial_20_hojarasca_milhoja;
            this.cantidadUltimosSeisTortaEspecial30HojarascaMilhoja = this.cantidadUltimosSeisTortaEspecial30HojarascaMilhoja + venta.torta_especial_30_hojarasca_milhoja;
          }
          /* FIN lógica de último semestre */
        });
        //this.setContadoresMesActual(this.ventasMesActualArray, this.contadorMesActual);
      }
    );
  }

  private setgraficoMesActual(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    const canvas: any = document.getElementById('tortaChart');
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

  private setgraficoTresMeses(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    const canvas: any = document.getElementById('barraChartTresMeses');
    const ctx = canvas.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'bar',
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

  private setgraficoSeisMeses(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    console.log("setgraficoSeisMeses tipos de tortas: ", tiposDeTortas);
    console.log("setgraficoSeisMeses cantidad de tortas: ", cantidadDeTortas);
    const canvas: any = document.getElementById('pieChartSeisMeses');
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
            'rgba(255, 159, 64, 0.7)'
          ]
        }]
      }
    });
  }

  private setgraficoAnioActual(tiposDeTortas: string[], cantidadDeTortas: number[]) {
    const canvas: any = document.getElementById('pieChartAnioActual');
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
