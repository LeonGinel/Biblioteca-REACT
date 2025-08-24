import type { Libro } from "../../types/libro-interface";
import styles from "./prestar-libro.module.css";
import BuscadorLibros from "../buscador/buscador-libros";
import { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function PrestarLibro() {
  const { libros } = useContext(LibrosContext);

  const [listaLibros, setListaLibros] = useState(libros);

  const prestarLIbro = (libro: Libro) => {
    setListaLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: false } : l)));
  };

  return (
    <div className={styles["prestar-libro"]}>
      <h2>Prestar un libro:</h2>
      <BuscadorLibros libros={listaLibros} onSelect={prestarLIbro} />
    </div>
  );
}
