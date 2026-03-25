import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from './tiendas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tiendas-edit',
  templateUrl: './tiendas-edit.component.html'
})

export class TiendasEditComponent {

  id?: number;
  form: FormGroup;
  tienda: Tienda;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      sucursal: new FormControl(''),
      direccion: new FormControl()
    }, null);

    this.loadData();
  }

  loadData() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) { //Si en la ruta viene especificado un id es EDIT MODE
      var url = this.baseUrl + "api/Stores/" + this.id;

      this.http.get<Tienda>(url).subscribe(result => {
        this.tienda = result;
        this.form.patchValue(this.tienda);
      }, error => console.error(error));
    }

  }

  onSubmit() {
    var tienda = (this.id) ? this.tienda : <Tienda>{};

    tienda.sucursal = this.form.get("sucursal").value;
    tienda.direccion = this.form.get("direccion").value;

    if (this.id) { // EDIT mode
      var url = this.baseUrl + "api/Stores/" + this.tienda.id;

      this.http.put<Tienda>(url, tienda).subscribe(result => {
        console.log("Tienda " + tienda.id + " ha sido actualizada");

        this.router.navigate(['/tiendas']);
      }, error => console.log(error));
    }

    else // ADD NEW mode
    {
      var url = this.baseUrl + "api/Stores/";

      this.http.post<Tienda>(url, tienda).subscribe(result => {
        console.log("Tienda " + tienda.id + "ha sido creada");

        this.router.navigate(['/tiendas']);
      }, error => console.log(error));
    }
  }

}
