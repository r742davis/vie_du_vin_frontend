import uuid from 'uuid';
import { GET_WINES, ADD_WINE, DELETE_WINE } from '../actions/types'

const initialState = {
  wines: [
    { id: uuid(), name: 'Chateau Morosé' },
    { id: uuid(), name: 'Black Cat Red' },
    { id: uuid(), name: 'Napa\'s Delight' },
    { id: uuid(), name: 'Winter\'s Fell' },
    { id: uuid(), name: 'St. Pondo' }
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_WINES:
      return {
        ...state
      };
    case DELETE_WINE:
      return {
        ...state,
        wines: state.wines.filter(wine => wine.id !== action.payload)
      };
    default:
      return state;
  }
}
