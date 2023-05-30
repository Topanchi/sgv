import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto: any;
  public id: any;
  public categorias: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productoService: ProductoService
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._productoService.getProductoPorId(this.id).subscribe(
        response => {
          this.producto = response;
          console.log("Producto a editar: ",this.producto);
        },
        error => {

        }
      );
    });
    this.obtenerCategorias();
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

  public onSubmit(productoForm:any) {
    if(productoForm.valid){
      console.log(productoForm.value);
      this._productoService.actualizarProducto({
        _id: this.id,
        descripcion: productoForm.value.descripcion,
        valor_producto: productoForm.value.valor_producto,
        categoria: productoForm.value.categoria,
        tipo_producto: productoForm.value.tipo_producto
      }).subscribe(
        respose => {
          this.success_msg = "Se actualizó el producto correctamente";
          //this._router.navigate(['productos']);
        },
        error => {

        }
      );
    }else{
      console.log("error en el formulario");
      this.error_msg = 'Complete correctamente el formulario'
    }
  }

  private obtenerCategorias() {
    this._productoService.getCategorias('').subscribe(
      response => {
        this.categorias = response;
      },
      error => {

      }
    );
  }

}
