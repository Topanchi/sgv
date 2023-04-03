import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  public getProductos(filtro: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'productos/listar/' + filtro, {headers:headers});
  }

  public getProductoPorId(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'productos/' + id, {headers:headers});
  }

  public getCategorias(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content_Type', 'application/json');

    return this._http.get(this.url + 'categorias/listar/' + id, {headers:headers});
  }

  public guardarProducto(data: any) {
    console.log("service: ", data)
    return this._http.post(this.url + 'productos/crear', data);
  }

  public actualizarProducto(data: any) {
    console.log("service: ", data)
    return this._http.put(this.url + 'productos/'+ data._id, data);
  }

  public eliminarProducto(id: any) {
    console.log("service: ", id);
    return this._http.delete(this.url + 'productos/' + id);
  }

  public guardarCategoria(data: any) {
    console.log("service: ", data)
    return this._http.post(this.url + 'categorias/crear', data);
  }

  public actualizarCategoria(data: any) {
    console.log("service: ", data)
    return this._http.put(this.url + 'categorias/'+ data._id, data);
  }

  public eliminarCategoria(id: any) {
    console.log("service: ", id);
    return this._http.delete(this.url + 'categorias/' + id);
  }

}
