/**
 * Componente: App
 * ----------------
 * Punto de entrada principal de la aplicación. Se encarga de montar los proveedores de contexto
 * (LibrosProvider y UsuariosProvider) y mostrar los componentes principales de la interfaz.
 *
 * Responsabilidades:
 *  - Controlar el tema visual (light/dark) y persistirlo en localStorage.
 *  - Renderizar el encabezado general y el panel de control de la biblioteca.
 *  - Mostrar el componente para alternar el tema en cualquier momento.
 */

import { useEffect, useState } from "react";
import "./App.css";
import PanelControl from "./components/Panel-control/panel-control";
import Saludo from "./components/saludo/saludo";
import { LibrosProvider } from "./contexts/libros-provider";
import { UsuariosProvider } from "./contexts/usuarios-provider";
import CambiarTema from "./components/cambio-tema/cambio-tema";

import "react-toastify/dist/ReactToastify.css"; // Libreria React-Toastify

function App() {
  // Estado global del tema con inicialización desde localStorage para recordar la preferencia del usuario
  const [tema, setTema] = useState<"light" | "dark">(() => {
    const temaGuardado = localStorage.getItem("tema");
    return temaGuardado === "light" || temaGuardado === "dark" ? temaGuardado : "light";
  });

  // Cada vez que cambia el tema aplicamos el atributo correspondiente en <html> y lo persistimos
  useEffect(() => {
    document.documentElement.setAttribute("theme", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <LibrosProvider>
      <UsuariosProvider>
        <div id="contenedor-principal">
          <h1>MI BIBLIOTECA (Ts + React)</h1>
          <Saludo nombre="León" />
          <PanelControl />
        </div>
        <CambiarTema tema={tema} setTema={setTema} />
      </UsuariosProvider>
    </LibrosProvider>
  );
}

export default App;
