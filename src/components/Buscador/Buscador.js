import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Buscador.css";
import { getMoviePopular, getMovies } from "../../redux/actions/actions";

import Peliculas from "../Peliculas/Peliculas";

function Buscador() {
  const dispatch = useDispatch();
  const moviesLoaded = useSelector((state) => state.moviesLoaded);

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
  }, [dispatch]);

  useEffect(() => {
    if (page > 0 && titleCache !== "") {
      dispatch(getMovies(titleCache, page));
    }
  }, [dispatch,titleCache,page]);

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
        <div className="form-container-search">
          <div className="icon"></div>
          <input
            className="input"
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </form>
      <Peliculas />
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
