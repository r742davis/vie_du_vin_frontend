import axios from 'axios';
import { GET_WINES, ADD_WINE, DELETE_WINE, ITEMS_LOADING } from './types';

//Axios helps with async request:dispatch
export const getWines = () => dispatch => {
  dispatch(setWinesLoading());
  axios
    .get('/wines')
    .then(res =>
      dispatch({
        type: GET_WINES,
        payload: res.data
      })
    )
};

export const deleteWine = (id) => {
  return {
    type: DELETE_WINE,
    payload: id
  }
};

export const addWine = (wine) => {
  return {
    type: ADD_WINE,
    payload: wine
  }
};

export const setWinesLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
