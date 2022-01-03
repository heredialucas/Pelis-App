import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Imagen from "../../assets/images/noimg.jpg";
import { addMovieFavorite } from "../../redux/actions/actions";
import './Peliculas.css'

export default function Peliculas (){

    const dispatch = useDispatch();
  const redir = useNavigate();
  const moviesLoaded = useSelector((state) => state.moviesLoaded);

    return(
        <ul className="containerPelis">
        {moviesLoaded.length === 0 ? (
          <h3>No hay nada para mostrar</h3>
        ) : (
          moviesLoaded.map((e, index) => {
            return (
              <div className="card" key={index}>
                <div className="poster">
                  {!e.poster_path ? (
                    <img
                      src={Imagen}
                      alt="Imagenesasdas"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                      alt="Imagenes"
                    />
                  )}
                </div>
                <div className="details" to={`/movie/${e.id}`}>
                  <h2>
                    {e.original_title}
                    <br />
                    <span>Date: {e.release_date}</span>
                  </h2>
                  <div className="tags">
                    <span className="lenguaje">{e.original_language}</span>
                    <span className="voted">{e.vote_average}</span>
                  </div>
                  <Link className="btn-link" to={`/movie/${e.id}`}>
                    Details
                  </Link>
                  <button
                    className="btn"
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
          })
        )}
      </ul>
    )
}