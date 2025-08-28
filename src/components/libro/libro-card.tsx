/**
 * Componente: LibroCard
 * ----------------------
 * Este componente muestra la información de un libro individual y permite realizar acciones sobre él.
 *
 * Funcionalidad:
 *  - Muestra título, autor, año de publicación y estado de disponibilidad.
 *  - Permite:
 *      - Retirar o devolver el libro (componente RetirarDevolverLibro)
 *      - Editar el libro (componente EditarLibro)
 *      - Eliminar el libro (componente EliminarLibro)
 *
 * El estado `editando` controla si se está mostrando el formulario de edición o no.
 */

import styles from "./libro-card.module.css";
import EliminarLibro from "../acciones/eliminar-libro";
import EditarLibro from "../formularios/editar-libros";
import { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";
import type { Libro } from "../../types/libro-interface";
import RetirarDevolverLibro from "../acciones/retirar-devolver";

function LibroCard({ libro }: { libro: Libro }) {
  // Contexto para obtener y modificar la lista global de libros
  const { libros, setLibros } = useContext(LibrosContext);

  // Estado local para controlar si estamos editando este libro
  const [editando, setEditando] = useState(false);

  return (
    <div className={styles["libro-card"]}>
      {/* Información principal del libro */}
      <div className={styles["libro-card_info"]}>
        <h3>{libro.titulo}</h3>
        <p>Autor: {libro.autor}</p>
        <p>Año de publicación: {libro.ano}</p>
        <p>{libro.disponible ? "Disponible" : "Prestado"}</p>
      </div>

      {/* Botones de acción */}
      <div className={styles["libro-card_btns"]}>
        {/* Mostrar botón de retirar/devolver solo si no estamos editando */}
        {!editando && <RetirarDevolverLibro libro={libro} disponibilidad={libro.disponible} />}

        {/* Botón para abrir el formulario de edición */}
        {!editando && <button onClick={() => setEditando(true)}>Editar</button>}

        {/* Formulario de edición */}
        {editando && <EditarLibro libro={libro} cerrar={() => setEditando(false)} />}

        {/* Botón de eliminar libro, solo si no estamos editando */}
        {!editando && <EliminarLibro libro={libro} libros={libros} setLibros={setLibros} />}
      </div>
    </div>
  );
}

export default LibroCard;
