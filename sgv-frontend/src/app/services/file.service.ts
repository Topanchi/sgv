import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }


  public uploadFacturaEvento(selectedFile: File, nombreDoc: string, tipoDoc: string, tamanioDoc: number) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('nombre_doc', nombreDoc);
    formData.append('tipo_doc', tipoDoc);
    formData.append('tamanio_doc', tamanioDoc.toString());

    let data = {
      nombre_doc: nombreDoc,
      tipo_doc: tipoDoc,
      tamanio_doc: tamanioDoc.toString(),
      file: selectedFile
    }

    console.log('file', selectedFile);
/*     console.log('nombre_doc', nombreDoc);
    console.log('tipo_doc', tipoDoc);
    console.log('tamanio_doc', tamanioDoc.toString()); */
    console.log("Data final: ", data);
    
    return this._http.post<any>(this.url + 'eventos/cargar-factura', data);
  }


}
