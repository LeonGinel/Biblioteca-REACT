import { createContext } from "react";
import type { Usuario } from "../types/usuario-interface";

interface UsuariosContextType {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

export const UsuariosContext = createContext<UsuariosContextType>({
  usuarios: [],
  setUsuarios: () => {},
});
