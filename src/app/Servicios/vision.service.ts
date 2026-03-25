import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class VisionService {

  constructor(private http: HttpClient) {}

    private myAppUrl = environment.apiUrl;

    // 1. Creamos el Subject que guardará la lista de productos
    private productosSource = new BehaviorSubject<any[]>([]);

    // 2. Exponemos el Subject como un Observable para que otros se suscriban
    productosActuales = this.productosSource.asObservable();

    // 3. Método para actualizar la lista desde cualquier parte
    actualizarProductos(productos: any[]) {
      this.productosSource.next(productos);
    }

  evaluarImagen(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', archivo); 

    return this.http.post(`${this.myAppUrl}/api/Productos/BuscarPorFoto`, formData);
  }

    procesarSiguientePaso(request: any): Observable<any> {
      return this.http.post(`${this.myAppUrl}/api/Productos/procesar-paso`, request);
  }

}