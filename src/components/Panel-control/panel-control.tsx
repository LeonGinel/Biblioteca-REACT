/**
 * Componente: PanelControl
 * -------------------------
 * Este componente actúa como el panel principal de la aplicación.
 * Permite al usuario:
 *  - Mostrar la biblioteca completa
 *  - Agregar un nuevo libro
 *  - Buscar un libro específico
 *
 * Controla qué sección se muestra mediante el estado `seccionActiva`.
 * También maneja la selección de un libro desde el buscador con `libroSeleccionadoBuscador`.
 */

import styles from "./panel-control.module.css";
import { useState } from "react";
import LibroCard from "../libro/libro-card";
import MostrarLibros from "../acciones/mostrar-libros";
import AgregarLibro from "../formularios/agregar-libro";
import BuscadorLibros from "../buscador/buscador-libros";
import type { Libro } from "../../types/libro-interface";

export default function PanelControl() {
  // Estado que indica qué sección está activa
  const [seccionActiva, setSeccionActiva] = useState<"mostrar" | "agregar" | "eliminar" | "editar" | "buscar" | "ninguno">("ninguno");

  // Estado que guarda el libro seleccionado desde el buscador
  const [libroSeleccionadoBuscador, setLibroSeleccionadoBuscador] = useState<Libro | null>(null);

  return (
    <div>
      {/* Botones del panel para cambiar de sección */}
      <div className={styles["panel-control"]}>
        <button
          onClick={() => {
            setSeccionActiva("mostrar");
            setLibroSeleccionadoBuscador(null); // Limpiar selección al cambiar de sección
          }}
        >
          Mostrar biblioteca
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

      {/* Renderizado condicional según la sección activa */}
      <div>
        <div>{seccionActiva === "mostrar" && <MostrarLibros />}</div>
        <div>{seccionActiva === "agregar" && <AgregarLibro />}</div>
        <div>
          {seccionActiva === "buscar" && <BuscadorLibros onSelect={(l) => setLibroSeleccionadoBuscador(l)} />}

          {/* Mostrar la tarjeta del libro seleccionado en el buscador */}
          {libroSeleccionadoBuscador === null ? <></> : <LibroCard libro={libroSeleccionadoBuscador} />}
        </div>
      </div>
    </div>
  );
}
