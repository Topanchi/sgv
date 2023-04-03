import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token: any;
  public identity: any;
  public data_error!: String;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.user = new User('','','','','','');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._router.navigate(['ventas']);
    }
  }

  public close_alert() {
    this.data_error = '';
  }

  public login(loginForm:any){
    if(loginForm.valid){
      console.log(loginForm.value);

      this._userService.login(this.user).subscribe(
        response => {
          console.log(response);
          this.token = response.accessToken;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user, this.token).subscribe(
            resp => {
              console.log(resp);
              this.user._id = resp.id;
              this.user.nombre = resp.nombre;
              this.user.apellidos = resp.apellidos;
              localStorage.setItem('identity', JSON.stringify(resp));
              this._router.navigate(['dasboard']);
            },
            error => {

            }
          );
        },
        error => {
          console.log(this.data_error = error.error.message);
        }
      );
    } else {

    }

  }


}
