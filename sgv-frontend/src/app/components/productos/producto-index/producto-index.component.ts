import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public p: number = 1;
  public identity: any;
  public categoria: any;
  public productos: any;
  public categorias: any;
  public filtroText: any;
  public titulo_cat: any;
  public descripcion_cat: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(
    private _productoService: ProductoService,
    private _userService: UserService,
    private _router: Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this.obtenerProductos();
      this.obtenerCategorias();
    }else{
      this._router.navigate(['']);
    }
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

  private obtenerCategorias() {
    this._productoService.getCategorias('').subscribe(
      response => {
        this.categorias = response;
        console.log("categorias: ", this.categorias);
      },
      error => {

      }
    );
  }

  public search(searchForm:any) {
    console.log(searchForm.value.filtro);
    this._productoService.getProductos(searchForm.value.filtro).subscribe(
      response => {
        this.productos = response;
      },
      error => {

      }
    );
  }

  public onSubmitCat(categoriaForm: any) {
    if(categoriaForm.valid){
      console.log(categoriaForm.value);
      this._productoService.guardarCategoria({
        titulo: categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat
      }).subscribe(
        response => {
          this.success_msg = "Se registró la categoria correctamente";
          this.obtenerCategorias();
          $('#modal-save-categoria').modal('hide');
        },
        error => {

        }
      );
    }else{
      console.log("error en el formulario");
      this.error_msg = 'Complete correctamente el formulario'
    }

  }

  public eliminarProducto(id:any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "No se puede volver atrás luego de esta operación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Producto eliminado!',
          'Se eliminó correctamente.',
          'success'
        )

        this._productoService.eliminarProducto(id).subscribe(
          response => {
            this._productoService.getProductos('').subscribe(
              response => {
                this.productos = response;
              },
              error => {
    
              }
            );
          },
          error => {

          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se canceló la solicitud',
          'error'
        )
      }
    })

  }

}
