import { useState } from "react";
import type { Libro } from "../../types/libro-interface";
import styles from "./buscador-libros.module.css";

export default function BuscadorLibros({ libros, onSelect }: { libros: Libro[]; onSelect: (libro: Libro) => void }) {
  const [buscador, setBuscador] = useState("");
  const librosFiltrados = buscador
    ? libros.filter((l) => l.titulo.toLocaleLowerCase().trim().includes(buscador.toLocaleLowerCase().trim()))
    : [];

  return (
    <div className="prestar-libro">
      <div className={styles["input"]}>
        <label>Buscar:</label>
        <input type="text" placeholder="Buscar" value={buscador} onChange={(e) => setBuscador(e.target.value)} />
      </div>

      <div>
        {librosFiltrados.length > 0 ? (
          <ul className={styles["lista-resultados"]}>
            {librosFiltrados.map((l, index) => (
              <li key={index}>
                <button className={styles["lista-resultados_btn"]} type="button" onClick={() => onSelect(l)}>
                  {l.titulo} - {l.autor}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
