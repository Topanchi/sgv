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
    return this._http.post(this.url + 'ventas/crear', data);
  }

  public eliminarVenta(id: any) {
    return this._http.delete(this.url + 'ventas/borrar/' + id);
  }


  public actualizarVenta(data: any) {
    return this._http.put(this.url + 'ventas/'+ data._id, data);
  }

  public guardarVentaContador(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/guardar-venta-contador', data);
  }

  public guardarMontoVentaContador(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/guardar-monto-venta-contador', data);
  }

  public contadorProductoPorMeses(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/buscar-ventas', data);
  }

  public contadorProductoPorTresMeses(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/buscar-ventas-trimestre', data);
  }

  public contadorProductoPorSeisMeses(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/buscar-ventas-semestre', data);
  }

  public contadorProductoPorAnio(data: any): Observable<any>{
    return this._http.post(this.url + 'ventas/buscar-ventas-anio', data);
  }
}
