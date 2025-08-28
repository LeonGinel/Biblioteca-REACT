/**
 * Componente: MostrarLibros
 * --------------------------
 * Este componente se encarga de mostrar todos los libros que existen en el contexto global (LibrosContext).
 * Permite filtrar los libros por:
 *   - Estado de disponibilidad: "disponibles" o "retirados"
 *   - Letra inicial del título (A-Z)
 *   - Todos los libros
 *
 * Cada libro se renderiza mediante el componente LibroCard.
 */

import styles from "./mostrar-libros.module.css";
import LibroCard from "../libro/libro-card";
import { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";

function MostrarLibros() {
  // Obtenemos la lista de libros desde el contexto global
  const { libros } = useContext(LibrosContext);

  // Estado que guarda el filtro activo.
  // Puede ser: "todos", "disponibles", "retirados" o una letra concreta.
  const [filtro, setFiltro] = useState<"todos" | "disponibles" | "retirados" | string>("todos");

  // Array con todas las letras del abecedario para crear los botones de filtro alfabético.
  const abecedario: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  // Inicialmente mostramos todos los libros
  let librosFiltrados = libros;

  // Filtramos según el estado seleccionado en "filtro"
  if (filtro === "disponibles") {
    // Solo libros que están disponibles
    librosFiltrados = libros.filter((l) => l.disponible);
  } else if (filtro === "retirados") {
    // Solo libros que no están disponibles
    librosFiltrados = libros.filter((l) => !l.disponible);
  } else if (filtro.length === 1) {
    // Si el filtro es una letra, mostramos los libros cuyo título empiece por esa letra
    librosFiltrados = libros.filter((l) => l.titulo.toLowerCase().startsWith(filtro.toLowerCase()));
  }

  return (
    <div className={styles["mostrar-libros_panel"]}>
      {/* Botones de filtro principales */}
      <div className={styles["mostrar-libros_btns"]}>
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("disponibles")}>Disponibles</button>
        <button onClick={() => setFiltro("retirados")}>Retirados</button>
      </div>

      {/* Botones de filtro por letra (A-Z) */}
      <div className={styles["mostrar-libros_btons--abc"]}>
        {abecedario.map((letra) => (
          <button key={letra} onClick={() => setFiltro(letra)}>
            {letra.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Lista de libros filtrados */}
      <ul className={styles["lista-libros"]}>
        {librosFiltrados.map((l, index) => (
          <li key={index}>
            <LibroCard libro={l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostrarLibros;
