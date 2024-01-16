import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  public search(searchForm:any) {
    console.log(searchForm.value.filtro);
    /* this._ventaService.getVentas(searchForm.value.filtro).subscribe(
      response => {
        this.ventas = response;
      },
      error => {

      }
    ); */
  }

}
