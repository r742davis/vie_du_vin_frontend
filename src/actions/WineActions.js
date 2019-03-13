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

export const addWine = (wine) => dispatch => {
  axios
    .post('/wines', wine)
    .then(res =>
      dispatch({
        type: ADD_WINE,
        payload: res.data
      })
    )
};

export const deleteWine = (id) => dispatch => {
  axios
    .delete(`/wines/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_WINE,
        payload: id
      })
  )
};

//Edit Wine
//Need to create axios dispatch with edit function


export const setWinesLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
