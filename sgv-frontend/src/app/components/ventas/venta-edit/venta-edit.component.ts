import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { VentaService } from '../../../services/venta.service';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import { ConstantesCategorias } from '../../../utils/constantes-categorias';
import { DetalleVenta } from '../../../models/detalleventa';
import { Venta } from '../../../models/venta';
import { User } from 'src/app/models/user';

import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';

declare const $: any; // avoid the error on $(this.eInput).datepicker();
datepickerFactory($);
datepickerJAFactory($);

@Component({
  selector: 'app-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VentaEditComponent implements OnInit {

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  public identity: any;
  public id: any;
  public venta: any = {
    descripcion_venta : '',
  };
  public productos: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;
  public error_msg_venta: String | undefined;

  public producto: any = {
    valor_producto: '0',
    cantidad: null
  }

  public data_detalle : Array<any> = [];
  public detalle: any = {
    idproducto: ''
  };

  public total: number = 0;
  public model:any;

  public pivote_torta_bizcocho_15_redonda: number = 0;
  public pivote_torta_bizcocho_20_redonda: number = 0;
  public pivote_torta_bizcocho_30_redonda: number = 0;
  public pivote_torta_bizcocho_40_redonda: number = 0;
  public pivote_torta_bizcocho_50_redonda: number = 0;
  public pivote_torta_bizcocho_15_rectangular: number = 0;
  public pivote_torta_bizcocho_30_rectangular: number = 0;
  public pivote_torta_bizcocho_40_rectangular: number = 0;
  public pivote_torta_bizcocho_60_rectangular: number = 0;
  public pivote_torta_especial_12_panqueque: number = 0;
  public pivote_torta_especial_20_panqueque: number = 0;
  public pivote_torta_especial_30_panqueque: number = 0;
  public pivote_torta_especial_15_hojarasca_milhoja: number = 0;
  public pivote_torta_especial_20_hojarasca_milhoja: number = 0;
  public pivote_torta_especial_30_hojarasca_milhoja: number = 0;
  public pivote_data_detalles: any[];
  public tipo_producto: String;

  constructor(
    private _userService: UserService,
    private _productoService: ProductoService,
    private _ventaService: VentaService,
    private _router: Router,
    private _route: ActivatedRoute
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
          (response) => {
            this.venta = response.venta;
            console.log("obj:::::::::::: ", response);
            response.detalles.forEach((element, index) => {
              console.log(element,index);
              this.data_detalle.push({
                idproducto: element.idProducto._id,
                cantidad: +element.cantidad,
                valor_producto: element.idProducto.valor_producto,
                producto: element.idProducto.descripcion
              });
              this.total = this.total + ((parseInt(element.idProducto.valor_producto)) * (parseInt(element.cantidad)));
            });            
            console.log("venta editar::: ", this.venta);
            console.log("detalle editar: ", this.data_detalle);
            
          },
          error => {}
        );
        
      });
      this.obtenerProductos();
    }else{
      this._router.navigate(['']);
    }
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
          producto: this.producto.descripcion,
          tipo_producto: this.producto.tipo_producto
        });
        console.log("this.data_detalle.push:", this.data_detalle);
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
      console.log(ventaForm.value);
      let fechaPicker = $("#fecha_venta").datepicker()[0].value;
      ventaForm.value.fecha_venta = fechaPicker;
      let fechaFinal = ventaForm.value.fecha_venta.toString();
      console.log(fechaFinal)
      let fecha2Final = fechaFinal.split('/');

      this.seteoCantidadDeProductos(this.data_detalle);
      this.pivote_data_detalles = this.data_detalle;
      this.envioDataContadores(this.pivote_data_detalles, ventaForm.value, fechaPicker, fecha2Final);

      this.envioDataMontoContadoresTortas(this.pivote_data_detalles, fechaPicker, fecha2Final);

      if(ventaForm.value.descripcion_venta != '' && ventaForm.value.fecha_venta != undefined){

        Swal.fire({
          title: '¿Desea actualizar la venta?',
          text: "Puede editar la venta mas adelante!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {

            let data = {
              _id: this.id,
              descripcion_venta: ventaForm.value.descripcion_venta,
              nombre_cliente: ventaForm.value.nombre_cliente,
              iduser: this.identity.id,
              fecha_venta: fechaPicker,
              mes: +fecha2Final[1],
              anio: +fecha2Final[2],
              valor_venta: this.total,
              tipo_producto: ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA,
              detalles: this.data_detalle
            }
    
            console.log("Data final: ", data);

            this._ventaService.actualizarVenta({
              _id: this.id,
              descripcion_venta: ventaForm.value.descripcion_venta,
              nombre_cliente: ventaForm.value.nombre_cliente,
              iduser: this.identity.id,
              fecha_venta: fechaPicker,
              mes: +fecha2Final[1],
              anio: +fecha2Final[2],
              valor_venta: this.total,
              detalles: this.data_detalle,
              torta_bizcocho_15_redonda: this.pivote_torta_bizcocho_15_redonda,
              torta_bizcocho_20_redonda: this.pivote_torta_bizcocho_20_redonda,
              torta_bizcocho_30_redonda: this.pivote_torta_bizcocho_30_redonda,
              torta_bizcocho_40_redonda: this.pivote_torta_bizcocho_40_redonda,
              torta_bizcocho_50_redonda: this.pivote_torta_bizcocho_50_redonda,
              torta_bizcocho_15_rectangular: this.pivote_torta_bizcocho_15_rectangular,
              torta_bizcocho_30_rectangular: this.pivote_torta_bizcocho_30_rectangular,
              torta_bizcocho_40_rectangular: this.pivote_torta_bizcocho_40_rectangular,
              torta_bizcocho_60_rectangular: this.pivote_torta_bizcocho_60_rectangular,
              torta_especial_12_panqueque: this.pivote_torta_especial_12_panqueque,
              torta_especial_20_panqueque: this.pivote_torta_especial_20_panqueque,
              torta_especial_30_panqueque: this.pivote_torta_especial_30_panqueque,
              torta_especial_15_hojarasca_milhoja: this.pivote_torta_especial_15_hojarasca_milhoja,
              torta_especial_20_hojarasca_milhoja: this.pivote_torta_especial_20_hojarasca_milhoja,
              torta_especial_30_hojarasca_milhoja: this.pivote_torta_especial_30_hojarasca_milhoja
            }).subscribe(
              response => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Venta actualizada!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this._router.navigate(['ventas']);
              },
              error => {
                console.log("Error: ", error);
              }
            );
          }
        })

      }else{
        console.log("error en el formulario");
        this.error_msg_venta = 'Complete correctamente el formulario';
      }
    }else{
      console.log("error en el formulario");
      this.error_msg_venta = 'Complete correctamente el formulario';
    }
  }

  public close_alert_success() {
    this.success_msg = '';
  }

  public close_alert_error() {
    this.error_msg = '';
  }

  public close_alert_error_venta() {
    this.error_msg_venta = '';
  }

  public onCleanForm(ventaForm:any) {
    ventaForm.reset();
    console.log("Ya limpié el formulario")
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

  /* public dateChanged($event) {
    console.log("fecha: ", typeof $event.target.value);
    let fecha = $event.target.value;

    console.log("fecha: ", fecha);
    
    console.log(fecha.toString());
    console.log("fecha: ", typeof fecha);
  } */

  private obtenerProductos() {
    this._productoService.getProductos('').subscribe(
      response => {
        this.productos = response;
      },
      error => {

      }
    );
  }

  private seteoCantidadDeProductos(data_detalle: any[]) {
    data_detalle.forEach(detalle => {
      /* TORTAS BIZCOCHO REDONDAS */
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA){
        this.pivote_torta_bizcocho_15_redonda = this.pivote_torta_bizcocho_15_redonda + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA){
        this.pivote_torta_bizcocho_20_redonda = this.pivote_torta_bizcocho_20_redonda + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA){
        this.pivote_torta_bizcocho_30_redonda = this.pivote_torta_bizcocho_30_redonda + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA){
        this.pivote_torta_bizcocho_40_redonda = this.pivote_torta_bizcocho_40_redonda + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA){
        this.pivote_torta_bizcocho_50_redonda = this.pivote_torta_bizcocho_50_redonda + detalle.cantidad;
      }
      /* TORTAS BIZCOCHO RECTANGULAR */
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR){
        this.pivote_torta_bizcocho_15_rectangular = this.pivote_torta_bizcocho_15_rectangular + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR){
        this.pivote_torta_bizcocho_30_rectangular = this.pivote_torta_bizcocho_30_rectangular + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR){
        this.pivote_torta_bizcocho_40_rectangular = this.pivote_torta_bizcocho_40_rectangular + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR){
        this.pivote_torta_bizcocho_60_rectangular = this.pivote_torta_bizcocho_60_rectangular + detalle.cantidad;
      }
      /* TORTAS ESPECIALES */
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE){
        this.pivote_torta_especial_12_panqueque = this.pivote_torta_especial_12_panqueque + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE){
        this.pivote_torta_especial_20_panqueque = this.pivote_torta_especial_20_panqueque + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE){
        this.pivote_torta_especial_30_panqueque = this.pivote_torta_especial_30_panqueque + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA){
        this.pivote_torta_especial_15_hojarasca_milhoja = this.pivote_torta_especial_15_hojarasca_milhoja + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA){
        this.pivote_torta_especial_20_hojarasca_milhoja = this.pivote_torta_especial_20_hojarasca_milhoja + detalle.cantidad;
      }
      if(detalle.producto == ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA){
        this.pivote_torta_especial_30_hojarasca_milhoja = this.pivote_torta_especial_30_hojarasca_milhoja + detalle.cantidad;
      }
    });
  }

  private envioDataContadores(data_detalle: any[], value: any, fechaPicker: any, fecha2Final: any[]) {
    var objetosClonados = [];
    data_detalle.forEach(detalle => {
      let data = {
        fecha_venta: fechaPicker,
        mes: +fecha2Final[1],
        anio: +fecha2Final[2],
        producto_vendido: detalle.producto
      }

      if(detalle.cantidad != 0){
        for (var i = 0; i < detalle.cantidad; i++) {
          // Crear una copia del objeto original utilizando JSON.parse() y JSON.stringify()
          var objetoClonado = JSON.parse(JSON.stringify(data));
          // Añadir el objeto clonado al array de objetos clonados
          console.log("objetoClonado: ", objetoClonado)
          //llamada al servicio que guarda el objeto
          this._ventaService.guardarVentaContador(objetoClonado).subscribe(
            response => {
              console.log("contador guardado con éxito");
            },
            error => {
              console.log("Error: ", error);
            }
          );

          objetosClonados.push(objetoClonado);
        }
        console.log("producto a irse a contador: ", objetosClonados);
      }
    });

    
  }

  private envioDataMontoContadoresTortas(data_detalle: any[],  fechaPicker: any, fecha2Final: any ) {

    var objetosClonados = [];

    data_detalle.forEach(detalle => {
      this.mapeoProducto(detalle.producto);

      let data = {
        fecha_venta: fechaPicker,
        mes: +fecha2Final[1],
        anio: +fecha2Final[2],
        producto_vendido: detalle.producto,
        tipo_producto: this.tipo_producto, 
        valor_producto_vendido: +detalle.valor_producto
      }

      if(detalle.cantidad != 0){
        for (var i = 0; i < detalle.cantidad; i++) {
          // Crear una copia del objeto original utilizando JSON.parse() y JSON.stringify()
          var objetoClonado = JSON.parse(JSON.stringify(data));
          //llamada al servicio que guarda el objeto

          this._ventaService.guardarMontoVentaContador(objetoClonado).subscribe(
            response => {
              console.log("contador guardado con éxito");
            },
            error => {
              console.log("Error: ", error);
            }
          );

          objetosClonados.push(objetoClonado);
        }
      }
    });
  }


  private mapeoProducto(producto: any) {

    if(producto == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA 
      || producto == ConstantesCategorias.TORTA_BISCOCHO_15_REDONDA
      || producto == ConstantesCategorias.TORTA_BISCOCHO_20_REDONDA
      || producto == ConstantesCategorias.TORTA_BISCOCHO_30_REDONDA
      || producto == ConstantesCategorias.TORTA_BISCOCHO_40_REDONDA
      || producto == ConstantesCategorias.TORTA_BISCOCHO_50_REDONDA
      || producto == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR
      || producto == ConstantesCategorias.TORTA_BISCOCHO_30_REECTANGULAR
      || producto == ConstantesCategorias.TORTA_BISCOCHO_40_REECTANGULAR
      || producto == ConstantesCategorias.TORTA_BISCOCHO_15_REECTANGULAR
      || producto == ConstantesCategorias.TORTA_BISCOCHO_60_REECTANGULAR
      || producto == ConstantesCategorias.TORTA_ESPECIAL_12_PANQUEQUE
      || producto == ConstantesCategorias.TORTA_ESPECIAL_20_PANQUEQUE
      || producto == ConstantesCategorias.TORTA_ESPECIAL_30_PANQUEQUE
      || producto == ConstantesCategorias.TORTA_ESPECIAL_15_HOJARASCA_MILHOJA
      || producto == ConstantesCategorias.TORTA_ESPECIAL_20_HOJARASCA_MILHOJA
      || producto == ConstantesCategorias.TORTA_ESPECIAL_30_HOJARASCA_MILHOJA
      || producto == ConstantesCategorias.LAMINA_AZUCAR
      || producto == ConstantesCategorias.CUBIERTA_MERENGUE
      || producto == ConstantesCategorias.TRES_LECHES
      || producto == ConstantesCategorias.DIBUJO_CHOCOLATE
      || producto == ConstantesCategorias.DIBUJO_CHOCOLATE_COLOR
      || producto == ConstantesCategorias.JARDIN_FLORES_CREMA
      || producto == ConstantesCategorias.FLORES_ARTIFICIALES
      || producto == ConstantesCategorias.SOLO_COLOR
      ){
        this.tipo_producto= "torta";
    }

    /* Agregar if evento */

    /* Agregar if banqueteria salada */

    /* Agregar if banqueteria dulce */
    if(producto == ConstantesCategorias.REPOLLITOS 
      || producto == ConstantesCategorias.MIX_DULCE_TRADICIONAL
      || producto == ConstantesCategorias.MIX_DULCE_ESPECIAL
      || producto == ConstantesCategorias.MIX_DULCE_ESTACION
      || producto == ConstantesCategorias.CAJA_DULCE_1
      || producto == ConstantesCategorias.CAJA_DULCE_2
      || producto == ConstantesCategorias.CAJA_DULCE_3
      ){
        this.tipo_producto= "banqueteria dulce";
    }
  }
}
