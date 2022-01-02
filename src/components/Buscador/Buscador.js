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
              <div className="containerPelisDiv" key={index}>
                <Link className="containerPelisLink" to={`/movie/${e.id}`}>
                  <h3 className="containerPelisTitle">{e.original_title}</h3>
                  {!e.poster_path ? (
                    <img
                      className="containerPelisImg"
                      src={Imagen}
                      alt="IMAGEN POSTER"
                    />
                  ) : (
                    <img
                      className="containerPelisImg"
                      src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                      alt="IMAGEN POSTER"
                    />
                  )}
                </Link>
                <button
                  className="containerPelisButton"
                  onClick={() => {
                    redir("/favs");
                    dispatch(
                      addMovieFavorite({
                        title: e.original_title,
                        poster: e.poster_path,
                        id: e.id,
                      })
                    );
                  }}
                >
                  Agregar a Favoritas
                </button>
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
