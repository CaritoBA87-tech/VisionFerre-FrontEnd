import { Tienda } from "../Tiendas/tiendas";

export interface ArticuloTienda {
  articuloID: number;
  tiendaID: number;
  stock: number;
  tienda: Tienda;
}
