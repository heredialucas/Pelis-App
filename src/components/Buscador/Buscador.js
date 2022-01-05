import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Buscador.css";
import { getMoviePopular, getMovies } from "../../redux/actions/actions";
import Populares from "../Populares/Populares";
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
    if (title !== "") {
      e.preventDefault();
      dispatch(getMovies(title, page));
      setTitleCache(title);
      setTitle("");
      setPage(1);
    }
  }

  useEffect(() => {
    if (page > 0 && titleCache !== "") {
      dispatch(getMovies(titleCache, page));
    }
  }, [dispatch, titleCache, page]);

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
    <div className="containerForm">
      <Populares />
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-container-search">
          <button className="icon" onClick={(e) => handleSubmit(e)}></button>
          <input
            className="input"
            type="text"
            id="title"
            placeholder="Película"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          className="btnTopRigth"
          onClick={() => nextPage()}
          type="button"
        >
          Siguiente
        </button>
        <button
          className="btnTopLeft"
          onClick={() => previousPage()}
          type="button"
        >
          Anterior
        </button>
      </form>
      <Peliculas />
      <div className="btnContainer">
        <button
          className="btnDownLeft"
          onClick={() => previousPage()}
          type="button"
        >
          Anterior
        </button>
        <button
          className="btnDownRigth"
          onClick={() => nextPage()}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Buscador;
