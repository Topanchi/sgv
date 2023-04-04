import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { VentaService } from '../../../services/venta.service';
import { UserService } from '../../../services/user.service';
import { DetalleVenta } from '../../../models/detalleventa';

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
            this.detalle_venta = response.detalles
            console.log("venta editar::: ", this.venta);
            console.log("detalle editar: ", this.detalle_venta);
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

  public onSubmitDetalle(detalleForm:any) {
    if(detalleForm.valid){

      if(detalleForm.value.cantidad == '0' || detalleForm.value.cantidad == null || detalleForm.value.cantidad == ''){
        console.log("error en el formulario");
        this.error_msg = 'La cantidad debe ser mayor a 0'
      }else{
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: +detalleForm.value.cantidad,
          valor_producto: this.producto.valor_producto,
          producto: this.producto.descripcion
        });

        this.total = this.total + ((parseInt(this.producto.valor_producto)) * (parseInt(detalleForm.value.cantidad)));

        this.detalle = new DetalleVenta('','','','');
        this.producto.valor_producto = '0';
      }
    }else{
      console.log("error en el formulario");
      this.error_msg = 'Complete correctamente el formulario'
    }
  }

  public eliminarProductoLista(idx:any,valor_producto:any,cantidad:any){
    this.data_detalle.splice(idx,1);
    this.total = this.total - (parseInt(valor_producto) * parseInt(cantidad));
  }

  public onSubmitVenta(ventaForm:any){
    if(ventaForm.valid){

    }else{
      
    }
  }

}
