import "./App.css";
import PanelControl from "./components/Panel-control/panel-control";
import Saludo from "./components/saludo/saludo";
import { LibrosProvider } from "./contexts/libros-provider";

function App() {
  return (
    <LibrosProvider>
      <div>
        <h1>MI BIBLIOTECA (Ts + React)</h1>

        <Saludo nombre="León" />
        <PanelControl />
      </div>
    </LibrosProvider>
  );
}

export default App;
