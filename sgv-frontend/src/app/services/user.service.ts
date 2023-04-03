import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = environment.url;
  public user;
  public token: any;
  public identity: any;

  constructor(
    private _http: HttpClient
  ) {
    this.user = new User('','','','','','');
  }

  public login(user: any, getToken = null): Observable<any> {
    let json = user;

    if(getToken != null) {
      user.gettoken = true;
    }

    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.post(this.url + 'auth/signin', json, {headers:headers});
  }

  public getToken(): Observable<any> {
    let token = localStorage.getItem('token');

    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  public getIdentity(): Observable<any> {
    let identity = JSON.parse(localStorage.getItem('identity') as string);
    
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  public getUsuarios(filtro: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'usuarios/listar/' + filtro, {headers:headers});
  }
}
