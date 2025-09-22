import type { Categoria } from "./categoria-interface";

export interface Usuario {
  nombre: string;
  email: string;
  contraseña: string;
  biblioteca: Categoria[];
  logueado: boolean;
}
