import { ArticuloTienda } from '../Articulos/articuloTienda';

export interface Tienda {
  id: number;
  sucursal: string;
  direccion: string;
  checked: boolean;
  stock: number;
  articulosTiendas: ArticuloTienda[];
}
