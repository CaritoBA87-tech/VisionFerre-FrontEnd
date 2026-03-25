import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ClientesComponent } from './Clientes/clientes.component';
import { ClientesEditComponent } from './Clientes/clientes-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TiendasComponent } from './Tiendas/tiendas.component';
import { TiendasEditComponent } from './Tiendas/tiendas-edit.component';
import { ArticulosComponent } from './Articulos/articulos.component';
import { ArticulosEditComponent } from './Articulos/articulos-edit.component';
import { ModalComponent } from './Modal/modal.component';
import { Cart } from "./Servicios/cart.service";
import { CarritoResumenComponent } from './CarritoResumen/carritoResumen.component';
import { CarritoDetalleComponent } from './CarritoDetalle/carritoDetalle.component';
import { VisualizadorComponent } from './Visualizador/visualizador.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './Login/login.component';
import { CartFerre } from './Servicios/cartFerre.service';
import { LoginGuard } from './guards/login.guard';
import { ComprasComponent } from './Compras/compras.component'; 
import { CompraGuard } from './guards/compra.guard';
import { detalleProductoComponent } from './detalleProducto/detalleProducto.component'; 
import { RegistroComponent } from './Registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ClientesComponent,
    ClientesEditComponent,
    TiendasComponent,
    TiendasEditComponent,
    ArticulosComponent,
    ArticulosEditComponent,
    ModalComponent,
    CarritoResumenComponent,
    CarritoDetalleComponent,
    LoginComponent,
    VisualizadorComponent,
    ComprasComponent,
    detalleProductoComponent,
    RegistroComponent
  ],
imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'compras', component: ComprasComponent , canActivate: [CompraGuard]},
      { path: 'producto/:idProducto', component: detalleProductoComponent },
      { path: 'registro', component: RegistroComponent }
    ])
  ],
providers: [
  Cart,
  CartFerre,
  AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true 
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
