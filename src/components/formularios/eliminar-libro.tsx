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
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const confirmado = confirm(`Seguro que desea eliminar '${libro.titulo}'`);
    if (!confirmado) return;

    setLibros(libros.filter((l) => l.titulo !== libro.titulo));

    alert("Libro eliminado correctamente");
  }

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Eliminar
      </button>
    </div>
  );
}
