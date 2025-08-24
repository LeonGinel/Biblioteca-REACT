import styles from "./mostrar-libros.module.css";
import LibroCard from "../libro/libro-card";
import { useContext } from "react";
import { LibrosContext } from "../../contexts/libros-context";

function MostrarLibros({ soloDisponibles = false }: { soloDisponibles?: boolean }) {
  const { libros } = useContext(LibrosContext);

  const librosFiltrados = soloDisponibles ? libros.filter((l) => l.disponible) : libros;

  return (
    <ul className={styles["lista-libros"]}>
      {librosFiltrados.map((l, index) => (
        <li key={index}>
          <LibroCard libro={l} />
        </li>
      ))}
    </ul>
  );
}

export default MostrarLibros;
