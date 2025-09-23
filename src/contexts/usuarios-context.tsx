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
