import { Injectable } from "@angular/core";
import { Producto } from "../Articulos/articulos";

@Injectable()
export class CartFerre {
  public lines: CartLineFerre[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;
  private compraIniciada = false;

  constructor() {
    this.lines = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    if (this.lines.length > 0)
      this.recalculate();
  }

  addLine(producto: Producto, quantity: number = 1) {
    let line = this.lines.find(line => line.producto.idProducto == producto.idProducto);
    if (line != undefined) {
      line.quantity += quantity;
      line.subtotal = producto.precio * line.quantity;
    } else {
      this.lines.push(new CartLineFerre(producto, quantity, producto.precio * quantity));
      //this.lines.push(new CartLine(article, quantity));
      localStorage.setItem("cart", JSON.stringify(this.lines));
    }
    this.recalculate();
  }

  updateQuantity(producto: Producto, quantity: number) {
    let line = this.lines.find(line => line.producto.idProducto == producto.idProducto);
    if (line != undefined) {
      line.quantity = Number(quantity);
      line.subtotal = line.producto.precio * line.quantity;
      localStorage.setItem("cart", JSON.stringify(this.lines));
    }
    this.recalculate();
  }

  removeLine(id: number) {
    let index = this.lines.findIndex(line => line.producto.idProducto == id);
    this.lines.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.lines));
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity * l.producto.precio);
    })
  }

  setPermitirAcceso(valor: boolean) {
    this.compraIniciada = valor;
  }

  puedoAcceder(): boolean {
    return this.compraIniciada;
  }
}

export class CartLineFerre {
  /*constructor(public article: Articulo,
    public quantity: number) { }*/

  constructor(public producto: Producto,
    public quantity: number, public subtotal: number) { }

  /*get lineTotal() {
    return this.quantity * this.article.precio;
  }*/
}
