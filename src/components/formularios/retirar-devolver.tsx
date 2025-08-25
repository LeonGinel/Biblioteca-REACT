import type { Libro } from "../../types/libro-interface";
import { useContext } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function RetirarDevolverLibro({ libro, disponibilidad }: { libro: Libro; disponibilidad: boolean }) {
  const { setLibros } = useContext(LibrosContext);

  const libroDevuelto = (libro: Libro) => {
    const confirmar = window.confirm(`¿Deseas devolver "${libro.titulo}"?`);
    if (!confirmar) return;

    setLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: true } : l)));

    alert(`El libro "${libro.titulo}" ha sido devuelto`);
  };

  const libroRetirado = (libro: Libro) => {
    const confirmar = window.confirm(`¿Deseas retirar "${libro.titulo}"?`);
    if (!confirmar) return;

    setLibros((prev) => prev.map((l) => (l.titulo === libro.titulo ? { ...l, disponible: false } : l)));

    alert(`El libro "${libro.titulo}" ha sido retirado`);
  };

  return (
    <div>
      <button onClick={() => (!disponibilidad ? libroDevuelto(libro) : libroRetirado(libro))}>
        {!disponibilidad ? "Devolver" : "Retirar"}
      </button>
    </div>
  );
}
