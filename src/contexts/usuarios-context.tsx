/**
 * Contexto: UsuariosContext
 * --------------------------
 * Contexto global que expone la lista de usuarios, el usuario activo y sus funciones de actualización.
 *
 * Objetivos principales:
 *  - Compartir el estado de usuarios entre componentes sin necesidad de prop drilling.
 *  - Ofrecer valores por defecto seguros para evitar errores cuando aún no existe un proveedor.
 */

import { createContext } from "react";
import type { Usuario } from "../types/usuario-interface";

interface UsuariosContextType {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  usuarioActivo: Usuario;
  setUsuarioActivo: React.Dispatch<React.SetStateAction<Usuario>>;
}

export const UsuariosContext = createContext<UsuariosContextType>({
  usuarios: [],
  setUsuarios: () => {},
  usuarioActivo: { nombre: "Invitado", email: "", contraseña: "", biblioteca: [], logueado: false, rol: "invitado" },
  setUsuarioActivo: () => {},
});
