import { combineReducers } from 'redux';
import wineReducer from './wineReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  wine: wineReducer,
  auth: authReducer,
  error: errorReducer
});
