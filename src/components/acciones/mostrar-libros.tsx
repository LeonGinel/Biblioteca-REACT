import styles from "./mostrar-libros.module.css";
import LibroCard from "../libro/libro-card";
import { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";

function MostrarLibros() {
  const { libros } = useContext(LibrosContext);

  const [filtro, setFiltro] = useState<"todos" | "disponibles" | "retirados">("todos");

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

  const librosFiltrados =
    filtro === "disponibles" ? libros.filter((l) => l.disponible) : filtro === "retirados" ? libros.filter((l) => !l.disponible) : libros;

  return (
    <div className={styles["mostrar-libros_panel"]}>
      <div className={styles["mostrar-libros_btns"]}>
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("disponibles")}>Disponibles</button>
        <button onClick={() => setFiltro("retirados")}>Retirados</button>
      </div>

      <div className={styles["mostrar-libros_btons--abc"]}>
        {abecedario.map((l) => (
          <button>{l}</button>
        ))}
      </div>

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
