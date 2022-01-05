import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoviePopular } from "../../redux/actions/actions";
import Imagen from "../../assets/images/noimg.jpg";
import { Link } from "react-router-dom";
import s from "./Populares.module.css";

export default function Pop() {
  const dispatch = useDispatch();
  const ref = useRef();
  const moviesPop = useSelector((state) => state.moviesPop);

  const [aux, setAux] = useState(0);

  useEffect(() => {
    dispatch(getMoviePopular());
  }, [dispatch]);

  useEffect(() => {
    ref.current.style.marginLeft = aux + "px";   
    console.log(aux) 
    console.log(ref)
  }, [aux]);

  function onLeft() {
    if (aux > 0) {
      setAux(0);
    }
    if(aux < 0){
      setAux(aux + 300)
    }
  }
  function onRight() {
    if(aux < ref.current.clientWidth&& aux > (-ref.current.clientWidth + 1100) ){
      setAux(aux - 300);
    }
  }

  return (
    <div className={s.containerPelis}>
      <button  onClick={() => onLeft()} className={s.buttonLeft}></button>
      <button onClick={() => onRight()} className={s.buttonRight}></button>
      <div ref={ref} className={s.containerPelisDiv}>
        {moviesPop &&
          moviesPop.map((e, index) => {
            return (
              <div className={s.card} key={index}>
                <div className={s.poster}>
                  {!e.poster_path ? (
                    <img src={Imagen} alt="Imagenesasdas" />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                      alt="Imagenes"
                    />
                  )}
                </div>
                <div className={s.details} to={`/movie/${e.id}`}>
                  <h2>
                    {e.original_title}
                    <br />
                    <span>Date: {e.release_date}</span>
                  </h2>
                  <Link className={s.btnLink} to={`/movie/${e.id}`}>
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
