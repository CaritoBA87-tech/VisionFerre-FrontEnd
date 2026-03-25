import { Injectable } from "@angular/core";
import { Articulo } from "../Articulos/articulos";

@Injectable()
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  constructor() {
    this.lines = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    if (this.lines.length > 0)
      this.recalculate();
  }

  addLine(article: Articulo, quantity: number = 1) {
    let line = this.lines.find(line => line.article.id == article.id);
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(article, quantity, article.precio * quantity));
      //this.lines.push(new CartLine(article, quantity));
      localStorage.setItem("cart", JSON.stringify(this.lines));
    }
    this.recalculate();
  }

  updateQuantity(article: Articulo, quantity: number) {
    let line = this.lines.find(line => line.article.id == article.id);
    if (line != undefined) {
      line.quantity = Number(quantity);
      line.subtotal = line.article.precio * line.quantity;
      localStorage.setItem("cart", JSON.stringify(this.lines));
    }
    this.recalculate();
  }

  removeLine(id: number) {
    let index = this.lines.findIndex(line => line.article.id == id);
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
      this.cartPrice += (l.quantity * l.article.precio);
    })
  }
}

export class CartLine {
  /*constructor(public article: Articulo,
    public quantity: number) { }*/

  constructor(public article: Articulo,
    public quantity: number, public subtotal: number) { }

  /*get lineTotal() {
    return this.quantity * this.article.precio;
  }*/
}
