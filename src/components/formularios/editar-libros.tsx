import styles from "./editar-libro.module.css";
import React, { useContext, useState } from "react";
import type { Libro } from "../../types/libro-interface";
import { LibrosContext } from "../../contexts/libros-context";

export default function EditarLibro({ libro, cerrar }: { libro: Libro; cerrar: () => void }) {
  const { setLibros } = useContext(LibrosContext);

  const [titulo, setTitulo] = useState(libro.titulo);
  const [autor, setAutor] = useState(libro.autor);
  const [ano, setAno] = useState(libro.ano);
  const [disponible, setDisponible] = useState<boolean>(libro.disponible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Comprobar qué campos han cambiado
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

    // Construir el mensaje de confirmación
    const mensaje = "¿Seguro que quieres aplicar los siguientes cambios?\n\n" + cambios.join("\n");

    const confirmado = window.confirm(mensaje);

    if (!confirmado) return;

    const libroEditado: Libro = { titulo, autor, ano, disponible };

    setLibros((prev) => prev.map((l) => (l === libro ? libroEditado : l)));

    alert("Libro editado correctamente!");

    cerrar();
  };

  return (
    <div>
      <form className={styles["editar-libro_formulario"]} action="" onSubmit={handleSubmit}>
        <div className={styles["editar-libro_inputs"]}>
          <div className={styles["input"]}>
            <label>Editar título:</label>
            <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
          </div>

          <div className={styles["input"]}>
            <label>Editar autor:</label>
            <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
          </div>

          <div className={styles["input"]}>
            <label>Editar año de publicación:</label>
            <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))}></input>
          </div>

          <div className={styles["input"]}>
            <label>Editar disponibilidad:</label>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)}></input>
          </div>
        </div>

        <div className={styles["editar-libro_btns"]}>
          <button type="submit">Confirmar</button>
          <button onClick={cerrar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
