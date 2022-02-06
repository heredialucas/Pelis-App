import {
  ADD_MOVIE_FAVORITE,
  GET_MOVIES,
  CLEAN_DETAIL,
  GET_MOVIE_DETAIL,
  GET_MOVIE_POPULAR,
  REMOVE_MOVIE_FAVORITE,
} from "../actions/actions";

const initialState = {
  moviesFavourites: [],
  moviesPop: [],
  moviesLoaded: [],
  movieDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE_FAVORITE:
      const movie = state.moviesFavourites.find(
        (movie) => movie.id === action.payload.id
      );
      if (!movie) {
        return {
          ...state,
          moviesFavourites: [...state.moviesFavourites, action.payload],
        };
      } else {
        return {
          ...state,
          moviesFavourites: [...state.moviesFavourites],
        };
      }

    case GET_MOVIES:
      return {
        ...state,
        moviesLoaded: action.payload.results,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case GET_MOVIE_POPULAR:
      return {
        ...state,
        moviesPop: action.payload.results,
      };

    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export default rootReducer;
