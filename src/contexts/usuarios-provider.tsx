/**
 * Componente: UsuariosProvider
 * -----------------------------
 * Proveedor de contexto responsable de gestionar la lista de usuarios y el usuario activo.
 *
 * Características principales:
 *  - Inicializa la lista de usuarios desde localStorage (si existe) para mantener los datos persistidos.
 *  - Escucha los cambios en la lista y los guarda automáticamente en localStorage.
 *  - Expone al contexto tanto la lista de usuarios como el usuario activo y sus setters correspondientes.
 */

import { useEffect, useState, type ReactNode } from "react";
import { UsuariosContext } from "./usuarios-context";
import type { Usuario } from "../types/usuario-interface";

export function UsuariosProvider({ children }: { children: ReactNode }) {
  // Lista global de usuarios, inicializada desde localStorage para mantener la persistencia
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  });

  // Cada vez que cambia la lista de usuarios la almacenamos de nuevo
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  // Estado que representa al usuario actualmente autenticado en la sesión
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario>({
    nombre: "Invitado",
    email: "",
    contraseña: "",
    biblioteca: [],
    logueado: false,
    rol: "invitado",
  });

  // Proveemos el contexto con los estados y funciones necesarios para el resto de la aplicación
  return <UsuariosContext.Provider value={{ usuarios, setUsuarios, usuarioActivo, setUsuarioActivo }}>{children}</UsuariosContext.Provider>;
}
