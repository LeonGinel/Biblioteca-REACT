/**
 * Componente: RetirarDevolverLibro
 * --------------------------------
 * Este componente se encarga de cambiar la disponibilidad de un libro.
 * - Si el libro está retirado, muestra un botón para devolverlo.
 * - Si el libro está disponible, muestra un botón para retirarlo.
 *
 * Usa el contexto (LibrosContext) para actualizar el estado global de la lista de libros.
 */

import type { Libro } from "../../types/libro-interface";
import { useContext } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function RetirarDevolverLibro({ libro, disponibilidad }: { libro: Libro; disponibilidad: boolean }) {
  // Obtenemos la función que actualiza la lista de libros desde el contexto
  const { setLibros } = useContext(LibrosContext);

  // Acción de devolver un libro
  const libroDevuelto = (libro: Libro) => {
    const confirmar = window.confirm(`¿Deseas devolver "${libro.titulo}"?`);
    if (!confirmar) return; // Si cancela, no hacemos nada

    // Actualizamos el estado: cambiamos el libro para que ahora esté disponible
    setLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: true } : l)));

    alert(`El libro "${libro.titulo}" ha sido devuelto`);
  };

  // Acción de retirar un libro
  const libroRetirado = (libro: Libro) => {
    const confirmar = window.confirm(`¿Deseas retirar "${libro.titulo}"?`);
    if (!confirmar) return;

    // Actualizamos el estado: cambiamos el libro para que ahora esté retirado
    setLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: false } : l)));

    alert(`El libro "${libro.titulo}" ha sido retirado`);
  };

  return (
    <div>
      {/* Botón dinámico:
          - Si el libro no está disponible, el botón sirve para devolverlo.
          - Si el libro está disponible, el botón sirve para retirarlo. */}
      <button onClick={() => (!disponibilidad ? libroDevuelto(libro) : libroRetirado(libro))}>
        {!disponibilidad ? "Devolver" : "Retirar"}
      </button>
    </div>
  );
}
