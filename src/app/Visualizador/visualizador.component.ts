import { Component } from '@angular/core';
import { AuthService } from '../Servicios/auth.service'; 
import { Router } from '@angular/router';
import { VisionService } from '../Servicios/vision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})

export class VisualizadorComponent {
  public error: boolean = false;
  public mensaje: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  public respuesta: string = '';
  public coincidencias: number = 0;
  public preguntaFerreBot: string = '';
  public mensajeFerreBot: string = "";
  public opcionesDisponibles :string[] = [];
  public atributoPreguntado: string = '';
  public atributoSeguimiento:any;
  public listaProductosMostrados:any;
  public productos:any;

  constructor(public visionService: VisionService, private router: Router) {}

// Dentro de tu clase
@HostListener('window:click', ['$event'])
onWindowClick(event: Event) {
  // Si el modal ya no tiene la clase 'show', significa que se cerró
  const modal = document.getElementById('visualizadorModal');
  if (modal && !modal.classList.contains('show')) {
    //this.limpiarPanel();
  }
}



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Generar previsualización local
      const reader = new FileReader();
      //reader.onload = () => this.previewUrl = reader.result;
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  efectoTecleo(texto: string) {
    this.mensajeFerreBot = ""; 

    let i = 0;
    const velocidad = 10; // Milisegundos entre letras (ajusta a tu gusto)

    const timer = setInterval(() => {
      if (i < texto.length) {
        this.mensajeFerreBot += texto.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, velocidad);
}

  analizarImagen() {
    const errorDiv = document.getElementById("sinCoincidencia");
    errorDiv.style.display = "none";

    this.coincidencias = 0;

    if (this.selectedFile) {
      this.visionService.evaluarImagen(this.selectedFile).subscribe({
        next: (res) => {

        /*this.respuesta = res[0].clave.replaceAll('-', ' ');
        this.coincidencias = res.length; */

        this.respuesta = res.productos[0].clave.replaceAll('-', ' ');
        this.coincidencias = res.productos.length; 
        this.atributoPreguntado = res.atributo;
        this.atributoSeguimiento = res.seguimiento;
        this.productos = res.productos;

        if(res.pregunta){
          this.preguntaFerreBot = res.pregunta;
          this.opcionesDisponibles = res.opciones;

          //this.efectoTecleo(res.pregunta ? res.pregunta : '');
        }

        console.log(res.productos);
        this.visionService.actualizarProductos(res.productos);
        this.router.navigate(['/articulos']);

        },
        error: (err: HttpErrorResponse) => {
            
            errorDiv.style.display = "block";

        if (err.status === 400) {
          console.error('Bad Request: ', err.error);
        }  else {
          console.error(`Código de error ${err.status}`, err.message);
        }
      }
      });
    }
  }

  seleccionarOpcion(valor: string) {

// Verificamos que el arreglo exista antes de buscar
  const item = this.atributoSeguimiento.find(a => 
    a.atributo.toLowerCase() === this.atributoPreguntado.toLowerCase()
  );

  if (item) {
    item.pendiente = false;
    item.valor = valor;
    console.log("Atributo actualizado con éxito:", item);
  } else {
    console.warn("No se encontró el atributo:", this.atributoPreguntado);
  }

  //Filtrar los productos mostrados
  this.listaProductosMostrados = this.productos.filter(producto => {
    // Buscamos si el producto tiene el atributo preguntado (ej: 'Calibre')
    const atributoProducto = producto.atributos.find(at => 
      at.atributo.toLowerCase() === this.atributoPreguntado.toLowerCase()
    );
    // Solo dejamos el producto si tiene ese atributo y el valor coincide con el seleccionado
    return atributoProducto && atributoProducto.valor === valor;
  });

  console.log(this.listaProductosMostrados);

  this.visionService.actualizarProductos(this.listaProductosMostrados);

    const payload = {
      claveProducto: this.respuesta, // "Tornillo-Metal-Cruz"
      seguimiento: this.atributoSeguimiento
    };

    console.log(payload);

    this.visionService.procesarSiguientePaso(payload).subscribe({
      next: (res) => {
        this.preguntaFerreBot = res.pregunta;      // Nueva pregunta (ej: sobre el Largo)
        this.opcionesDisponibles = res.opciones; // Nuevas opciones (ej: 1", 2")
        this.atributoPreguntado = res.atributo;  // "largo"
        
        // El atributoSeguimiento ya se mantiene actualizado localmente
      },
      error: (err) => console.error("Error al procesar paso:", err)
    });

}

  limpiarPanel() {

    /*const btnCerrar = document.querySelector('#visualizadorModal [data-dismiss="modal"]') as HTMLElement;
  if (btnCerrar) {
    btnCerrar.click();
  }*/

  // 1. Borrar la imagen cargada
  this.selectedFile = null;
  this.previewUrl = null; // La variable que usas en el [src] de la imagen

  // 2. Limpiar resultados de Rekognition y contadores
  this.respuesta = '';
  this.coincidencias = 0;

  // 3. Ocultar elementos manuales del DOM si los usaste
  const sinCoincidencia = document.getElementById("sinCoincidencia");
  sinCoincidencia.style.display = "none";

  // 4. Resetear el input de archivos (opcional pero recomendado)
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
    fileInput.value = '';
}
}

}