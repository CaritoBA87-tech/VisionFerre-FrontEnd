import { Component } from "@angular/core";
//import { Cart } from "../Servicios/cart.service";
import { CartFerre } from "../Servicios/cartFerre.service";

@Component({
  selector: "carrito-resumen",
  templateUrl: "carritoResumen.component.html",
  styleUrls: ["carritoResumen.component.css"]
})

export class CarritoResumenComponent {

  constructor(public cart: CartFerre) { }

}
