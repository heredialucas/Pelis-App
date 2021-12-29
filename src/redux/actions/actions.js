export const ADD_MOVIE_FAVORITE = "addMovieFavorite";
export const GET_MOVIES = "getMovies";
export const GET_MOVIE_DETAIL = "getMovieDetail";
export const REMOVE_MOVIE_FAVORITE = "removeMovieFavorite";

export function removeMovieFavorite(payload) {
  return {
    type: REMOVE_MOVIE_FAVORITE,
    payload,
  };
}

export function getMovieDetail(id) {
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=d1dcdf9c&i=" + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_MOVIE_DETAIL,
          payload: json,
        });
      });
  };
}

export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload };
}

export function getMovies(titulo) {
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=d1dcdf9c&s=" + titulo)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_MOVIES, payload: json });
      });
  };
}
