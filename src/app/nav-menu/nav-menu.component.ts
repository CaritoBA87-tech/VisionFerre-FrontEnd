import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Menu } from './menu';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  private myAppUrl = environment.apiUrl;
  categoriasAgrupadas: any[] = [];
  icons : string[] = ["nut-fill", "magnet", "wrench-adjustable", "screwdriver"];
  menu : Menu[];

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService) {
  }

    ngOnInit() {

      this.http.get<any>(`${this.myAppUrl}/api/Productos/ObtenerMenu`)
        .subscribe(
          result => {

            this.menu = result;

            // 1. Creamos un objeto para agrupar
          const grouped = result.reduce((acc: any, curr) => {
            // Si la categoría no existe en nuestro acumulador, la creamos
            if (!acc[curr.categoria]) {
              acc[curr.categoria] = new Set(); // Usamos Set para subcategorías únicas
            }
            // Añadimos la subcategoría al Set (esto elimina duplicados de subcategoría)
            acc[curr.categoria].add(curr.subcategoria);
            return acc;
          }, {});

          // 2. Lo convertimos en un arreglo manejable para el HTML
          this.categoriasAgrupadas = Object.keys(grouped)
            .sort((a, b) => a.localeCompare(b)) // Orden alfabético de categorías (Nivel 1)
            .map(catName => ({
              nombre: catName,
              subcategorias: Array.from(grouped[catName])
                .sort((a: any, b: any) => a.localeCompare(b)) // Orden alfabético de subcategorías (Nivel 2)
            }));

            }, 
            error => {

            }
          );
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  obtenerProductosPorCategoria(categoria, subcategoria) {
    const resultados = this.menu.filter(item => 
      item.categoria === categoria && 
      item.subcategoria === subcategoria
    );

    const idsCategorias = resultados.map(item => item.id);
    
    this.router.navigate(['/articulos'], { 
      queryParams: { ids: idsCategorias.join(',') }
    });
  }

  cerrarSesion() {
  this.authService.logout().subscribe({
    next: (response) => {
      this.router.navigateByUrl('/');
      console.log("Respuesta de la API:", response);     
      // Una vez que la API responde Ok, rediriges
    },
    error: (err) => {
      console.error("La API no respondió, pero cerramos sesión local", err);
    }
  });
}

  manejarNavegacion() {
    const rutaActual = this.router.url;

    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: '/', rutaActual: rutaActual} 
    });
  }

}
