import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  public identity: any;
  public id: any;
  public venta: any = {
    iduser: '',
  };
  public detalle_venta: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    //if(this.identity){

      this._route.params.subscribe(params => {
        this.id = params['id'];
        this._ventaService.getVentaPorId(this.id).subscribe(
          response => {
            this.venta = response.venta;
            this.detalle_venta = response.detalles
            console.log(this.venta);
            console.log(this.detalle_venta);
          },
          error => {
  
          }
        );
        
      });

    /* }else{
      this._router.navigate(['']);
    } */
  }

    

}
