import React, { createContext } from "react";
import type { Libro } from "../types/libro-interface";

interface LibrosContextType {
  libros: Libro[];
  setLibros: React.Dispatch<React.SetStateAction<Libro[]>>;
}

export const LibrosContext = createContext<LibrosContextType>({ libros: [], setLibros: () => {} });
