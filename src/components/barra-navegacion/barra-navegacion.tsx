import styles from "./barra-navegacion.module.css";

export default function BarraNavegacion() {
  return (
    <div>
      <nav className={styles["barra-navegacion"]}>
        <title>PO.LI</title>
        <button>Entrar</button>
        <button>Registrate</button>
      </nav>
    </div>
  );
}
