import React, { useContext, useState } from "react";
import styles from "./panel-control.module.css";
import type { Usuario } from "../../../types/usuario-interface";
import { UsuariosContext } from "../../../contexts/usuarios-context";
import { ToastContainer, toast } from "react-toastify";

export function RegistrarUsuario() {
  const [usuarioValido, setUsuarioValido] = useState({
    nombre: { valor: "", valido: null, mensaje: "" },
    email: { valor: "", valido: null, mensaje: "" },
    contraseña: { valor: "", valido: null, mensaje: "" },
    confirmarContraseña: { valor: "", valido: null, mensaje: "" },
    condiciones: { valor: false, valido: null, mensaje: "" },
  });

  // const [nombre, setNombre] = useState("");
  // const [email, setEmail] = useState("");
  // const [contraseña, setContraseña] = useState("");
  // const [confirmarContraseña, setConfirmarContraseña] = useState("");
  // const [condiciones, setCondiciones] = useState(false);

  // const [nombreValido, setNombreValid] = useState<boolean | null>(null);
  // const [emailValido, setEmailValido] = useState<boolean | null>(null);
  // const [contraseñaValida, setContraseñaValida] = useState<boolean | null>(null);
  // const [confirmarContraseñaValida, setConfirmarContraseñaValida] = useState<boolean | null>(null);
  // const [condicionesValido, setCondicionesValido] = useState<boolean | null>(null);

  const { usuarios, setUsuarios } = useContext(UsuariosContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioValido.nombre || !usuarioValido.email || !usuarioValido.contraseña) {
      toast.error("Completa los campos obligatorios");
      return;
    }

    if (usuarioValido.nombre.valor.trim().length < 3) {
      toast.error("El nombre debe contener al menos 3 caracteres");
      return;
    }

    const nombreYaExiste = usuarios.some((u: Usuario) => u.nombre === usuarioValido.nombre.valor);
    if (nombreYaExiste) {
      toast.error("El nombre de usuario ya existe");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuarioValido.email.valor)) {
      toast.error("Introduce un email válido");
      return;
    }

    const emailYaExiste = usuarios.some((u: Usuario) => u.email === usuarioValido.email.valor);
    if (emailYaExiste) {
      toast.error("El email introducido ya existe");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(usuarioValido.contraseña.valor)) {
      toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial");
      return;
    }

    if (usuarioValido.contraseña.valor !== usuarioValido.confirmarContraseña.valor) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (usuarioValido.condiciones.valor !== true) {
      toast.error("Debes aceptar las condiciones");
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: nombre,
      email: email,
      contraseña: contraseña,
      biblioteca: [],
      logueado: false,
      rol: "usuario",
    };

    const usuariosActualizado = [...usuarios, nuevoUsuario];
    setUsuarios(usuariosActualizado);
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizado));
    toast.success("Usuario registrado correctamente!");

    setNombre("");
    setEmail("");
    setContraseña("");
    setConfirmarContraseña("");
    setCondiciones(false);
  };

  const formularioValido = nombre && email && contraseña && confirmarContraseña && condiciones;

  return (
    <div className={styles["contenedor-formulario_registro"]}>
      <form className={styles["formulario_registro"]} onSubmit={handleSubmit}>
        <h2>¡Regístrate ahora!</h2>
        <div className={styles["formulario_registro-nombre"]}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className={styles["formulario_registro-input_nombre"]}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className={styles["formulario_registro-email"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className={styles["formulario_registro-input_email"]}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles["formulario_registro-contraseña"]}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            className={styles["formulario_registro-input_contraseña"]}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <div className={styles["formulario_registro-confirmar_contraseña"]}>
          <label htmlFor="confirmar_contraseña">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmar_contraseña"
            id="confirmar_contraseña"
            className={styles["formulario_registro-input_confirmar_contraseña"]}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
          />
        </div>

        <div className={styles["formulario_registro-aceptar_condiciones"]}>
          <input type="checkbox" id="acepto" onChange={(e) => setCondiciones(e.target.checked)} />
          <label htmlFor="acepto">He leído y acepto la política de privacidad y de participación</label>
        </div>

        <div>
          <button className={styles["formulario_registro-btn_confirmar"]} disabled={!formularioValido}>
            Confirmar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
