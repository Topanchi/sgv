import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public p: number = 1;
  public usuarios: any;
  public filtroText: any;
  public success_msg: String | undefined;
  public error_msg: String | undefined;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    this._userService.getUsuarios('').subscribe(
      response => {
        this.usuarios = response;
        console.log("usuarios: ", this.usuarios);
      },
      error => {

      }
    );
  }

  public search(searchForm:any) {
    console.log(searchForm.value.filtro);
    this._userService.getUsuarios(searchForm.value.filtro).subscribe(
      response => {
        this.usuarios = response;
      },
      error => {

      }
    );
  }

}
