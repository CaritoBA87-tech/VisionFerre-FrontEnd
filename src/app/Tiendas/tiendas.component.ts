import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from './tiendas';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})

export class TiendasComponent {
  public tiendas: Tienda[];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get<Tienda[]>(this.baseUrl + 'api/Stores')
      .subscribe(result => {
        this.tiendas = result;
      }, error => console.error(error));
  }

  deleteStore(id) {
    this.http.delete<Tienda[]>(this.baseUrl + 'api/Stores/' + id)
      .subscribe(result => {
        this.tiendas = this.tiendas.filter((c) => c.id !== id);
      }, error => console.error(error));
  }

}


