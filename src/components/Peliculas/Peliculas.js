import { useSelector } from "react-redux";

import Espera from "../Espera/Espera";
import Card from "../Card/Card";

import s from "./Peliculas.module.css";

export default function Peliculas() {
  const moviesLoaded = useSelector((state) => state.moviesLoaded);

  return (
    <ul className={s.containerPelis}>
      {moviesLoaded.length === 0 ? <Espera /> : <Card />}
    </ul>
  );
}
