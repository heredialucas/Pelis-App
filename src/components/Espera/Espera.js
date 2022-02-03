import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovieFavorite } from "../../redux/actions/actions";

import s from "./Espera.module.css";

export default function Espera({number}) {
  console.log(number)
  const moviesPop = useSelector((state) => state.moviesPop);
  const dispatch = useDispatch();
  const redir = useNavigate();
  return (
    <div>
      {moviesPop?.length > 0 && (
        <div>
          <div className={s.container}>
            <div className={s.containerImg}>
              <h2 className={s.title}>{moviesPop[number]?.original_title}</h2>
              <div className={s.content}>
                <h3>{moviesPop[number]?.tagline}</h3>
                <p>{moviesPop[number]?.overview}</p>
                <h4>
                  Fecha de estreno: <span>{moviesPop[number]?.release_date}</span>
                </h4>
                <h4>
                  Popularidad: <span>{moviesPop[number]?.vote_average}</span>
                </h4>
                <button
                  onClick={() => {
                    redir("/favs");
                    dispatch(
                      addMovieFavorite({
                        title: moviesPop[number]?.original_title,
                        poster: moviesPop[number]?.poster_path,
                        id: moviesPop[number]?.id,
                        voted: moviesPop[number]?.vote_average,
                        lenguaje: moviesPop[number]?.original_language,
                        release_date: moviesPop[number]?.release_date,
                      })
                    );
                  }}
                >
                  Agregar a Favoritas
                </button>
                <br />
                <a href={moviesPop[number]?.homepage} target="blank_">
                  Ver Película
                </a>
              </div>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500${moviesPop[number]?.poster_path}`}
              alt="IMAGEN POSTER"
            />
          </div>
        </div>
      )}
    </div>
  );
}
