import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})

export class AuthService {

  // Usamos la URL del environment
  private myAppUrl = environment.apiUrl;

  //private myAppUrl = 'https://localhost:44314'; 
  private myApiUrl = '/api/Auth/';

  //private loggedIn = false;
  public usuarioNombre : string;

  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  // Método para el Login
  login(loginDto: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'login', loginDto).pipe(
      tap((res: any) => { 
            //this.loggedIn = true;
            this.loggedIn.next(true);
            this.usuarioNombre = res.nombre; 
            console.log('Usuario autenticado:', this.usuarioNombre);
          })
    );
  }

  // Método para el Logout
  logout(): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        //this.loggedIn = false;
        this.loggedIn.next(false);
        this.usuarioNombre = "";
        // Opcional: limpiar datos de usuario o redirigir
      })
    );
  }

  // Método para que el Guard sepa si puede dejar pasar al usuario
   isLoggedIn(): boolean {
    //return this.loggedIn;
    return this.loggedIn.value;
  }

  //Si el usuario refresca el navegador se llama a este método para verificar si ya estaba autenticado, ya que al pulsar F5 la memoria de Angular se borra
  /*checkSession(): Observable<any> {
    return this.http.get(`${this.myAppUrl}/api/Auth/check-session`, { withCredentials: true });
  }*/

    checkSession(): Observable<any> {
      return this.http.get(`${this.myAppUrl}/api/Auth/check-session`, { withCredentials: true }).pipe(
        tap((res: any) => {
            //this.loggedIn = true;
            this.loggedIn.next(true);
            this.usuarioNombre = res.nombreCompleto;
        })
      );
    }


  public setLoggedIn(value: boolean) {
    //this.loggedIn = value;
    this.loggedIn.next(value);
  }
}