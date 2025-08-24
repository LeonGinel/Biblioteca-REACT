import styles from "./saludo.module.css";

function Saludo(props: { nombre: string }) {
  return (
    <div className={styles["saludo"]}>
      <h2>Bienvenido {props.nombre}, ¿que quiere hacer hoy?</h2>
    </div>
  );
}

export default Saludo;
