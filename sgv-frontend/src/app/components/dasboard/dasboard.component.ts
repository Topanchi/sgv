import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { ConstantesCategorias } from '../../utils/constantes-categorias';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  public identity: any;
  public ventas: any = {
    
  };

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

  constructor(
    private _ventaService: VentaService,
  ) { }

  ngOnInit(): void {
    const fecha = new Date();
    console.log("Mes actual: ", fecha.getMonth()+1);
    console.log("ültimos tres meses: ", fecha.getMonth()-1, fecha.getMonth(), fecha.getMonth()+1);
    console.log("ültimos seis meses: ", fecha.getMonth()-2, fecha.getMonth()-1, fecha.getMonth(), fecha.getMonth()+1, fecha.getMonth()+2, fecha.getMonth()+3,);
    this.obtenerVentas();
  }

  public obtenerVentas() {
    const fecha = new Date();

    this._ventaService.getVentas('').subscribe(
      response => {
        this.data_ventas = (response);
        console.log(this.data_ventas);
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
            this.ventasMesActual++; /* Cantidad de ventas en mes actual */
            this.totalMesActual = this.totalMesActual + venta.valor_venta; /* Total en ventas en mes actual */
            this.cantidadMesActualTortaBiscocho15Redonda =  this.cantidadMesActualTortaBiscocho15Redonda + venta.torta_bizcocho_15_redonda;
            this.cantidadMesActualTortaBiscocho20Redonda = this.cantidadMesActualTortaBiscocho20Redonda + venta.torta_bizcocho_20_redonda;
            this.cantidadMesActualTortaBiscocho30Redonda = this.cantidadMesActualTortaBiscocho30Redonda + venta.torta_bizcocho_30_redonda;
            this.cantidadMesActualTortaBiscocho40Redonda = this.cantidadMesActualTortaBiscocho40Redonda + venta.torta_bizcocho_40_redonda;
            this.cantidadMesActualTortaBiscocho50Redonda = this.cantidadMesActualTortaBiscocho50Redonda + venta.torta_bizcocho_50_redonda;
            this.cantidadMesActualTortaBiscocho15Rectangular = this.cantidadMesActualTortaBiscocho15Rectangular + venta.torta_bizcocho_15_rectangular;
            this.cantidadMesActualTortaBiscocho30Rectangular = this.cantidadMesActualTortaBiscocho30Rectangular + venta.torta_bizcocho_30_rectangular;
            this.cantidadMesActualTortaBiscocho40Rectangular = this.cantidadMesActualTortaBiscocho40Rectangular + venta.torta_bizcocho_40_rectangular;
            this.cantidadMesActualTortaBiscocho60Rectangular = this.cantidadMesActualTortaBiscocho60Rectangular + venta.torta_bizcocho_60_rectangular;
            this.cantidadMesActualTortaEspecial12Panqueue = this.cantidadMesActualTortaEspecial12Panqueue + venta.torta_especial_12_panqueque;
            this.cantidadMesActualTortaEspecial20Panqueue = this.cantidadMesActualTortaEspecial20Panqueue + venta.torta_especial_20_panqueque;
            this.cantidadMesActualTortaEspecial30Panqueue = this.cantidadMesActualTortaEspecial30Panqueue + venta.torta_especial_30_panqueque;
            this.cantidadMesActualTortaEspecial15HojarascaMilhoja = this.cantidadMesActualTortaEspecial15HojarascaMilhoja + venta.torta_especial_15_hojarasca_milhoja;
            this.cantidadMesActualTortaEspecial20HojarascaMilhoja = this.cantidadMesActualTortaEspecial20HojarascaMilhoja + venta.torta_especial_20_hojarasca_milhoja;
            this.cantidadMesActualTortaEspecial30HojarascaMilhoja = this.cantidadMesActualTortaEspecial30HojarascaMilhoja + venta.torta_especial_30_hojarasca_milhoja;
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
      }
    );

  }

}
