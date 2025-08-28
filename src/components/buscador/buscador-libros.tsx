/**
 * Componente: BuscadorLibros
 * ---------------------------
 * Este componente muestra un buscador en tiempo real para filtrar libros
 * por su título.
 *
 * Props:
 *  - onSelect: función que se ejecuta cuando el usuario selecciona un libro de los resultados.
 *
 * Utiliza el contexto LibrosContext para acceder a la lista completa de libros.
 * Filtra los resultados a medida que el usuario escribe en el input.
 */

import { useState, useContext } from "react";
import type { Libro } from "../../types/libro-interface";
import styles from "./buscador-libros.module.css";
import { LibrosContext } from "../../contexts/libros-context";

export default function BuscadorLibros({ onSelect }: { onSelect: (libro: Libro) => void }) {
  // Obtenemos todos los libros del contexto
  const { libros } = useContext(LibrosContext);

  // Estado que guarda lo que el usuario escribe en el input
  const [buscador, setBuscador] = useState("");

  // Filtramos los libros que incluyen la palabra buscada en el título
  const librosFiltrados = buscador
    ? libros.filter((l) => l.titulo.toLocaleLowerCase().trim().includes(buscador.toLocaleLowerCase().trim()))
    : [];

  return (
    <div className={styles["buscar-libro"]}>
      {/* Input de búsqueda */}
      <div className={styles["input"]}>
        <label>Buscar:</label>
        <input type="text" placeholder="Buscar" value={buscador} onChange={(e) => setBuscador(e.target.value)} />
      </div>

      {/* Lista de resultados filtrados */}
      <div>
        {librosFiltrados.length > 0 ? (
          <ul className={styles["lista-resultados"]}>
            {librosFiltrados.map((l, index) => (
              <li key={index}>
                {/* Al pulsar, llamamos a onSelect con el libro elegido */}
                <button className={styles["lista-resultados_btn"]} type="button" onClick={() => onSelect(l)}>
                  {l.titulo} - {l.autor}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <></> // No mostramos nada si no hay resultados
        )}
      </div>
    </div>
  );
}
