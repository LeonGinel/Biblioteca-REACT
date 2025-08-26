import styles from "./cambio-tema.module.css";
import type { Dispatch, SetStateAction } from "react";
import dia from "../../assets/tema-luna_32.png";
import noche from "../../assets/tema-sol_32.png";

export default function CambiarTema({ tema, setTema }: { tema: "light" | "dark"; setTema: Dispatch<SetStateAction<"light" | "dark">> }) {
  return (
    <div>
      <button className={styles["cambiar-tema_btn"]} onClick={() => setTema(tema === "light" ? "dark" : "light")}>
        <img src={tema === "light" ? dia : noche} alt="Btotón día/noche"></img>
      </button>
    </div>
  );
}
