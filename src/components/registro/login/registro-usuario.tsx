import styles from "./panel-control.module.css";

export function RegistrarUsuario() {
  return (
    <div className={styles["contenedor-formulario_registro"]}>
      <form className={styles["formulario_registro"]}>
        <h2>¡Regístrate ahora!</h2>
        <div className={styles["formulario_registro-nombre"]}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" className={styles["formulario_registro-input_nombre"]} />
        </div>

        <div className={styles["formulario_registro-email"]}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" className={styles["formulario_registro-input_email"]} />
        </div>

        <div className={styles["formulario_registro-contraseña"]}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" name="contraseña" id="contraseña" className={styles["formulario_registro-input_contraseña"]} />
        </div>

        <div className={styles["formulario_registro-confirmar_contraseña"]}>
          <label htmlFor="confirmar_contraseña">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmar_contraseña"
            id="confirmar_contraseña"
            className={styles["formulario_registro-input_confirmar_contraseña"]}
          />
        </div>

        <div className={styles["formulario_registro-aceptar_condiciones"]}>
          <input type="checkbox" id="acepto" />
          <label htmlFor="acepto">He leído y acepto la política de privacidad y de participación</label>
        </div>

        <div>
          <button className={styles["formulario_registro-btn_confirmar"]}>Confirmar</button>
        </div>
      </form>
    </div>
  );
}
