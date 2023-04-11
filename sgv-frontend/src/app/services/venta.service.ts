import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  public getVentas(filtro: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'ventas/listar/' + filtro, {headers:headers});
  }

  public getVentaPorId(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'ventas/buscar/' + id, {headers:headers});
  }

  public guardarVenta(data: any): Observable<any>{
    console.log("service: ", data)
    return this._http.post(this.url + 'ventas/crear', data);
  }

  public eliminarVenta(id: any) {
    console.log("service: ", id);
    return this._http.delete(this.url + 'ventas/borrar/' + id);
  }


  public actualizarVenta(data: any) {
    console.log("service: ", data)
    return this._http.put(this.url + 'ventas/'+ data._id, data);
  }
}
