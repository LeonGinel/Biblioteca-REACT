/**
 * Componente: CambiarTema
 * ------------------------
 * Este componente permite alternar entre los temas "light" y "dark" de la aplicación.
 *
 * Props:
 *  - tema: estado actual del tema ("light" o "dark")
 *  - setTema: función para actualizar el tema
 *
 * Al pulsar el botón, se cambia el tema y se aplica una transición visual a todos los botones.
 * También cambia la imagen del botón según el tema activo (sol para light, luna para dark).
 */

import styles from "./cambio-tema.module.css";
import { type Dispatch, type SetStateAction } from "react";
import sol from "../../assets/luna.webp";
import luna from "../../assets/sol.webp";

export default function CambiarTema({ tema, setTema }: { tema: "light" | "dark"; setTema: Dispatch<SetStateAction<"light" | "dark">> }) {
  // Función que alterna el tema
  const cambioTema = () => {
    // Seleccionamos todos los botones de la página y añadimos una clase para la transición
    const botones = document.querySelectorAll<HTMLButtonElement>("button");
    botones.forEach((btn) => btn.classList.add("tema-transicion"));

    // Cambiamos el tema
    setTema(tema === "light" ? "dark" : "light");

    // Después de 1 segundo, quitamos la clase de transición para que no afecte futuras interacciones
    setTimeout(() => botones.forEach((btn) => btn.classList.remove("tema-transicion")), 1000);
  };

  return (
    <div className={styles["contenedor"]}>
      {/* Botón que cambia el tema. La imagen depende del tema actual */}
      <button className={styles["cambiar-tema_btn"]} onClick={cambioTema}>
        <img src={tema === "light" ? sol : luna} alt="Botón día/noche"></img>
      </button>
    </div>
  );
}
