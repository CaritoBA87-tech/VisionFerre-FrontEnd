import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Producto } from '../Articulos/articulos';
import { CartFerre } from '../Servicios/cartFerre.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalleProducto.component.html',
  styleUrls: ['./detalleProducto.component.css']
})

export class detalleProductoComponent {

    private myAppUrl = environment.apiUrl;
    public producto : Producto;
    public imagenPrincipal : string;
    cantidad: number = 1;
    
    constructor(private route: ActivatedRoute, private http: HttpClient, private cartFerre: CartFerre ) {}

    ngOnInit() {
    const idProducto = this.route.snapshot.paramMap.get('idProducto');
    this.obtenerProductosPorID(Number(idProducto));
    }

  obtenerProductosPorID(id: number){

    this.http.get<any>(`${this.myAppUrl}/api/Productos/uno/${id}`)
        .subscribe(
          result => {
            debugger;
                this.producto = result;

                if (this.producto.imagenes && this.producto.imagenes.length > 0) 
                    this.imagenPrincipal = this.producto.imagenes[0];


                //Comentar esto para obtener los datos desde S3
                //this.imagenPrincipal = "../../assets/img/producto/703764-a3.jpg";
                //this.producto.imagenes = ["../../assets/img/producto/703764-a3.jpg", "../../assets/img/producto/703764-d.jpg", "../../assets/img/producto/703764-za1.jpg"]
            }, 
          error => {
            console.error('Error:', error);
          }
        );
  }

  cambiarCantidad(valor: number) {
    if (this.cantidad + valor >= 1) {
      this.cantidad += valor;
    }
  }

  addProductToCartFerre(producto: Producto, cantidad: number) {
    this.cartFerre.addLine(producto, cantidad);
  }

}