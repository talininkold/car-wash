import {
  SET_LOADING,
  FILTER_TICKETS,
  СLEAR_FILTER,
  TYPE_FILTER,
  CLEAR_TYPE_FILTER,
  SET_SEARCH_TYPE
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
    case TYPE_FILTER:
      return {
        ...state,
        typeFiltered: state.tickets.filter(el => el[11] === action.payload && el)
      }
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
        tickets: [],
        typeFiltered: null
      }
    case СLEAR_FILTER:
      return {
        ...state,
        tickets: [],
        loading: false
      }
    case CLEAR_TYPE_FILTER:
      return {
      ...state,
      typeFiltered: null
    }
    default:
      return state;
  }
};