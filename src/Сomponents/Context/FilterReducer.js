import {
  SET_LOADING,
  FILTER_TICKETS,
  СLEAR_FILTER
} from './types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case FILTER_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      }
    case СLEAR_FILTER:
      return {
        ...state,
        tickets: [],
        loading: false
      }
    default:
      return state;
  }
};