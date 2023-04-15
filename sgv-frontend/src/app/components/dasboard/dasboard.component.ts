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

  public cantidadUltimosTresTortaBiscocho15Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho20Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho30Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho40Redonda:any = 0;
  public cantidadUltimosTresTortaBiscocho50Redonda:any = 0;
  public cantidaUltimosTresTortaBiscocho15Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho30Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho40Rectangular:any = 0;
  public cantidadUltimosTresTortaBiscocho60Rectangular:any = 0;

  public cantidadUltimosSeisTortaBiscocho15Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho20Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho30Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho40Redonda:any = 0;
  public cantidadUltimosSeisTortaBiscocho50Redonda:any = 0;
  public cantidaUltimosSeisTortaBiscocho15Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho30Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho40Rectangular:any = 0;
  public cantidadUltimosSeisTortaBiscocho60Rectangular:any = 0;

  public cantidadAnioActualTortaBiscocho15Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho20Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho30Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho40Redonda:any = 0;
  public cantidadAnioActualTortaBiscocho50Redonda:any = 0;
  public cantidaAnioActualTortaBiscocho15Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho30Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho40Rectangular:any = 0;
  public cantidadAnioActualTortaBiscocho60Rectangular:any = 0;

  public cantidadTrimestre:any = 0;
  public cantidadSemestrePrimer:any = 0;
  public cantidadSemestreSegundo:any = 0;
  public cantidadAnioActual:any = 0;

  constructor(
    private _ventaService: VentaService,
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  public obtenerVentas() {
    const fecha = new Date();

    this._ventaService.getVentas('').subscribe(
      response => {
        this.data_ventas = (response);
        console.log(this.data_ventas);
        this.data_ventas.forEach((venta,index) => {
          let id = venta._id;

          this._ventaService.getVentaPorId(id).subscribe(
            response => {
              console.log("Venta: ", index, response.detalles)
              this.data_detalles = response.detalles; 

              this.data_detalles.forEach((detalle, pos)=>{
                /* Mes actual */
                if(venta.mes == (fecha.getMonth()+1)){
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA){
                    this.cantidadMesActualTortaBiscocho15Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA){
                    this.cantidadMesActualTortaBiscocho20Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA){
                    this.cantidadMesActualTortaBiscocho30Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA){
                    this.cantidadMesActualTortaBiscocho40Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA){
                    this.cantidadMesActualTortaBiscocho50Redonda++;
                  }
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR){
                    this.cantidadMesActualTortaBiscocho15Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR){
                    this.cantidadMesActualTortaBiscocho30Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR){
                    this.cantidadMesActualTortaBiscocho40Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR){
                    this.cantidadMesActualTortaBiscocho60Rectangular++;
                  } 
                  
                }
      
                /* Últimos tres meses */
                if((venta.mes == (fecha.getMonth())) || (venta.mes == (fecha.getMonth()+1) || (venta.mes == (fecha.getMonth()+2)))){
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA){
                    this.cantidadUltimosTresTortaBiscocho15Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA){
                    this.cantidadUltimosTresTortaBiscocho20Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA){
                    this.cantidadUltimosTresTortaBiscocho30Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA){
                    this.cantidadUltimosTresTortaBiscocho40Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA){
                    this.cantidadUltimosTresTortaBiscocho50Redonda++;
                  }
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR){
                    this.cantidaUltimosTresTortaBiscocho15Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR){
                    this.cantidadUltimosTresTortaBiscocho30Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR){
                    this.cantidadUltimosTresTortaBiscocho40Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR){
                    this.cantidadUltimosTresTortaBiscocho60Rectangular++;
                  } 
                }

                /* Últimos seis meses*/
                if((venta.mes == (fecha.getMonth()-2)) || (venta.mes == (fecha.getMonth()-1) || (venta.mes == (fecha.getMonth()) || (venta.mes == (fecha.getMonth()+1)|| (venta.mes == (fecha.getMonth()+2) || (venta.mes == (fecha.getMonth()+3))))))){
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA){
                    this.cantidadUltimosSeisTortaBiscocho15Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA){
                    this.cantidadUltimosSeisTortaBiscocho20Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA){
                    this.cantidadUltimosSeisTortaBiscocho30Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA){
                    this.cantidadUltimosSeisTortaBiscocho40Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA){
                    this.cantidadUltimosSeisTortaBiscocho50Redonda++;
                  }
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR){
                    this.cantidaUltimosSeisTortaBiscocho15Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR){
                    this.cantidadUltimosSeisTortaBiscocho30Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR){
                    this.cantidadUltimosSeisTortaBiscocho40Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR){
                    this.cantidadUltimosSeisTortaBiscocho60Rectangular++;
                  } 
                }

                /* Total anual */
                if(venta.anio == (fecha.getFullYear())){
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA){
                    this.cantidadAnioActualTortaBiscocho15Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA){
                    this.cantidadAnioActualTortaBiscocho20Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA){
                    this.cantidadAnioActualTortaBiscocho30Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA){
                    this.cantidadAnioActualTortaBiscocho40Redonda++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA){
                    this.cantidadAnioActualTortaBiscocho50Redonda++;
                  }
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR){
                    this.cantidaAnioActualTortaBiscocho15Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR){
                    this.cantidadAnioActualTortaBiscocho30Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR){
                    this.cantidadAnioActualTortaBiscocho40Rectangular++;
                  } 
                  if(detalle.idProducto.descripcion == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR){
                    this.cantidadAnioActualTortaBiscocho60Rectangular++;
                  }   
                }
                 
              });
            }
          ); 
          /* INICIO lógica de total año actual */
          if(venta.anio == (fecha.getFullYear())){
            this.ventasAnioActual++;
            this.totalAnioActual = this.totalAnioActual + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de de total año actual */


          /* INICIO lógica de mes actual */
          if(venta.mes == (fecha.getMonth()+1)){
            this.ventasMesActual++; /* Cantidad de ventas en mes actual */
            this.totalMesActual = this.totalMesActual + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de mes actual */

          /* INICIO lógica de último trimestre */
          if((venta.mes == (fecha.getMonth())) || (venta.mes == (fecha.getMonth()+1) || (venta.mes == (fecha.getMonth()+2)))){
            this.ventasUltimoTrimestre++;
            this.totalTrimestre = this.totalTrimestre + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de último trimestre */

          /* INICIO lógica de último semestre */
          if((venta.mes == (fecha.getMonth()-2)) || (venta.mes == (fecha.getMonth()-1) || (venta.mes == (fecha.getMonth()) || (venta.mes == (fecha.getMonth()+1)|| (venta.mes == (fecha.getMonth()+2) || (venta.mes == (fecha.getMonth()+3))))))){
            this.ventasAnioActual++;
            this.totalSemestrePrimer = this.totalSemestrePrimer + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de último semestre */
        });
      }
    );

  }

}
