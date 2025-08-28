import styles from "./cambio-tema.module.css";
import { type Dispatch, type SetStateAction } from "react";
import lamparaOn from "../../assets/sol.png";
import lamparaOff from "../../assets/luna.png";

export default function CambiarTema({ tema, setTema }: { tema: "light" | "dark"; setTema: Dispatch<SetStateAction<"light" | "dark">> }) {
  const cambioTema = () => {
    const botones = document.querySelectorAll<HTMLButtonElement>("button");
    botones.forEach((btn) => btn.classList.add("tema-transicion"));

    setTema(tema === "light" ? "dark" : "light");

    setTimeout(() => botones.forEach((btn) => btn.classList.remove("tema-transicion")), 1000);
  };

  return (
    <div className={styles["contenedor"]}>
      <button className={styles["cambiar-tema_btn"]} onClick={cambioTema}>
        <img src={tema === "light" ? lamparaOff : lamparaOn} alt="Btotón día/noche"></img>
      </button>
    </div>
  );
}
