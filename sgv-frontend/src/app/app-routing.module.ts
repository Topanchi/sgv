import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dasboard', component: DasboardComponent },
  { path: 'productos', component: ProductoIndexComponent },
  { path: 'producto/registrar', component: ProductoCreateComponent },
  { path: 'producto/editar/:id', component: ProductoEditComponent },
  { path: 'usuarios', component: UserIndexComponent },
  { path: 'ventas', component: VentaIndexComponent },
  { path: 'venta/registrar', component: VentaCreateComponent },
  { path: 'venta/:id', component: VentaDetalleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
