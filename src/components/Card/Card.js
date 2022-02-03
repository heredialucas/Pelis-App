import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovieFavorite } from "../../redux/actions/actions";

import Imagen from "../../assets/images/noimg.jpg";

import s from './Card.module.css'

export default function Card() {

    const dispatch = useDispatch();
  const redir = useNavigate();
  const moviesLoaded = useSelector((state) => state.moviesLoaded);

  return (
    <>
      {moviesLoaded.map((e, index) => {
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
              <div className={s.tags}>
                <span className={s.lenguaje}>{e.original_language}</span>
                <span className={s.voted}>{e.vote_average}</span>
              </div>
              <Link className={s.btnLink} to={`/movie/${e.id}`}>
                Details
              </Link>
              <button
                className={s.btn}
                onClick={() => {
                  redir("/favs");
                  dispatch(
                    addMovieFavorite({
                      title: e.original_title,
                      poster: e.poster_path,
                      id: e.id,
                      voted: e.vote_average,
                      lenguaje: e.original_language,
                      release_date: e.release_date,
                    })
                  );
                }}
              >
                Agregar a Favoritas
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
