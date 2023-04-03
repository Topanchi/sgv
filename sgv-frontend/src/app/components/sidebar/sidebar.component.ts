import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public token: any;
  public identity: any;
  public rol: any;

  constructor(
      private _userService: UserService,
      private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    switch (this.identity.roles[0]){
      case 'ROLE_ADMIN': 
        this.rol = 'Administrador';
        break;
      case 'ROLE_USER': 
        this.rol = 'Usuario';
        break;
      case 'ROLE_MODERATOR': 
        this.rol = 'Moderador';
        break;
    }

   }

  ngOnInit(): void {
  }

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.token = null;
    this.identity = null;

    this._router.navigate(['']);
  }

}
