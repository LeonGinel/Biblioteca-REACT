/**
 * Componente: PanelControl
 * -------------------------
 * Este componente actúa como el panel principal de la aplicación.
 * Permite al usuario:
 *  - Mostrar la biblioteca completa
 *  - Agregar un nuevo libro
 *  - Buscar un libro específico
 *  - Registrar un nuevo usuario
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
import { RegistrarUsuario } from "../registro/login/registro-usuario";

export default function PanelControl() {
  // Estado que indica qué sección está activa
  const [seccionActiva, setSeccionActiva] = useState<
    "mostrar" | "agregar" | "eliminar" | "editar" | "buscar" | "registro" | "ninguno"
  >("ninguno");

  // Estado que guarda el libro seleccionado desde el buscador
  const [libroSeleccionadoBuscador, setLibroSeleccionadoBuscador] = useState<Libro | null>(null);

  return (
    <div className={styles["contenedor-panel"]}>
      {/* Botones del panel para cambiar de sección */}
      <div className={styles["panel-control"]}>
        <button
          onClick={() => {
            if (seccionActiva === "mostrar") {
              setSeccionActiva("ninguno");
            } else {
              setSeccionActiva("mostrar");
              setLibroSeleccionadoBuscador(null); // Limpiar selección al cambiar de sección
            }
          }}
        >
          Mostrar biblioteca
        </button>
        <button
          onClick={() => {
            if (seccionActiva === "agregar") {
              setSeccionActiva("ninguno");
            } else {
              setSeccionActiva("agregar");
              setLibroSeleccionadoBuscador(null);
            }
          }}
        >
          Agregar
        </button>
        <button
          onClick={() => {
            if (seccionActiva === "buscar") {
              setSeccionActiva("ninguno");
            } else {
              setSeccionActiva("buscar");
              setLibroSeleccionadoBuscador(null);
            }
          }}
        >
          Buscar
        </button>
        <button
          onClick={() => {
            if (seccionActiva === "registro") {
              setSeccionActiva("ninguno");
            } else {
              setSeccionActiva("registro");
              setLibroSeleccionadoBuscador(null);
            }
          }}
        >
          Registro
        </button>
      </div>

      {/* Renderizado condicional según la sección activa */}

      <div className={styles["contenedor-mostrar"]}>{seccionActiva === "mostrar" && <MostrarLibros />}</div>
      <div className={styles["contenedor-agregar"]}>{seccionActiva === "agregar" && <AgregarLibro />}</div>
      <div className={styles["contenedor-buscador"]}>
        {seccionActiva === "buscar" && <BuscadorLibros onSelect={(l) => setLibroSeleccionadoBuscador(l)} />}

        {/* Mostrar la tarjeta del libro seleccionado en el buscador */}
        {libroSeleccionadoBuscador === null ? <></> : <LibroCard libro={libroSeleccionadoBuscador} />}
      </div>
      <div className={styles["contenedor-registro"]}>{seccionActiva === "registro" && <RegistrarUsuario />}</div>
    </div>
  );
}
