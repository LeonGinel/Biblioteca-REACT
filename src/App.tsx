import { useEffect, useState } from "react";
import "./App.css";
import PanelControl from "./components/Panel-control/panel-control";
import Saludo from "./components/saludo/saludo";
import { LibrosProvider } from "./contexts/libros-provider";
import { UsuariosProvider } from "./contexts/usuarios-provider";
import CambiarTema from "./components/cambio-tema/cambio-tema";

function App() {
  const [tema, setTema] = useState<"light" | "dark">(() => {
    const temaGuardado = localStorage.getItem("tema");
    return temaGuardado === "light" || temaGuardado === "dark" ? temaGuardado : "light";
  });

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
