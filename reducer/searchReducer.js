
import { EDIT_QUERY, CHANGE_PAGE } from '../actions/searchAction'

const initialState = {
  query: 'Batman',
  page: 1
}

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case EDIT_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default: 
      return state
  }
}