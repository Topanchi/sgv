import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from "../../../models/producto";

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public categorias: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(
    private _router: Router,
    private _productoService: ProductoService
  ) { 
    this.producto = new Producto('','','','','','');
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  public onSubmit(productoForm:any) {
    if(productoForm.valid){
      console.log(productoForm.value);
      this._productoService.guardarProducto({
        descripcion: productoForm.value.descripcion,
        valor_producto: productoForm.value.valor_producto,
        categoria: productoForm.value.categoria,
        tipo_producto: productoForm.value.tipo_producto
      }).subscribe(
        response => {
          this.success_msg = "Se registró el producto correctamente";
          productoForm.reset();
        },
        error => {

        }
      );
    }else{
      console.log("error en el formulario");
      this.error_msg = 'Complete correctamente el formulario'
    }
  }

  public onCleanForm(productoForm:any) {
    productoForm.reset();
    console.log("Ya limpié el formulario")
  }

  public close_alert_success() {
    this.success_msg = '';
  }

  public close_alert_error() {
    this.error_msg = '';
  }

  private obtenerCategorias() {
    this._productoService.getCategorias('').subscribe(
      response => {
        this.categorias = response;
        console.log("Categorias: ",this.categorias);
      },
      error => {

      }
    );
  }

}
