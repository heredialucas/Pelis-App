import React from "react";
import { Link } from "react-router-dom";
import { removeMovieFavorite } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import "./Favorites.css";

function ConnectedList() {
  const dispatch = useDispatch();
  const moviesFavourites = useSelector((state) => state.moviesFavourites);
  return (
    <div>
      <h2>Películas Favoritas</h2>
      <ul className="containerPelis">
        {moviesFavourites.length === 0 ? (
          <h3>No hay películas agregadas</h3>
        ) : (
          moviesFavourites.map((e, index) => {
            return (
              <div className="card" key={index}>
              <div className="poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster}`}
                  alt="Imagenes"
                />
              </div>
              <div className="details" to={`/movie/${e.id}`}>
                <h2>
                  {e.title}
                  <br />
                   <span>Date: {e.release_date}</span>
                </h2>
                <div className="tags">
                  <span className="lenguaje">{e.lenguaje}</span>
                  <span className="voted">{e.voted}</span>
                </div>
                <Link className="btn-link" to={`/movie/${e.id}`}>
                    Details
                  </Link>
                <button
                  className="btn-delete"
                  onClick={() => dispatch(removeMovieFavorite(e.id))}
                >
                  Eliminar
                </button>
                
              </div>
            </div>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default ConnectedList;
