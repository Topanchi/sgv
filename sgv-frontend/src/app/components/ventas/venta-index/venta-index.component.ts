import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public p: number = 1;
  public identity: any;
  public ventas: any;
  public filtroText: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(private _ventaService: VentaService, 
              private _userService: UserService,
              private _productoService: ProductoService,
              private _router: Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity){
      this.obtenerVentas();
    }else{
      this._router.navigate(['']);
    }
  }

  public search(searchForm:any) {
    console.log(searchForm.value.filtro);
    this._ventaService.getVentas(searchForm.value.filtro).subscribe(
      response => {
        this.ventas = response;
      },
      error => {

      }
    );
  }

  public eliminarVenta(id:any) {
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
          'Venta eliminada!',
          'Se eliminó correctamente.',
          'success'
        )

        this._ventaService.eliminarVenta(id).subscribe(
          response => {
            this.obtenerVentas();
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

  private obtenerVentas() {
    this._ventaService.getVentas('').subscribe(
      response => {
        this.ventas = response;
        console.log("ventas: ", this.ventas); 
      },
      error => {

      }
    );
  }

}
