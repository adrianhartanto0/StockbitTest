import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import movieReducer from './movieReducer'

const mainReducers = combineReducers({
  searchReducer,
  movieReducer,
})

export default mainReducers