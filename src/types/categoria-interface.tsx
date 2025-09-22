import type { Libro } from "./libro-interface";

export interface Categoria {
  nombre: string;
  libros: Libro[];
}
