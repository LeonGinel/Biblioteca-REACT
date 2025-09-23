import { useEffect, useState, type ReactNode } from "react";
import { UsuariosContext } from "./usuarios-context";
import type { Usuario } from "../types/usuario-interface";

export function UsuariosProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const [usuarioActivo, setUsuarioActivo] = useState<Usuario>({
    nombre: "Invitado",
    email: "",
    contraseña: "",
    biblioteca: [],
    logueado: false,
    rol: "invitado",
  });

  return <UsuariosContext.Provider value={{ usuarios, setUsuarios, usuarioActivo, setUsuarioActivo }}>{children}</UsuariosContext.Provider>;
}
