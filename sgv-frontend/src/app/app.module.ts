import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import "@angular/compiler";
import { NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core/';
import { MatInputModule } from '@angular/material/input';
//import { ChartsModule } from 'ng2-charts';

/* import {  MatDatepickerToggle } from '@angular/material/datepicker/datepicker-toggle'; */

/* import { MatMomentDateModule } from '@angular/material-moment-adapter'; */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VentaEditComponent } from './components/ventas/venta-edit/venta-edit.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DesgloseComponent } from './components/desglose/desglose.component';
import { EventoIndexComponent } from './components/eventos/evento-index/evento-index.component';
import { EventoCreateComponent } from './components/eventos/evento-create/evento-create.component';
import { EventoEditComponent } from './components/eventos/evento-edit/evento-edit.component';
import { EventoDetalleComponent } from './components/eventos/evento-detalle/evento-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DasboardComponent,
    ProductoIndexComponent,
    SidebarComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    UserIndexComponent,
    VentaIndexComponent,
    VentaCreateComponent,
    VentaDetalleComponent,
    VentaEditComponent,
    TopbarComponent,
    DesgloseComponent,
    EventoIndexComponent,
    EventoCreateComponent,
    EventoEditComponent,
    EventoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbTooltipModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    /*MatDatepickerToggle */
    //ChartsModule
    
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
