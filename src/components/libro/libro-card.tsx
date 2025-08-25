import styles from "./libro-card.module.css";
import EliminarLibro from "../acciones/eliminar-libro";
import EditarLibro from "../formularios/editar-libros";
import { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";
import type { Libro } from "../../types/libro-interface";
import RetirarDevolverLibro from "../acciones/retirar-devolver";

function LibroCard({ libro }: { libro: Libro }) {
  const { libros, setLibros } = useContext(LibrosContext);

  const [editando, setEditando] = useState(false);

  return (
    <div className={styles["libro-card"]}>
      <div className={styles["libro-card_info"]}>
        <h3>{libro.titulo}</h3>
        <p>Autor: {libro.autor}</p>
        <p>Año de publicación: {libro.ano}</p>
        <p>{libro.disponible ? "Disponible" : "Prestado"}</p>
      </div>

      <div className={styles["libro-card_btns"]}>
        {!editando && <RetirarDevolverLibro libro={libro} disponibilidad={libro.disponible} />}
        {!editando && <button onClick={() => setEditando(true)}>Editar</button>}
        {editando && <EditarLibro libro={libro} cerrar={() => setEditando(false)} />}
        {!editando && <EliminarLibro libro={libro} libros={libros} setLibros={setLibros} />}
      </div>
    </div>
  );
}

export default LibroCard;
