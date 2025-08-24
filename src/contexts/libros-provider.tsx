import { useState, useEffect, type ReactNode } from "react";
import { LibrosContext } from "./libros-context";
import type { Libro } from "../types/libro-interface";

export function LibrosProvider({ children }: { children: ReactNode }) {
  const [libros, setLibros] = useState<Libro[]>(() => {
    // Guardamos los libros en LocalStorage
    const guardado = localStorage.getItem("libros");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardamos en localStorage cada vez que libros cambian
  useEffect(() => {
    localStorage.setItem("libros", JSON.stringify(libros));
  }, [libros]);

  return <LibrosContext.Provider value={{ libros, setLibros }}>{children}</LibrosContext.Provider>;
}
