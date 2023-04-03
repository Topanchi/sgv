import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VentaService } from '../../../services/venta.service';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import { DetalleVenta } from '../../../models/detalleventa';
import { Venta } from '../../../models/venta';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {

  public identity: any;
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

  constructor(
    private _userService: UserService,
    private _productoService: ProductoService,
    private _ventaService: VentaService,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this.obtenerProductos();
      console.log(this.identity);
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
        console.log(detalleForm.value);
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: +detalleForm.value.cantidad,
          valor_producto: this.producto.valor_producto,
          producto: this.producto.descripcion
        });

        console.log(this.data_detalle);

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
      if(ventaForm.value.descripcion_venta != ''){
        let data = {
          descripcion_venta: ventaForm.value.descripcion_venta,
          iduser: this.identity.id,
          fecha_venta: ventaForm.value.fecha_venta,
          mes: +ventaForm.value.mes,
          anio: +ventaForm.value.anio,
          valor_venta: this.total,
          detalles: this.data_detalle
        }

        console.log("Data final: ", data);

        /* this._ventaService.guardarVenta(data).subscribe(
          response => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Venta registrada!',
              showConfirmButton: false,
              timer: 1500
            })
            this._router.navigate(['ventas']);
          },
          error => {
            console.log("Error: ", error);
          }
        ); */

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
        console.log("Selecc?: ",this.producto);
      },
      error => {

      }
    );
  }

  private obtenerProductos() {
    this._productoService.getProductos('').subscribe(
      response => {
        this.productos = response;
        console.log("produxtos: ", this.productos);
      },
      error => {

      }
    );
  }
}
