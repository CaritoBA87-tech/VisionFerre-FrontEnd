import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

@Injectable({ providedIn: 'root' })

export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

canActivate(): boolean {

  const isAuth = this.authService.isLoggedIn();  

  if (isAuth) {
    // Si ya está logueado, lo mandamos al inicio o artículos
    this.router.navigate(['/home']); 
    return false; // No permitimos entrar al login
  }
  return true; // Si no está logueado, puede entrar a ver el formulario de login
}

}