import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartFerre } from '../Servicios/cartFerre.service';

@Injectable({
  providedIn: 'root'
})
export class CompraGuard implements CanActivate {

  constructor(private cartService: CartFerre, private router: Router) {}

  canActivate(): boolean {
    if (this.cartService.puedoAcceder()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}