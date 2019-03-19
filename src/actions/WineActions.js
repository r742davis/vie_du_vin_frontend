import axios from 'axios';
import {
  GET_WINES,
  ADD_WINE,
  DELETE_WINE,
  UPDATE_WINE,
  WINES_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//Axios helps with async request:dispatch
export const getWines = () => (dispatch, getState) => {
  dispatch(setWinesLoading());
  axios
    .get('/wines', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_WINES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status)))
};

//--Add a wine--//
export const addWine = (wine) => (dispatch, getState) => {
  axios
    .post('/wines', wine, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_WINE,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

//--Delete a wine--//
export const deleteWine = (id) => (dispatch, getState) => {
  axios
    .delete(`/wines/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_WINE,
        payload: id
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

//--Edit Wine--// EXPERIMENTAL
export const updateWine = (id, updatedWine) =>
(dispatch, getState) => {
  console.log(updatedWine);
  axios
    .put(`/wines/${id}`,
    tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_WINE,
        payload: res.data
      }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setWinesLoading = () => {
  return {
    type: WINES_LOADING
  }
}
