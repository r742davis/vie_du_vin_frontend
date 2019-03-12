import { combineReducers } from 'redux';
import wineReducer from './wineReducer';

export default combineReducers({
  wine: wineReducer
});
