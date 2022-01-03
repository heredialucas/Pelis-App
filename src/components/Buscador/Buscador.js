import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Buscador.css";
import {
  addMovieFavorite,
  getMoviePopular,
  getMovies,
} from "../../redux/actions/actions";
import Imagen from "../../assets/images/noimg.jpg";

function Buscador() {
  const dispatch = useDispatch();
  const moviesLoaded = useSelector((state) => state.moviesLoaded);
  const redir = useNavigate();

  const [title, setTitle] = useState("");
  const [titleCache, setTitleCache] = useState("");
  const [page, setPage] = useState(1);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMovies(title, page));
    setTitleCache(title);
    setTitle("");
    setPage(1);
  }

  useEffect(() => {
    dispatch(getMoviePopular());
  }, []);

  useEffect(() => {
    if (page > 0 && titleCache !== "") {
      dispatch(getMovies(titleCache, page));
    }
  }, [page]);

  function nextPage() {
    if (page > 0 && (titleCache !== "") & (moviesLoaded.length > 1)) {
      setPage(page + 1);
    }
  }
  function previousPage() {
    if (page > 1 && titleCache !== "") {
      setPage(page - 1);
    }
  }

  return (
    <div>
      <h2>Buscador</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">
            Película:
          </label>
          <input
            className="input"
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="button" type="submit">
          BUSCAR
        </button>
      </form>

      <ul className="containerPelis">
        {moviesLoaded.length === 0 ? (
          <h3>No hay nada para mostrar</h3>
        ) : (
          moviesLoaded.map((e, index) => {
            return (
              <div className="card" key={index}>
                <div className="poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                    alt="Imagenes"
                  />
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
      <button onClick={() => previousPage()} type="button">
        Anterior
      </button>
      <button onClick={() => nextPage()} type="button">
        Siguiente
      </button>
    </div>
  );
}

export default Buscador;
