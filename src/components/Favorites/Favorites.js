import React from "react";
import { Link } from "react-router-dom";
import { removeMovieFavorite } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import "./Favorites.css";

function ConnectedList() {


  const dispatch = useDispatch()
  const moviesFavourites = useSelector(state => state.moviesFavourites)
  return (
    <div>
      <h2>Películas Favoritas</h2>
      <ul>
        {moviesFavourites &&
        moviesFavourites.map((e, index) => {
          return (
            <div key={index}>
              <Link to={`/movie/${e.id}`}>
                <li>{e.title}</li>
              </Link>
              <button onClick={() => dispatch(removeMovieFavorite(e.id))}>
                Eliminar
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ConnectedList;
