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
    <>
      <div className="movie-detail">
        <ul>
          <li>{movieDetail.original_title}</li>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt="IMAGEN POSTER"
          />
          <li>{movieDetail.overview}</li>
        </ul>
      </div>
    </>
  );
}

export default Movie;
