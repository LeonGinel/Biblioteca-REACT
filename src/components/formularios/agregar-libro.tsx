import styles from "./agregar-libro.module.css";
import React, { useContext, useState } from "react";
import { LibrosContext } from "../../contexts/libros-context";

export default function AgregarLibro() {
  const { setLibros } = useContext(LibrosContext);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState<number>(0);
  const [disponible, setDisponible] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmacion = confirm(`Seguro que de sea agregar '${titulo}'`);
    if (!confirmacion) return;

    setLibros((prev) => [
      ...prev,
      { titulo, autor: autor === "" ? "Anónimo" : autor, ano: ano === 0 ? "Desconocido" : ano, disponible },
    ]);

    setTitulo("");
    setAutor("");
    setAno(0);
    setDisponible(true);

    alert("Libro agregado correctamente");
  };

  return (
    <div>
      <form className={styles["agregar-libro"]} action="" onSubmit={handleSubmit}>
        <h2>Insertar Nuevo Libro:</h2>

        <div className={styles["agregar-libro_inputs"]}>
          <div className={styles["input"]}>
            <label>Título:</label>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            ></input>
          </div>

          <div className={styles["input"]}>
            <label>Autor:</label>
            <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
          </div>

          <div className={styles["input"]}>
            <label>Año de publicación:</label>
            <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))}></input>
          </div>

          <div className={styles["input"]}>
            <label>Disponibilidad:</label>
            <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)}></input>
          </div>
        </div>

        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
}
