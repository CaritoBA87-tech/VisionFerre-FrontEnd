import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from './articulos';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tienda } from '../Tiendas/tiendas';
import { ArticuloTienda } from '../Articulos/articuloTienda';

@Component({
  selector: 'app-articulos-edit',
  templateUrl: './articulos-edit.component.html'
})

export class ArticulosEditComponent {

  id?: number;
  form: FormGroup;
  articulo: Articulo;
  public tiendas: Tienda[];
  tiendasIDs: number[] = [];
  public selected: Tienda[];
  conjunto: ArticuloTienda[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      codigo: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl('', Validators.pattern(/^\d+(\.\d+)?$/)),
      stock: new FormControl('', Validators.pattern('^[0-9]*$'))
    }, null);

    this.http.get<Tienda[]>(this.baseUrl + 'api/Stores')
      .subscribe(result => {
        this.tiendas = result;
      }, error => console.error(error));

    this.loadData();
  }


  loadData() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) { //Si en la ruta viene especificado un id es EDIT MODE
      var url = this.baseUrl + "api/Articles/" + this.id;

      this.http.get<Articulo>(url).subscribe(result => {
        this.articulo = result;
        this.form.patchValue(this.articulo);

        var url2 = this.baseUrl + "api/Articles/getTiendasArticulo/" + this.id;

        this.http.get<ArticuloTienda[]>(url2).subscribe(result => {

          if (this.tiendas) {
            result.forEach((value) => {
              let obj = this.tiendas.find(o => o.id == value.tiendaID);

              if (obj) {
                obj.checked = true;
                obj.stock = value.stock;
              }
            });
          }

        }, error => console.error(error));

      }, error => console.error(error));
    }

  }

  onSubmit() {
    var articulo = (this.id) ? this.articulo : <Articulo>{};

    articulo.codigo = this.form.get("codigo").value;
    articulo.descripcion = this.form.get("descripcion").value;
    articulo.precio = this.form.get("precio").value;
    //articulo.articulosTiendas = [];
    articulo.articulosTienda = [];

    this.tiendas.forEach((value) => {
      if (value.checked && value.stock > 0) {
        articulo.articulosTienda.push({ articuloID: articulo.id ? articulo.id : 0, tiendaId: value.id, stock: value.stock });
        //articulo.articulosTiendas.push({ articuloID: articulo.id ? articulo.id: 0, tiendaId: value.id, stock: value.stock  });
      }
    });

    if (this.id) { // EDIT mode

      if (articulo.articulosTienda.length == 0)
        articulo.articulosTienda.push({ articuloID: this.articulo.id, tiendaId: 0, stock: 0 });

      /*if (articulo.articulosTiendas.length == 0)
        articulo.articulosTiendas.push({ articuloID: this.articulo.id, tiendaId: 0, stock: 0 });*/

      const { articulosTienda, ...nuevoObjeto } = articulo;

      var url = this.baseUrl + "api/Articles/" + this.articulo.id;

      this.http.put<Articulo>(url, nuevoObjeto).subscribe(result => {
        console.log("Artículo " + articulo.id + " ha sido actualizado");

       var url2 = this.baseUrl + "api/Articles/updateTiendasArticulo/";

        //this.http.post<ArticuloTienda[]>(url2, articulo.articulosTiendas).subscribe(result => {
        this.http.post<ArticuloTienda[]>(url2, articulo.articulosTienda).subscribe(result => {

          this.router.navigate(['/articulos']);
        }, error => console.log(error));

      }, error => console.log(error));
    }

    else // ADD NEW mode
    {
      var url = this.baseUrl + "api/Articles/";

      this.http.post<Articulo>(url, articulo).subscribe(result => {
        console.log("Artículo " + articulo.id + "ha sido creado");

        this.router.navigate(['/articulos']);
      }, error => console.log(error));
    }
  }


  onCheckboxChange(option: Tienda): void {

    let obj = this.tiendas.find(o => o.id == option.id);

    if (obj) 
        obj.stock = option.checked ? option.stock: 0;

  }

  onInputChange(option: Tienda) {
    let obj = this.tiendas.find(o => o.id == option.id);

    if (obj) 
      obj.checked = option.stock > 0 ? true : false;
  }

}
