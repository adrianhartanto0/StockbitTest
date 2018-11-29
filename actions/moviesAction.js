export const SAVE_MOVIES = 'SAVE_MOVIES';
export const SAVE_IMDB = 'SAVE_IMDB';

export const saveMoviesAction = (movies) => ({
  type: SAVE_MOVIES,
  payload: movies
})

export const saveImdbAction = (imdbID) => ({
  type: SAVE_IMDB,
  payload: imdbID
})