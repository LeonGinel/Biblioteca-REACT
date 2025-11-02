/**
 * Componente: LoginUsuario
 * -------------------------
 * Formulario sencillo de acceso para los usuarios registrados en la aplicación.
 *
 * Características principales:
 *  - Solicita nombre y contraseña.
 *  - Reutiliza los estilos del panel de control para mantener coherencia visual.
 *  - (Pendiente) Añadir la lógica de autenticación y manejo de errores en futuras iteraciones.
 */

import styles from "../../Panel-control/panel-control.module.css";

export function RegistrarUsuario() {
  return (
    <div className={styles["contenedor-formulario_login"]}>
      <form className={styles["formulario_login"]}>
        <h2>Ingresa ahora!</h2>

        {/* Campo para capturar el nombre del usuario */}
        <div className={styles["formulario_login-nombre"]}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" className={styles["formulario_login-input_nombre"]} />
        </div>

        {/* Campo para capturar la contraseña del usuario */}
        <div className={styles["formulario_login-contraseña"]}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" name="contraseña" id="contraseña" className={styles["formulario_login-input_contraseña"]} />
        </div>

        {/* Botón para enviar el formulario (la lógica se implementará más adelante) */}
        <div>
          <button className={styles["formulario_login-btn_confirmar"]}>Entrar</button>
        </div>
      </form>
    </div>
  );
}
