/**
 * Componente: EliminarLibro
 * --------------------------
 * Este componente se encarga de eliminar un libro de la lista de libros.
 * Recibe como props:
 *  - libro: el libro que se desea eliminar
 *  - libros: la lista completa de libros
 *  - setLibros: función para actualizar la lista de libros
 *
 * Muestra un botón que, al pulsarlo, solicita confirmación y elimina el libro si se confirma.
 */

import type { FormEvent } from "react";
import type { Libro } from "../../types/libro-interface";

export default function EliminarLibro({
  libro,
  libros,
  setLibros,
}: {
  libro: Libro;
  libros: Libro[];
  setLibros: React.Dispatch<React.SetStateAction<Libro[]>>;
}) {
  // Esta función se ejecuta cuando pulsamos el botón "Eliminar".
  function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario.

    // Mostramos un mensaje de confirmación para asegurarnos de que el usuario no borra por error.
    const confirmado = confirm(`Seguro que desea eliminar '${libro.titulo}'`);
    if (!confirmado) return; // Si el usuario cancela, no hacemos nada.

    // Aquí actualizamos la lista de libros, filtrando y quitando el que tiene el mismo título.
    setLibros(libros.filter((l) => l.titulo !== libro.titulo));

    // Avisamos al usuario de que la acción se completó.
    alert("Libro eliminado correctamente");
  }

  return (
    <div>
      {/* Botón que dispara la función de eliminar */}
      <button type="submit" onClick={handleSubmit}>
        Eliminar
      </button>
    </div>
  );
}
