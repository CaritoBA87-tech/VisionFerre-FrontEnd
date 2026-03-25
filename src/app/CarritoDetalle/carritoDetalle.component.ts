import { Component } from "@angular/core";
import { Cart } from '../Servicios/cart.service';
import { CartFerre } from "../Servicios/cartFerre.service";
import { AuthService } from "../Servicios/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "carrito-detalle",
  templateUrl: "carritoDetalle.component.html",
  styleUrls: ['./carritoDetalle.component.css']
})

export class CarritoDetalleComponent {
  //constructor(public cart: Cart) { }
  constructor(public cart: CartFerre, public authService: AuthService, private router: Router) { }

  //public loggedIn = this.authService.isLoggedIn;

  manejarNavegacion() {
          const botonCerrar = document.querySelector('#carritoModal .close') as HTMLElement;
      if (botonCerrar) {
        botonCerrar.click();
      }

    if (this.authService.isLoggedIn()) {
      this.cart.setPermitirAcceso(true);
      this.cart.clear();
      localStorage.removeItem("cart");
      
      setTimeout(() => {
      this.router.navigate(['/compras']);
    }, 300);

    } else {
      const rutaActual = this.router.url;

      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/compras', rutaActual: rutaActual} 
    });
    }
  }
}




