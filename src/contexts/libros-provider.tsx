/**
 * Componente: LibrosProvider
 * ---------------------------
 * Este componente envuelve la aplicación y proporciona el contexto de libros.
 * Permite que cualquier componente hijo acceda a:
 *  - libros: la lista de libros
 *  - setLibros: función para actualizar la lista
 *
 * Además:
 *  - Inicializa los libros desde el localStorage para mantener los datos entre recargas.
 *  - Guarda automáticamente los cambios en localStorage cada vez que se actualiza la lista.
 *
 * Nota: Es una forma sencilla de aprender cómo usar Context y persistencia con React.
 */

import { useState, useEffect, type ReactNode } from "react";
import { LibrosContext } from "./libros-context";
import type { Libro } from "../types/libro-interface";

export function LibrosProvider({ children }: { children: ReactNode }) {
  // Estado global de libros, inicializado desde localStorage
  const [libros, setLibros] = useState<Libro[]>(() => {
    const guardado = localStorage.getItem("libros");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardar automáticamente en localStorage cada vez que libros cambian
  useEffect(() => {
    localStorage.setItem("libros", JSON.stringify(libros));
  }, [libros]);

  // Proveer el estado y la función de actualización a todos los hijos
  return <LibrosContext.Provider value={{ libros, setLibros }}>{children}</LibrosContext.Provider>;
}
