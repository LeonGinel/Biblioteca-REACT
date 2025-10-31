/**
 * Interfaz: Libro
 * ----------------
 * Define la estructura de un libro dentro de la aplicación.
 *
 * Propiedades:
 *  - titulo: el nombre del libro (string)
 *  - autor: nombre del autor (string)
 *  - ano: año de publicación (puede ser número o string, por si es desconocido)
 *  - disponible: indica si el libro está disponible o prestado (boolean).
 */
export interface Libro {
  titulo: string;
  autor: string;
  ano: number | string;
  disponible: boolean;
}
