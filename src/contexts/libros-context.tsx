/**
 * Contexto: LibrosContext
 * ------------------------
 * Este contexto permite compartir la lista de libros y su función de actualización
 * entre todos los componentes que lo consuman en la aplicación.
 * Evitamos con esto el "prop drilling"
 *
 * LibrosContext proporciona:
 *  - libros: array de libros actual
 *  - setLibros: función para actualizar la lista de libros
 */

import React, { createContext } from "react";
import type { Libro } from "../types/libro-interface";

// Interfaz que define la forma del contexto
interface LibrosContextType {
  libros: Libro[];
  setLibros: React.Dispatch<React.SetStateAction<Libro[]>>;
}

// Creamos el contexto con valores por defecto
export const LibrosContext = createContext<LibrosContextType>({
  libros: [], // Por defecto la lista está vacía
  setLibros: () => {}, // Función vacía por defecto
});
