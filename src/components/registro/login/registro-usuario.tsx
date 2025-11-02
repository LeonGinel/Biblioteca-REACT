/**
 * Componente: RegistrarUsuario
 * -----------------------------
 * Formulario completo para registrar nuevos usuarios dentro de la aplicación.
 *
 * Funcionalidades principales:
 *  - Valida cada campo (nombre, email, contraseña, confirmación y aceptación de condiciones) con mensajes personalizados.
 *  - Impide la creación de usuarios duplicados comprobando nombre y correo contra el contexto global.
 *  - Persiste los usuarios registrados en localStorage y muestra mensajes de éxito o error según corresponda.
 *
 * Notas de mejora:
 *  - (Pendiente) Centralizar la gestión de toasts o mensajes visuales para feedback más visible.
 */

import React, { useContext, useState } from "react";
import styles from "./registro-usuario.module.css";
import type { Usuario } from "../../../types/usuario-interface";
import { UsuariosContext } from "../../../contexts/usuarios-context";

type CampoTexto = {
  valor: string;
  valido: boolean | null;
  mensaje: string;
};

type CampoCheckbox = {
  valor: boolean;
  valido: boolean | null;
  mensaje: string;
};

type UsuarioValidoState = {
  nombre: CampoTexto;
  email: CampoTexto;
  contraseña: CampoTexto;
  confirmarContraseña: CampoTexto;
  condiciones: CampoCheckbox;
};

type ValidationResult = {
  valido: boolean;
  mensaje: string;
};

export function RegistrarUsuario() {
  const [usuarioValido, setUsuarioValido] = useState<UsuarioValidoState>({
    nombre: { valor: "", valido: null, mensaje: "" },
    email: { valor: "", valido: null, mensaje: "" },
    contraseña: { valor: "", valido: null, mensaje: "" },
    confirmarContraseña: { valor: "", valido: null, mensaje: "" },
    condiciones: { valor: false, valido: null, mensaje: "" },
  });
  const [mensajeExito, setMensajeExito] = useState("");

  const { usuarios, setUsuarios } = useContext(UsuariosContext);

  const validarNombre = (valor: string): ValidationResult => {
    const limpio = valor.trim();

    if (!limpio) {
      return { valido: false, mensaje: "El nombre es obligatorio." };
    }

    if (limpio.length < 3) {
      return { valido: false, mensaje: "El nombre debe contener al menos 3 caracteres." };
    }

    const nombreYaExiste = usuarios.some((u: Usuario) => u.nombre.trim().toLowerCase() === limpio.toLowerCase());

    if (nombreYaExiste) {
      return { valido: false, mensaje: "El nombre de usuario ya existe." };
    }

    return { valido: true, mensaje: "" };
  };

  const validarEmail = (valor: string): ValidationResult => {
    const limpio = valor.trim();

    if (!limpio) {
      return { valido: false, mensaje: "El email es obligatorio." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(limpio)) {
      return { valido: false, mensaje: "Introduce un email válido." };
    }

    const emailYaExiste = usuarios.some((u: Usuario) => u.email.trim().toLowerCase() === limpio.toLowerCase());

    if (emailYaExiste) {
      return { valido: false, mensaje: "El email introducido ya existe." };
    }

    return { valido: true, mensaje: "" };
  };

  const validarContraseña = (valor: string): ValidationResult => {
    if (!valor) {
      return { valido: false, mensaje: "La contraseña es obligatoria." };
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(valor)) {
      return {
        valido: false,
        mensaje: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial.",
      };
    }

    return { valido: true, mensaje: "" };
  };

  const validarConfirmarContraseña = (valor: string, contraseña: string): ValidationResult => {
    if (!valor) {
      return { valido: false, mensaje: "Confirma la contraseña." };
    }

    if (valor !== contraseña) {
      return { valido: false, mensaje: "Las contraseñas no coinciden." };
    }

    return { valido: true, mensaje: "" };
  };

  const validarCondiciones = (valor: boolean): ValidationResult => {
    if (!valor) {
      return { valido: false, mensaje: "Debes aceptar las condiciones." };
    }

    return { valido: true, mensaje: "" };
  };

  const actualizarCampo = (campo: keyof UsuarioValidoState, resultado: ValidationResult) => {
    setUsuarioValido((prev) => ({
      ...prev,
      [campo]: {
        ...prev[campo],
        ...resultado,
      },
    }));
  };

  const resetFormulario = () => {
    setUsuarioValido({
      nombre: { valor: "", valido: null, mensaje: "" },
      email: { valor: "", valido: null, mensaje: "" },
      contraseña: { valor: "", valido: null, mensaje: "" },
      confirmarContraseña: { valor: "", valido: null, mensaje: "" },
      condiciones: { valor: false, valido: null, mensaje: "" },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultados = {
      nombre: validarNombre(usuarioValido.nombre.valor),
      email: validarEmail(usuarioValido.email.valor),
      contraseña: validarContraseña(usuarioValido.contraseña.valor),
      confirmarContraseña: validarConfirmarContraseña(usuarioValido.confirmarContraseña.valor, usuarioValido.contraseña.valor),
      condiciones: validarCondiciones(usuarioValido.condiciones.valor),
    } satisfies Record<keyof UsuarioValidoState, ValidationResult>;

    setUsuarioValido((prev) => ({
      ...prev,
      nombre: { ...prev.nombre, ...resultados.nombre },
      email: { ...prev.email, ...resultados.email },
      contraseña: { ...prev.contraseña, ...resultados.contraseña },
      confirmarContraseña: {
        ...prev.confirmarContraseña,
        ...resultados.confirmarContraseña,
      },
      condiciones: { ...prev.condiciones, ...resultados.condiciones },
    }));

    const formularioEsValido = Object.values(resultados).every((campo) => campo.valido);

    if (!formularioEsValido) {
      setMensajeExito("");
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: usuarioValido.nombre.valor,
      email: usuarioValido.email.valor,
      contraseña: usuarioValido.contraseña.valor,
      biblioteca: [],
      logueado: false,
      rol: "usuario",
    };

    const usuariosActualizado = [...usuarios, nuevoUsuario];
    setUsuarios(usuariosActualizado);
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizado));
    setMensajeExito("¡Usuario registrado correctamente!");
    resetFormulario();
  };

  const formularioValido = Object.values(usuarioValido).every((campo) => campo.valido === true);

  return (
    <div className={styles["contenedor-formulario_registro"]}>
      <form className={styles["formulario_registro"]} onSubmit={handleSubmit}>
        <h2>¡Regístrate ahora!</h2>
        {mensajeExito && <p className={styles["mensaje-exito"]}>{mensajeExito}</p>}

        <div className={styles["formulario_registro-nombre"]}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className={`${styles["formulario_registro-input_nombre"]} ${
              usuarioValido.nombre.valido === false ? styles["input-error"] : ""
            }`}
            value={usuarioValido.nombre.valor}
            onChange={(e) => {
              const valor = e.target.value;
              setUsuarioValido((prev) => ({
                ...prev,
                nombre: { valor, valido: null, mensaje: "" },
              }));
              setMensajeExito("");
            }}
            onBlur={() => actualizarCampo("nombre", validarNombre(usuarioValido.nombre.valor))}
          />
        </div>
        {usuarioValido.nombre.valido === false && <p className={styles["mensaje-error"]}>{usuarioValido.nombre.mensaje}</p>}

        <div className={styles["formulario_registro-email"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${styles["formulario_registro-input_email"]} ${usuarioValido.email.valido === false ? styles["input-error"] : ""}`}
            value={usuarioValido.email.valor}
            onChange={(e) => {
              const valor = e.target.value;
              setUsuarioValido((prev) => ({
                ...prev,
                email: { valor, valido: null, mensaje: "" },
              }));
              setMensajeExito("");
            }}
            onBlur={() => actualizarCampo("email", validarEmail(usuarioValido.email.valor))}
          />
        </div>
        {usuarioValido.email.valido === false && <p className={styles["mensaje-error"]}>{usuarioValido.email.mensaje}</p>}

        <div className={styles["formulario_registro-contraseña"]}>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            className={`${styles["formulario_registro-input_contraseña"]} ${
              usuarioValido.contraseña.valido === false ? styles["input-error"] : ""
            }`}
            value={usuarioValido.contraseña.valor}
            onChange={(e) => {
              const valor = e.target.value;
              setUsuarioValido((prev) => ({
                ...prev,
                contraseña: { valor, valido: null, mensaje: "" },
                confirmarContraseña: prev.confirmarContraseña.valor
                  ? { ...prev.confirmarContraseña, valido: null, mensaje: "" }
                  : prev.confirmarContraseña,
              }));
              setMensajeExito("");
            }}
            onBlur={() => actualizarCampo("contraseña", validarContraseña(usuarioValido.contraseña.valor))}
          />
        </div>
        {usuarioValido.contraseña.valido === false && <p className={styles["mensaje-error"]}>{usuarioValido.contraseña.mensaje}</p>}

        <div className={styles["formulario_registro-confirmar_contraseña"]}>
          <label htmlFor="confirmar_contraseña">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmar_contraseña"
            id="confirmar_contraseña"
            className={`${styles["formulario_registro-input_confirmar_contraseña"]} ${
              usuarioValido.confirmarContraseña.valido === false ? styles["input-error"] : ""
            }`}
            value={usuarioValido.confirmarContraseña.valor}
            onChange={(e) => {
              const valor = e.target.value;
              setUsuarioValido((prev) => ({
                ...prev,
                confirmarContraseña: { valor, valido: null, mensaje: "" },
              }));
              setMensajeExito("");
            }}
            onBlur={() =>
              actualizarCampo(
                "confirmarContraseña",
                validarConfirmarContraseña(usuarioValido.confirmarContraseña.valor, usuarioValido.contraseña.valor)
              )
            }
          />
        </div>
        {usuarioValido.confirmarContraseña.valido === false && (
          <p className={styles["mensaje-error"]}>{usuarioValido.confirmarContraseña.mensaje}</p>
        )}

        <div className={styles["formulario_registro-aceptar_condiciones"]}>
          <input
            type="checkbox"
            id="acepto"
            checked={usuarioValido.condiciones.valor}
            onChange={(e) => {
              const valor = e.target.checked;
              setUsuarioValido((prev) => ({
                ...prev,
                condiciones: {
                  valor,
                  valido: valor ? true : null,
                  mensaje: "",
                },
              }));
              setMensajeExito("");
            }}
            onBlur={() => actualizarCampo("condiciones", validarCondiciones(usuarioValido.condiciones.valor))}
          />
          <label htmlFor="acepto">He leído y acepto la política de privacidad y de participación</label>
        </div>
        {usuarioValido.condiciones.valido === false && <p className={styles["mensaje-error"]}>{usuarioValido.condiciones.mensaje}</p>}

        <div>
          <button className={styles["formulario_registro-btn_confirmar"]} disabled={!formularioValido}>
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
}
