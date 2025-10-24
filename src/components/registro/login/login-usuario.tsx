import styles from "../../Panel-control/panel-control.module.css";

export function RegistrarUsuario() {
  return (
    <div className={styles["contenedor-formulario_login"]}>
      <form className={styles["formulario_login"]}>
        <h2>Ingresa ahora!</h2>
        <div className={styles["formulario_login-nombre"]}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" className={styles["formulario_login-input_nombre"]} />
        </div>

        <div className={styles["formulario_login-contraseña"]}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" name="contraseña" id="contraseña" className={styles["formulario_login-input_contraseña"]} />
        </div>

        <div>
          <button className={styles["formulario_login-btn_confirmar"]}>Entrar</button>
        </div>
      </form>
    </div>
  );
}
