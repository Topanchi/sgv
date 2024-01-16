import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  public getEventos(filtro: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'eventos/listar/' + filtro, {headers:headers});
  }

  public getEventoPorId(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'eventos/buscar/' + id, {headers:headers});
  }

  public guardarEvento(data: any): Observable<any>{
    return this._http.post(this.url + 'eventos/crear', data);
  }

  public eliminarEvento(id: any) {
    return this._http.delete(this.url + 'eventos/borrar/' + id);
  }


  public actualizarEvento(data: any) {
    return this._http.put(this.url + 'eventos/'+ data._id, data);
  }
}
