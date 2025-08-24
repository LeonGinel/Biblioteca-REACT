import styles from "./panel-control.module.css";
import { useState } from "react";
import MostrarLibros from "../formularios/mostrar-libros";
import AgregarLibro from "../formularios/agregar-libro";
import PrestarLibro from "../formularios/prestar-libro";

export default function PanelControl() {
  const [seccionActiva, setSeccionActiva] = useState<
    "mostrar" | "agregar" | "eliminar" | "editar" | "prestar" | "disponibles" | "ninguno"
  >("ninguno");

  return (
    <div>
      <div className={styles["panel-control"]}>
        <button onClick={() => setSeccionActiva("mostrar")}>Mostrar bibiloteca</button>
        <button onClick={() => setSeccionActiva("agregar")}>Agregar</button>
        <button onClick={() => setSeccionActiva("prestar")}>Prestar</button>
        <button onClick={() => setSeccionActiva("disponibles")}>Mostrar lisbros disponibles</button>
      </div>

      <div>
        <div>{seccionActiva === "mostrar" && <MostrarLibros />}</div>
        <div>{seccionActiva === "agregar" && <AgregarLibro />}</div>
        <div>{seccionActiva === "prestar" && <PrestarLibro />}</div>
        <div>{seccionActiva === "disponibles" && <MostrarLibros soloDisponibles />}</div>
      </div>
    </div>
  );
}
