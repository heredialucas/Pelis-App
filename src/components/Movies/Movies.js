import { getMovieDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./Movies.css";
import { useParams } from "react-router-dom";

function Movie() {
  const movieId = useParams();
  const movieDetail = useSelector((state) => state.movieDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetail(movieId.id));
  }, []);

  return (
    <div className="container">
      <div className="containerImg">
        <h2 className="title">{movieDetail.original_title}</h2>
        <div className="content">
          <h3>{movieDetail.tagline}</h3>
          <p>{movieDetail.overview}</p>
          <h4>Fecha de estreno: <span>{movieDetail.release_date}</span></h4>
          <h4>Popularidad: <span>{movieDetail.vote_average}</span></h4>
          <a href={movieDetail.homepage} target="blank_">Ver Película</a>
        </div>
      </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt="IMAGEN POSTER"
        />
    </div>
  );
}

export default Movie;
