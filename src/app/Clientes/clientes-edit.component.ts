import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './clientes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.css']
})

export class ClientesEditComponent {

  id?: number;
  form: FormGroup;
  cliente: Cliente;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(), 
      direccion: new FormControl()
    }, null);

    this.loadData();
  }

  loadData() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) { //Si en la ruta viene especificado un id es EDIT MODE
      var url = this.baseUrl + "api/Clients/" + this.id;

      this.http.get<Cliente>(url).subscribe(result => {
        this.cliente = result;
        this.form.patchValue(this.cliente);
      }, error => console.error(error));
    }

  }

  onSubmit() {
    var cliente = (this.id) ? this.cliente : <Cliente>{};

    cliente.nombre = this.form.get("nombre").value;
    cliente.apellido = this.form.get("apellido").value;
    cliente.direccion = this.form.get("direccion").value;

    if (this.id) { // EDIT mode
      var url = this.baseUrl + "api/Clients/" + this.cliente.id;

      this.http.put<Cliente>(url, cliente).subscribe(result => {
        console.log("Cliente " + cliente.id + " ha sido actualizado");

        this.router.navigate(['/clientes']); 
      }, error => console.log(error));
    }

    else // ADD NEW mode
    {
      var url = this.baseUrl + "api/Clients/";

      this.http.post<Cliente>(url, cliente).subscribe(result => {
        console.log("Cliente " + cliente.id + "ha sido creado");

        this.router.navigate(['/clientes']); 
      }, error => console.log(error));
    }
  }

}
