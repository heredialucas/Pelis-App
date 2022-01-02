export const ADD_MOVIE_FAVORITE = "addMovieFavorite";
export const GET_MOVIES = "getMovies";
export const GET_MOVIE_DETAIL = "getMovieDetail";
export const GET_MOVIE_POPULAR = "getMoviePopular";
export const REMOVE_MOVIE_FAVORITE = "removeMovieFavorite";

export function removeMovieFavorite(payload) {
  return {
    type: REMOVE_MOVIE_FAVORITE,
    payload,
  };
}

export function getMoviePopular(id) {
  return function (dispatch) {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=6ac1708a6a0dd355b5c9a85b25aaf89c&page=1`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_MOVIE_POPULAR,
          payload: json,
        });
      });
  };
}
export function getMovieDetail(id) {
  return function (dispatch) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6ac1708a6a0dd355b5c9a85b25aaf89c`
    )
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

export function getMovies(titulo, page) {
  return function (dispatch) {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6ac1708a6a0dd355b5c9a85b25aaf89c&query=${titulo}&page=${page}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_MOVIES, payload: json });
      });
  };
}
