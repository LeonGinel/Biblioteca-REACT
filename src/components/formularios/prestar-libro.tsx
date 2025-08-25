import type { Libro } from "../../types/libro-interface";
import styles from "./prestar-libro.module.css";
import BuscadorLibros from "../buscador/buscador-libros";
import { useContext } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function PrestarLibro() {
  const { libros, setLibros } = useContext(LibrosContext);

  const libroPrestado = (libro: Libro) => {
    const confirmar = window.confirm(`¿Deseas prestar "${libro.titulo}"?`);
    if (!confirmar) return;

    setLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: false } : l)));

    alert(`El libro "${libro.titulo}" ha sido prestado`);
  };

  return (
    <div className={styles["prestar-libro"]}>
      <h2>Prestar un libro:</h2>
      <BuscadorLibros libros={libros} onSelect={libroPrestado} />
    </div>
  );
}
