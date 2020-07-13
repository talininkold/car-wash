import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './AuthReducer'
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

const AuthState = props => {
  const initialState = {
    loading: false,
    alert: null,
    isAuthenticated: false,
    key: '',
    user: '',
    login: ''
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Login user
  const loginUser = async (login, pass) => {
    dispatch({type: LOADING, payload: true})
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?login=${login}&password=${pass}`)
    const data = await res.json();
    const user = data.userType[0] 
    const key = data.key[0]
    if (user === 'Bad login or passwor') {
      console.log('ошибка входа')
      setAlert('Неверные данные', 'danger')
      dispatch({type: LOGIN_ERROR})
    } else {
      if (data.login) {
        dispatch({type: LOGIN_USER, payload: {user, key, login: data.login[0]}})
        setAlert('Вы успешно вошли', 'success')
        console.log('вы успешно вошли')
      }
    }
  }

  const loadUser = () => {
    if (localStorage.user) {
      dispatch({type:SET_USER, payload: localStorage.user})
    }
    if (localStorage.param) {
      dispatch({type:SET_KEY, payload: localStorage.param})
    }
    if (localStorage.login) {
      dispatch({type:SET_LOGIN, payload: localStorage.login})
    }
  }

  const logOut = () => {
    dispatch({type: LOGIN_ERROR})
  }

  const setAlert = (message, type) => {
    dispatch({type: SET_ALERT, payload: {message, type}})
    setTimeout(() => {
      dispatch({type: REMOVE_ALERT})
    }, 3000);
  }
  
  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        alert: state.alert,
        isAuthenticated: state.isAuthenticated,
        key: state.key,
        user: state.user,
        login: state.login,
        loginUser,
        loadUser,
        logOut,
        setAlert
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;