import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public categorias: Categoria[] = [
  { nombre: 'Eslabones', imagen: '../../assets/img/producto/eslabones.png' },
   { nombre: 'Ganchos', imagen: '../../assets/img/producto/ganchos.jpg' },
    { nombre: 'Anclajes', imagen: '../../assets/img/producto/anclajes.jpg' },
     { nombre: 'Tuercas', imagen: '../../assets/img/producto/tuercas.png' },
      { nombre: 'Tornillos', imagen: '../../assets/img/producto/tornillos.jpg' },
       { nombre: 'Autoperforantes', imagen: '../../assets/img/producto/autoperforantes.png' },
        { nombre: 'Rondanas', imagen: '../../assets/img/producto/rondanas.png' },
         { nombre: 'Cinceles', imagen: '../../assets/img/producto/cinceles.png' },
          { nombre: 'Cuñas', imagen: '../../assets/img/producto/cuñas.png' },
           { nombre: 'Poleas', imagen: '../../assets/img/producto/poleas.jpg' },
            { nombre: 'Chavetas', imagen: '../../assets/img/producto/chavetas.png' },
             { nombre: 'Guardacabos', imagen: '../../assets/img/producto/guardacabos2.png' }
  ];
}

interface Categoria {
  nombre: string;
  imagen: string;
}
