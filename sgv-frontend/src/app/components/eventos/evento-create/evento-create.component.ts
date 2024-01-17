import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { EventoService } from '../../../services/evento.service';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import { ConstantesCategorias } from '../../../utils/constantes-categorias';
import { DetalleVenta } from '../../../models/detalleventa';

import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';

declare const $: any; // avoid the error on $(this.eInput).datepicker();
datepickerFactory($);
datepickerJAFactory($);
@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EventoCreateComponent implements OnInit {

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

  public evento: any = {
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

  constructor(private _userService: UserService,
    private _productoService: ProductoService,
    private _eventoService: EventoService,
    private _router: Router
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
  }

  public onSubmitEvento(eventoForm:any){
    if(eventoForm.valid){
      console.log(eventoForm.value);
      
    }else{
      console.log("error en el formulario");
      this.error_msg_venta = 'Complete correctamente el formulario';
    }
  }

  public close_alert_error_venta() {
    this.error_msg_venta = '';
  }

}
