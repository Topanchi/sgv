import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';

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
  public totalMesActual:any = 0;
  public totalTrimestre:any = 0;
  public totalSemestrePrimer:any = 0;
  public totalSemestreSegundo:any = 0;
  public totalAnioActual:any = 0;
  public ventasMesActual:any = 0;

  constructor(
    private _ventaService: VentaService,
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  public obtenerVentas() {
    const fecha = new Date();
    console.log(fecha.toLocaleDateString());
    console.log(fecha.getMonth()-2);
    console.log(fecha.getMonth()-1);
    console.log(fecha.getMonth());
    console.log(fecha.getMonth()+1);
    console.log(fecha.getMonth()+2);
    this._ventaService.getVentas('').subscribe(
      response => {
        this.data_ventas = (response);
        console.log(this.data_ventas);
        this.data_ventas.forEach(venta => {
          /* INICIO lógica de total año actual */
          if(venta.anio == (fecha.getFullYear())){
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
            this.totalTrimestre = this.totalTrimestre + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de último trimestre */

          /* INICIO lógica de último semestre */
          if((venta.mes == (fecha.getMonth()-2)) || (venta.mes == (fecha.getMonth()-1) || (venta.mes == (fecha.getMonth()) || (venta.mes == (fecha.getMonth()+1)|| (venta.mes == (fecha.getMonth()+2) || (venta.mes == (fecha.getMonth()+3))))))){
            this.totalSemestrePrimer = this.totalSemestrePrimer + venta.valor_venta; /* Total en ventas en mes actual */
          }
          /* FIN lógica de último semestre */
        });
      }
    );
  }

}
