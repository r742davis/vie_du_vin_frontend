import axios from 'axios';
import {
  GET_WINES,
  ADD_WINE,
  DELETE_WINE,
  WINES_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//Axios helps with async request:dispatch
export const getWines = () => (dispatch, getState) => {
  dispatch(setWinesLoading());
  axios
    .get('https://vie-du-vin-backend.herokuapp.com/wines', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_WINES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addWine = (wine) => (dispatch, getState) => {
  axios
    .post('https://vie-du-vin-backend.herokuapp.com/wines', wine, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_WINE,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const deleteWine = (id) => (dispatch, getState) => {
  axios
    .delete('https://vie-du-vin-backend.herokuapp.com/wines/'+id, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_WINE,
        payload: id
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

//--Edit Wine--// EXPERIMENTAL
export const updateWine = (id, updatedWine, winesArray) => (dispatch, getState) => {
  console.log(updatedWine);
  console.log(winesArray);
  axios
    .put('https://vie-du-vin-backend.herokuapp.com/wines/'+id, updatedWine)
    .then( () => {
      axios
        .get('https://vie-du-vin-backend.herokuapp.com/wines', tokenConfig(getState))
        .then(res =>
          dispatch({
            type: GET_WINES,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.status)))
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setWinesLoading = () => {
  return {
    type: WINES_LOADING
  }
}
