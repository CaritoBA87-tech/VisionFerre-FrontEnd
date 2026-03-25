import { Component } from '@angular/core';
import { AuthService } from './Servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
     //Si el usuario refresca el navegador se llama a este método para verificar si ya estaba autenticado, ya que al pulsar F5 la memoria de Angular se borra
    this.authService.checkSession().subscribe(
      res => {
        // El servidor confirmó que la cookie es válida
        console.log("Sesión activa recuperada");
      },
      err => {
        // Si el servidor da 401, el usuario debe loguearse
        console.log("No hay sesión activa");
        //this.router.navigate(['/login']);
      }
    );
  }

}
