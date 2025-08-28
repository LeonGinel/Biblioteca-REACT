/**
 * Componente: AgregarLibro
 * -------------------------
 * Este componente permite agregar un nuevo libro a la lista global de libros.
 *
 * Funciona mediante un formulario que recoge:
 *  - Título del libro (obligatorio)
 *  - Autor (opcional, por defecto "Anónimo")
 *  - Año de publicación (opcional, por defecto "Desconocido")
 *  - Disponibilidad (checkbox)
 *
 * Al enviar el formulario:
 *  1. Pide confirmación al usuario
 *  2. Agrega el libro al contexto global (LibrosContext)
 *  3. Resetea el formulario
 *  4. Muestra un mensaje de éxito
 */

import styles from "./agregar-libro.module.css";
import React, { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function AgregarLibro() {
  // Obtenemos la función para actualizar la lista de libros desde el contexto
  const { setLibros } = useContext(LibrosContext);

  // Estados locales para guardar los valores del formulario
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState<number>(0);
  const [disponible, setDisponible] = useState<boolean>(true);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que recargue la página

    // Confirmación antes de agregar
    const confirmacion = confirm(`Seguro que desea agregar '${titulo}'`);
    if (!confirmacion) return;

    // Agregamos el nuevo libro al estado global
    setLibros((prev) => [
      ...prev,
      {
        titulo,
        autor: autor === "" ? "Anónimo" : autor,
        ano: ano === 0 ? "Desconocido" : ano,
        disponible,
      },
    ]);

    // Limpiamos el formulario
    setTitulo("");
    setAutor("");
    setAno(0);
    setDisponible(true);

    alert("Libro agregado correctamente");
  };

  return (
    <div>
      <form className={styles["agregar-libro"]} onSubmit={handleSubmit}>
        <h2>Insertar Nuevo Libro:</h2>

        <div className={styles["agregar-libro_inputs"]}>
          {/* Input para el título */}
          <div className={styles["input"]}>
            <label>Título:</label>
            <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>

          {/* Input para el autor */}
          <div className={styles["input"]}>
            <label>Autor:</label>
            <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </div>

          {/* Input para el año de publicación */}
          <div className={styles["input"]}>
            <label>Año de publicación:</label>
            <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} />
          </div>

          {/* Checkbox de disponibilidad */}
          <div className={styles["input"]}>
            <label>Disponibilidad:</label>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
          </div>
        </div>

        {/* Botón de enviar */}
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
}
