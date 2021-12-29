import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Buscador.css";
import { addMovieFavorite, getMovies } from "../../redux/actions/actions";

function Buscador() {
  const dispatch = useDispatch();
  const moviesLoaded = useSelector((state) => state.moviesLoaded);

  const [title, setTitle] = useState("");

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMovies(title));
    setTitle("");
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
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">BUSCAR</button>
      </form>
      <ul>
        {moviesLoaded &&
          moviesLoaded.map((e, index) => {
            return (
              <div key={index}>
                <Link to={`/movie/${e.imdbID}`}>
                  <li>{e.Title}</li>
                </Link>
                <button
                  onClick={() =>
                    dispatch(addMovieFavorite({
                      title: e.Title,
                      id: e.imdbID,
                    }))
                  }
                >
                  Fav
                </button>
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default Buscador;
