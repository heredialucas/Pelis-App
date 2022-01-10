import React from "react";

import { Link } from "react-router-dom";
import { removeMovieFavorite } from "../../redux/actions/actions";

import { useSelector, useDispatch } from "react-redux";

import s from "./Favorites.module.css";

import Espera from "../Espera/Espera";

function ConnectedList() {
  const dispatch = useDispatch();
  const moviesFavourites = useSelector((state) => state.moviesFavourites);
  return (
    <div>
      <h2 className={s.favsTitle}>Películas Favoritas</h2>
      <ul className={s.containerPelis}>
        {moviesFavourites.length === 0 ? (
          <Espera/>
        ) : (
          moviesFavourites.map((e, index) => {
            return (
              <div className={s.card} key={index}>
              <div className={s.poster}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster}`}
                  alt="Imagenes"
                />
              </div>
              <div className={s.details} to={`/movie/${e.id}`}>
                <h2>
                  {e.title}
                  <br />
                   <span>Date: {e.release_date}</span>
                </h2>
                <div className={s.tags}>
                  <span className={s.lenguaje}>{e.lenguaje}</span>
                  <span className={s.voted}>{e.voted}</span>
                </div>
                <Link className={s.btnLink} to={`/movie/${e.id}`}>
                    Details
                  </Link>
                <button
                  className={s.btnDelete}
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
