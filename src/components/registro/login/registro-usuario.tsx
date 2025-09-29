import React, { useState } from "react";
import styles from "./panel-control.module.css";
import type { Usuario } from "../../../types/usuario-interface";

export function RegistrarUsuario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [condiciones, setCondiciones] = useState(false);

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !contraseña) {
      alert("Completa los campos obligatorios");
      return;
    }

    if (nombre.trim().length < 3) {
      alert("El nombre debe contener al menos 3 caracteres");
      return;
    }

    const nombreYaExiste = usuariosGuardados.some((u: Usuario) => u.nombre === nombre);
    if (nombreYaExiste) {
      alert("El nombre de usuario ya existe");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Introduce un email válido");
      return;
    }

    const emailYaExiste = usuariosGuardados.some((u: Usuario) => u.email === email);
    if (emailYaExiste) {
      alert("El nombre de usuarioemail introducido ya existe");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(contraseña)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (condiciones !== true) {
      alert("Debes aceptar las condiciones");
      return;
    }
  };

  return (
    <div className={styles["contenedor-formulario_registro"]}>
      <form className={styles["formulario_registro"]} onSubmit={handleSubmit}>
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
