export const EDIT_QUERY = 'EDIT_QUERY';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const editQueryAction = (query) => ({
  type: EDIT_QUERY,
  payload: query
})

export const changePageAction = (page) => ({
  type: CHANGE_PAGE,
  payload: page
})