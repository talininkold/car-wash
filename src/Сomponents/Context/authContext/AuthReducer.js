import {
  LOGIN_USER,
  LOADING,
  SET_ALERT,
  REMOVE_ALERT,
  LOGIN_ERROR,
  SET_KEY,
  SET_USER,
  SET_LOGIN
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ALERT:
      return {
        ...state,
        loading: false,
        alert: action.payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null
      }
    case LOGIN_USER:
      localStorage.setItem('user', action.payload.user)
      localStorage.setItem('param', action.payload.key)
      localStorage.setItem('login', action.payload.login)
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case LOGIN_ERROR:
      localStorage.removeItem('user')
      localStorage.removeItem('param')
      localStorage.removeItem('login')
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: '',
        key: '',
        login: ''
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
        isAuthenticated: true
      }
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
        isAuthenticated: true
      }
    default:
      return state;
  }
};