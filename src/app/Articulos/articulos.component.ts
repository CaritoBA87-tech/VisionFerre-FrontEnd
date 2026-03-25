import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Articulo, Producto } from './articulos';
import { ModalComponent } from '../Modal/modal.component';
import { Tienda } from '../Tiendas/tiendas';
import { Cart } from '../Servicios/cart.service';
import { Router } from "@angular/router";
import { ArticuloTienda } from './articuloTienda';
import {environment} from '../../environments/environment';
import { AuthService } from '../Servicios/auth.service';
import { VisionService } from '../Servicios/vision.service';
import { ActivatedRoute } from '@angular/router';
import { CartFerre } from '../Servicios/cartFerre.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent {
  public articulos: Articulo[];
  public tiendas: ArticuloTienda[];
  private _authservice: AuthService;
  resultado: any;
  public imagen: string;
  listProductos: Producto[];
  private subscription: Subscription = new Subscription()
  public ruta : string;
  public rutaValue : string;
  filtrosSeleccionados: string[] = [];
  marcasSeleccionadas: string[] = [];

  @ViewChild(ModalComponent, { static: true }) childComponent!: ModalComponent;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    /*private cart: Cart,*/
    private router: Router, private authservice: AuthService,
    private visionService:VisionService,
    private route: ActivatedRoute,
    private cartFerre: CartFerre  ) {
      this._authservice = authservice;
  }

  // Usamos la URL del environment
  private myAppUrl = environment.apiUrl;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
        /*const loginData = {
        Username: 'polo', 
        Password: 'lomito',
        NombreCompleto: 'polo bolayna',
        IdRol: 1
      };*/

      // Nos suscribimos al observable del servicio
    this.subscription = this.visionService.productosActuales.subscribe(productos => {
      if (productos && productos.length > 0) {
        this.listProductos = productos;
        this.ruta = 'Resultado del visualizador: <strong> ' + productos[0].clave.replaceAll('-', ' ') + '</strong>';
      }
    });

      this.route.queryParams.subscribe(params => {
        if (params['ids']) {
          // Convertimos el string "1,2,3" de nuevo a un arreglo de números [1, 2, 3]
          const idsArray = params['ids'].split(',').map(Number);       
          this.obtenerProductosPorCategoria(idsArray);   
    }
  });

    /*var title = document.getElementById('title');
    title.innerHTML = "Existencia en tiendas";
    title.style.cssText = 'font-size:18px;';*/
  }

onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Generar previsualización local
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  subirYAnalizar() {
    if (this.selectedFile) {
      this.visionService.evaluarImagen(this.selectedFile).subscribe({
        next: (res) => {
          console.log('Datos guardados en SQL y S3', res);
        },
        error: (err) => console.error('Error en el flujo de AWS', err)
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sumarStock() {

    for (var i = 0; i < this.articulos.length; i++) {
      var hfg = this.articulos[i].articulosTienda;
      var stockTotal = (this.articulos[i].articulosTienda).reduce((accumulator, currentProduct) => {
        return accumulator + (currentProduct.stock);
      }, 0);

      this.articulos[i].stock = stockTotal;
    }
  }

  deleteArticle(id) {

    this.http.delete<Articulo[]>(this.baseUrl + 'api/Articles/' + id)
      .subscribe(result => {
        this.articulos = this.articulos.filter((c) => c.id !== id);
      }, error => console.error(error));
  }

  showStores(id) {
    this.http.get<ArticuloTienda[]>(this.baseUrl + "api/Articles/GetStoresByArticleId/" + id)
      .subscribe(result => {
        this.tiendas = result;

        this.configModal();

      }, error => console.error(error));
  }

  configModal() {

    var container = document.getElementsByClassName('modal-body')[0];
    container.innerHTML = "";

    // Create the table element
    const table = document.createElement('table');
    table.style.cssText = ' width:250px;';
    //table.setAttribute('border-bottom', '1'); // Add a border for visibility

    // Create the table header (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Define header data
    const headers = ['Sucursal', 'Stock'];

    // Create and append table header cells (th)
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.style.cssText = ' background-color:gainsboro; border-bottom:1px solid gray; height:35px;';
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body (tbody)
    const tbody = document.createElement('tbody');

    const selectedValues = [];

    this.tiendas.forEach(obj => {
        selectedValues.push({ tienda: obj['tienda'], stock: obj['stock']});
    });

    var suma = 0;

    selectedValues.forEach(rowData => {
      const row = document.createElement('tr');

      Object.entries(rowData).forEach(([key, value]) => {
        console.log(`Property Name: ${key}, Value: ${value}`);

        const td = document.createElement('td');
        td.style.cssText = 'height:35px;';
        td.textContent = String(value);

        if (key == "stock")
          suma = suma + Number(value);

        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    const rowTotal = document.createElement('tr');
    const tdTotal = document.createElement('td');
    tdTotal.textContent = "Total";
    rowTotal.appendChild(tdTotal);

    const tdTotal2 = document.createElement('td');
    rowTotal.style.cssText = ' background-color:gainsboro; height:35px; font-weight:bold;';
    tdTotal2.textContent = String(suma);
    rowTotal.appendChild(tdTotal2);
    tbody.appendChild(rowTotal);

    table.appendChild(tbody);

    // Append the complete table to the container
    container.appendChild(table);

    this.showModal();

  }

  showModal() {
    this.childComponent.showModal();
  }

  /*addProductToCart(article: Articulo) {
    this.cart.addLine(article);
    this.router.navigateByUrl("/carrito");
  }*/

  addProductToCartFerre(producto: Producto) {
    this.cartFerre.addLine(producto);
    //this.router.navigateByUrl("/carrito");
  }

/*get obtenerTipos(): string[] {
  if (!this.listProductos) {
    return []; // Retorna un arreglo vacío mientras cargan los datos
  }
  const todosLosTipos = this.listProductos.map(p => {
    return p.categoria ? p.categoria.split('/').pop().trim() : '';
  });

  return [...new Set(todosLosTipos)].filter(t => t !== '');
}*/

get obtenerTipos(): string[] {
  if (!this.listProductos) return [];

  // Filtramos los productos por la marca seleccionada antes de extraer los tipos
  const productosFiltradosPorMarca = this.listProductos.filter(p => 
    this.marcasSeleccionadas.length === 0 || this.marcasSeleccionadas.includes(p.marca.trim())
  );

  const tipos = productosFiltradosPorMarca.map(p => p.categoria.split('/').pop().trim() || '');
  return [...new Set(tipos)].filter(t => t !== '').sort();
}

toggleMarca(marca: string) {
  const index = this.marcasSeleccionadas.indexOf(marca);
  if (index === -1) {
    this.marcasSeleccionadas.push(marca);
  } else {
    this.marcasSeleccionadas.splice(index, 1);
  }
}

/*get obtenerMarcas(): string[] {
  if (!this.listProductos) return [];
  
  const marcas = this.listProductos
    .map(p => p.marca)
    .filter(m => m); 

  return [...new Set(marcas)].sort();
}*/

get obtenerMarcas(): string[] {
  if (!this.listProductos) return [];

  // Filtramos los productos por el tipo seleccionado antes de extraer las marcas
  const productosFiltradosPorTipo = this.listProductos.filter(p => {
    const tipoProducto = p.categoria.split('/').pop().trim();
    return this.filtrosSeleccionados.length === 0 || this.filtrosSeleccionados.includes(tipoProducto);
  });

  const marcas = productosFiltradosPorTipo.map(p => p.marca.trim()).filter(m => m);
  return [...new Set(marcas)].sort();
}

  obtenerProductosPorCategoria(ids: string){

    const params = new HttpParams().set('idsCategorias', ids);

    this.http.get<any>(`${this.myAppUrl}/api/Productos/ObtenerProductos`, { params })
        .subscribe(
          result => {
            this.listProductos = result;

            this.filtrosSeleccionados =[];
            this.marcasSeleccionadas =[];

            if( this.listProductos.length > 0){
              const partes = this.listProductos[0].categoria.split(' / ');
              this.rutaValue = partes.slice(0, 2).join(' / ');
              this.ruta = "<strong>" + this.rutaValue + "</strong>";
            }
            }, 
          error => {
            console.error('Error:', error);
          }
        );
  }

  toggleFiltro(tipo: string) {
    const index = this.filtrosSeleccionados.indexOf(tipo);
    if (index === -1) {
      this.filtrosSeleccionados.push(tipo);
    } else {
      this.filtrosSeleccionados.splice(index, 1);
    }
  }

  get ganchosAMostrar() {
    if (!this.listProductos) return [];

    return this.listProductos.filter(p => {
    // Lógica para Tipo (Categoría final)
    const tipoProducto = p.categoria.split('/').pop().trim();
    const coincideTipo = this.filtrosSeleccionados.length === 0 || 
                         this.filtrosSeleccionados.includes(tipoProducto);

    // Lógica para Marca
    const coincideMarca = this.marcasSeleccionadas.length === 0 || 
                          this.marcasSeleccionadas.includes(p.marca);

    // El producto solo se muestra si cumple AMBAS condiciones
    return coincideTipo && coincideMarca;

    /*if (this.filtrosSeleccionados.length === 0) {
      return this.listProductos.filter(p => p.categoria.split(' / ').slice(0, 2).join(' / ') === this.rutaValue);
    }

    return this.listProductos.filter(p => 
      this.filtrosSeleccionados.includes(p.categoria.split('/').pop().trim())
    );*/
    });
  }

  limpiarFiltros() {
    this.filtrosSeleccionados = [];
    this.marcasSeleccionadas = [];
    
    // Opcional: Si usas checkboxes nativos de HTML, esto los desmarca visualmente
    const checkboxes = document.querySelectorAll('.custom-control-input') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(cb => cb.checked = false);
  }




minLimit = 0;
maxLimit = 5000; // Ajusta según tu precio máximo real
minValue = 0;
maxValue = 5000;

validarRango(min, max) {
  if (min > max) {
    // Intercambio simple para que no se crucen
    const temp = min;
    max = max;
    max = temp;
  }
}

obtenerPorcentaje(valor: number): number {
  return ((valor - this.minLimit) / (this.maxLimit - this.minLimit)) * 100;
}



}






