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
              <div className="containerPelisDiv" key={index}>
                <Link className="containerPelisLink" to={`/movie/${e.id}`}>
                  <h3 className="containerPelisTitle">{e.title}</h3>
                  <img
                    className="containerPelisImg"
                    src={`https://image.tmdb.org/t/p/w500${e.poster}`} 
                    alt="ImagenPoster"
                  />
                </Link>
                <button
                  className="containerPelisButton"
                  onClick={() => dispatch(removeMovieFavorite(e.id))}
                >
                  Eliminar
                </button>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default ConnectedList;
