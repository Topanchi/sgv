import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { VentaService } from '../../../services/venta.service';
import { UserService } from '../../../services/user.service';

import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';

declare const $: any; // avoid the error on $(this.eInput).datepicker();
datepickerFactory($);
datepickerJAFactory($);

@Component({
  selector: 'app-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.css']
})
export class VentaEditComponent implements OnInit {

  public id: any;
  public identity: any;
  //public categorias: any;
  public success_msg: String | undefined;
  public error_msg_venta: String | undefined;

  public venta: any = {
    descripcion_venta : '',
  };
  public productos: any;

  public error_msg: String | undefined;


  public producto: any = {
    valor_producto: '0',
    cantidad: null
  }

  public data_detalle : Array<any> = [];
  public detalle: any = {
    idproducto: ''
  };
  public detalle_venta: any = {};

  public total: number = 0;

  public model:any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _productoService: ProductoService,
    private _ventaService: VentaService
  ) {
    this.identity = this._userService.getIdentity();

    $(function() {
      $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
      };
      $.datepicker.setDefaults($.datepicker.regional['es']);
      $(function () {
        $("#fecha_venta").datepicker();
      });
    });
   }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(params => {
        this.id = params['id'];
        this._ventaService.getVentaPorId(this.id).subscribe(
          response => {
            this.venta = response.venta;
            console.log("venta editar: ", this.venta);
            this.detalle_venta = response.detalles
          },
          error => {}
        );
        
      });
      this.obtenerProductos();
    }else{
      this._router.navigate(['']);
    }
    
    
  }

  /* public onCleanForm(productoForm:any) {
    productoForm.reset();
    console.log("Ya limpié el formulario")
  } */

  public close_alert_success() {
    this.success_msg = '';
  }

  public close_alert_error_venta() {
    this.error_msg_venta = '';
  }

  public getDataProducto(id:any) {
    this._productoService.getProductoPorId(id.value).subscribe(
      response => {
        this.producto = response;
      },
      error => {

      }
    );
  }

  private obtenerProductos() {
    this._productoService.getProductos('').subscribe(
      response => {
        this.productos = response;
      },
      error => {

      }
    );
  }

  public onSubmitVenta(ventaForm:any){
    if(ventaForm.valid){

    }else{
      
    }
  }

}
