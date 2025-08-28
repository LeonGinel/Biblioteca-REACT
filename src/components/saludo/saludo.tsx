/**
 * Componente: Saludo
 * -------------------
 * Este componente muestra un mensaje de bienvenida al usuario.
 *
 * Props:
 *  - nombre: nombre del usuario que se mostrará en el saludo
 *
 * Nota: Este es uno de los primeros componentes que creé mientras aprendía React,
 * así que está diseñado de forma sencilla y clara para comprender cómo funcionan las props.
 */

import styles from "./saludo.module.css";

function Saludo(props: { nombre: string }) {
  return (
    <div className={styles["saludo"]}>
      {/* Mostramos el saludo dinámicamente según el nombre recibido por props */}
      <h2>Bienvenido {props.nombre}, ¿qué quiere hacer hoy?</h2>
    </div>
  );
}

export default Saludo;
