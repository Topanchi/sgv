import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-index',
  templateUrl: './evento-index.component.html',
  styleUrls: ['./evento-index.component.css']
})
export class EventoIndexComponent implements OnInit {
  public p: number = 1;
  public identity: any;
  public eventos: any;
  public filtroText: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(private _eventoService: EventoService, 
              private _userService: UserService,
              private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this.obtenerEventos();
    }else{
      this._router.navigate(['']);
    }
  }

  public search(searchForm:any) {
    console.log(searchForm.value.filtro);
    this._eventoService.getEventos(searchForm.value.filtro).subscribe(
      response => {
        this.eventos = response;
      },
      error => {

      }
    );
  }

  private obtenerEventos() {
    this._eventoService.getEventos('').subscribe(
      response => {
        this.eventos = response;
        console.log("eventos: ", this.eventos); 
      },
      error => {

      }
    );
  }

}
