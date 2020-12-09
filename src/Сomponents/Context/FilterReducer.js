import {
  SET_LOADING,
  FILTER_TICKETS,
  СLEAR_FILTER,
  TYPE_FILTER,
  CLEAR_TYPE_FILTER,
  SET_SEARCH_TYPE,
  SET_IMG_URL,
  GET_IMG,
  CLEAR_IMG,
  ON_CHECK,
  SET_ERROR,
  GET_LOGS,
  LOGS_FILTER,
  RESET_FILTER,
  GET_ARCHIVE,
  SET_ARCHIVE_TYPE,
  CLEAR_ARCHIVE,
  SET_DATE,
  GET_FINES,
  RESET_FINES,
  GET_COLLATIONS,
  SET_FINE_TYPE,
  GET_FILES,
  GET_STATS,
  // REFRESH_LOGS
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case FILTER_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        typeFiltered: null,
        loading: false,
      };
    case TYPE_FILTER:
      return {
        ...state,
        typeFiltered: state.tickets.filter(
          (el) => el[11] === action.payload && el
        ),
      };
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
        tickets: [],
        typeFiltered: null,
      };
    case SET_IMG_URL:
      return {
        ...state,
        urlParam: action.payload,
      };
    case GET_IMG:
      return {
        ...state,
        url: action.payload,
        loading: false,
      };
    case CLEAR_IMG:
      return {
        ...state,
        url: null,
        urlParam: null,
      };
    case СLEAR_FILTER:
      return {
        ...state,
        tickets: [],
        typeFiltered: null,
        loading: false,
      };
    case CLEAR_TYPE_FILTER:
      return {
        ...state,
        typeFiltered: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ON_CHECK:
      return {
        ...state,
        response: action.payload,
      };
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
        logsFiltered: null,
      };
    case LOGS_FILTER:
      return {
        ...state,
        logsFiltered: state.logs.filter((item) => item[1] === action.payload),
      };
    case RESET_FILTER:
      return {
        ...state,
        logsFiltered: null,
      };
    case GET_ARCHIVE:
      return {
        ...state,
        archive: action.payload,
      };
    case GET_STATS:
      return {
        ...state,
        stat: action.payload,
      };
    case SET_ARCHIVE_TYPE:
      return {
        ...state,
        archiveType: action.payload,
      };
    case CLEAR_ARCHIVE:
      return {
        ...state,
        archive: null,
        stat: null,
        archiveType: ""
      };
    case SET_FINE_TYPE:
      return {
        ...state,
        finesType: action.payload,
      };
    case GET_FINES:
      return {
        ...state,
        fines: action.payload,
      };
    case RESET_FINES:
      return {
        ...state,
        fines: [],
      };
    case SET_DATE:
      const { date, param } = action.payload;
      return {
        ...state,
        [date]: param,
      };
    case GET_COLLATIONS:
      const { headers, cards } = action.payload;
      return {
        ...state,
        headers: headers,
        cards: cards,
      };
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    default:
      return state;
  }
};
