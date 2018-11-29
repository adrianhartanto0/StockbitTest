export const getSearchURL = (apiKey, query, page) => {
  return  `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
}