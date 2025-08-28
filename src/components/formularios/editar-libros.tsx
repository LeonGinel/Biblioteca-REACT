/**
 * Componente: EditarLibro
 * ------------------------
 * Este componente permite editar los datos de un libro existente.
 *
 * Props:
 *  - libro: el libro que se quiere editar
 *  - cerrar: función que cierra el formulario de edición
 *
 * Funcionalidad:
 * 1. Inicializa los inputs con los valores actuales del libro.
 * 2. Detecta qué campos han cambiado y construye un mensaje de confirmación.
 * 3. Si el usuario confirma, actualiza el libro en la lista global (LibrosContext).
 * 4. Muestra alertas de confirmación y cierra el formulario.
 */

import styles from "./editar-libro.module.css";
import React, { useContext, useState } from "react";
import type { Libro } from "../../types/libro-interface";
import { LibrosContext } from "../../contexts/libros-context";

export default function EditarLibro({ libro, cerrar }: { libro: Libro; cerrar: () => void }) {
  const { setLibros } = useContext(LibrosContext);

  // Estados locales inicializados con los valores actuales del libro
  const [titulo, setTitulo] = useState(libro.titulo);
  const [autor, setAutor] = useState(libro.autor);
  const [ano, setAno] = useState(libro.ano);
  const [disponible, setDisponible] = useState<boolean>(libro.disponible);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Revisamos qué campos han cambiado
    const cambios: string[] = [];
    if (libro.titulo !== titulo) cambios.push(`Título: "${libro.titulo}" --> "${titulo}"`);
    if (libro.autor !== autor) cambios.push(`Autor: "${libro.autor}" --> "${autor}"`);
    if (libro.ano !== ano) cambios.push(`Año: "${libro.ano}" --> "${ano}"`);
    if (libro.disponible !== disponible) {
      cambios.push(`Disponible: ${libro.disponible ? "Sí" : "No"} --> ${disponible ? "Sí" : "No"}`);
    }

    // Si no hay cambios, avisamos y salimos
    if (cambios.length === 0) {
      alert("No se han realizado cambios.");
      return;
    }

    // Mensaje de confirmación detallado
    const mensaje = "¿Seguro que quieres aplicar los siguientes cambios?\n\n" + cambios.join("\n");
    const confirmado = window.confirm(mensaje);
    if (!confirmado) return;

    // Creamos el libro editado
    const libroEditado: Libro = { titulo, autor, ano, disponible };

    // Actualizamos la lista de libros: reemplazamos el libro original por el editado
    setLibros((prev) => prev.map((l) => (l === libro ? libroEditado : l)));

    alert("Libro editado correctamente!");

    // Cerramos el formulario
    cerrar();
  };

  return (
    <div>
      <form className={styles["editar-libro_formulario"]} onSubmit={handleSubmit}>
        <div className={styles["editar-libro_inputs"]}>
          {/* Inputs para editar cada campo */}
          <div className={styles["input"]}>
            <label>Editar título:</label>
            <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>

          <div className={styles["input"]}>
            <label>Editar autor:</label>
            <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </div>

          <div className={styles["input"]}>
            <label>Editar año de publicación:</label>
            <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} />
          </div>

          <div className={styles["input"]}>
            <label>Editar disponibilidad:</label>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
          </div>
        </div>

        {/* Botones de acción */}
        <div className={styles["editar-libro_btns"]}>
          <button type="submit">Confirmar</button>
          <button type="button" onClick={cerrar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
