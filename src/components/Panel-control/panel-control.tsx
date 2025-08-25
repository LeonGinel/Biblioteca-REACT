import styles from "./panel-control.module.css";
import { useState } from "react";
import LibroCard from "../libro/libro-card";
import MostrarLibros from "../acciones/mostrar-libros";
import AgregarLibro from "../formularios/agregar-libro";
import BuscadorLibros from "../buscador/buscador-libros";
import type { Libro } from "../../types/libro-interface";

export default function PanelControl() {
  const [seccionActiva, setSeccionActiva] = useState<"mostrar" | "agregar" | "eliminar" | "editar" | "buscar" | "ninguno">(
    "ninguno"
  );

  const [libroSeleccionadoBuscador, setLibroSeleccionadoBuscador] = useState<Libro | null>(null);

  return (
    <div>
      <div className={styles["panel-control"]}>
        <button
          onClick={() => {
            setSeccionActiva("mostrar");
            setLibroSeleccionadoBuscador(null);
          }}
        >
          Mostrar bibiloteca
        </button>
        <button
          onClick={() => {
            setSeccionActiva("agregar");
            setLibroSeleccionadoBuscador(null);
          }}
        >
          Agregar
        </button>
        <button
          onClick={() => {
            setSeccionActiva("buscar");
            setLibroSeleccionadoBuscador(null);
          }}
        >
          Buscar
        </button>
      </div>

      <div>
        <div>{seccionActiva === "mostrar" && <MostrarLibros />}</div>
        <div>{seccionActiva === "agregar" && <AgregarLibro />}</div>
        <div>
          {seccionActiva === "buscar" && <BuscadorLibros onSelect={(l) => setLibroSeleccionadoBuscador(l)} />}{" "}
          {libroSeleccionadoBuscador === null ? <></> : <LibroCard libro={libroSeleccionadoBuscador} />}
        </div>
      </div>
    </div>
  );
}
