import { GET_WINES, ADD_WINE, DELETE_WINE } from './types';

export const getWines = () => {
  return {
    type: GET_WINES
  }
}

export const deleteWine = (id) => {
  return {
    type: DELETE_WINE,
    payload: id
  }
}
