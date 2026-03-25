import { Component } from '@angular/core';
import { AuthService } from '../Servicios/auth.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CartFerre } from '../Servicios/cartFerre.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  public error: boolean = false;
  public mensaje: string = '';
  returnUrl: string = '/';
  rutaActual: string = '/';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private cart: CartFerre) {}

  ngOnInit() {
  // Capturamos la URL de retorno de los parámetros de la ruta
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.rutaActual = this.route.snapshot.queryParams['rutaActual'] || '/';
}

  onLogin(usuario, password) {
    this.error = false;
    const credenciales = { Usuario: usuario, Contrasena: password };

    this.authService.login(credenciales).subscribe({
      next: (response) => {
        // Si entra aquí, el resultado fue OK (200)
        console.log('Login exitoso:', response);

        if(this.returnUrl == "/compras"){
          this.cart.setPermitirAcceso(true);

          const modalElement = document.getElementById('carritoModal');
  
          if (modalElement) {
            const myModal = new bootstrap.Modal(modalElement);
            myModal.show();
          }

          //this.cart.clear();
        }

        //this.router.navigateByUrl(this.returnUrl);
        //this.router.navigate(['/']);

        this.router.navigateByUrl(this.rutaActual);
      },
      error: (err) => {
        this.error = true;
        // Si entra aquí, el resultado fue un error (401, 400, 500)
        if (err.status === 401) {
          this.mensaje = 'Usuario o contraseña incorrectos';
        } else {
          this.mensaje = 'Ocurrió un error inesperado';
        }
      }
});

  }
}