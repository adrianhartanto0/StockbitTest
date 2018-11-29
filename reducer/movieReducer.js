
import { SAVE_MOVIES, SAVE_IMDB } from '../actions/moviesAction'

const initialState = {
  movies: [],
  selectedImdbID:'',
}

export default function movieReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    case SAVE_IMDB:
      return {
        ...state,
        selectedImdbID: action.payload
      }
    default: 
      return state
  }
}