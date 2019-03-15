import {
  GET_WINES,
  ADD_WINE,
  DELETE_WINE,
  WINES_LOADING
} from '../actions/types'

const initialState = {
  wines: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_WINES:
      return {
        ...state,
        wines: action.payload,
        loading: false
      };
    case DELETE_WINE:
      return {
        ...state,
        wines: state.wines.filter(wine => wine._id !== action.payload)
      };
    case ADD_WINE:
      return {
        ...state,
        wines: [action.payload, ...state.wines]
      };
    case WINES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
