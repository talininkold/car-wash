import React, { useReducer } from 'react';
import FilterContext from '../Context/filterContext'
import FilterReducer from '../Context/FilterReducer'
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
  SET_ERROR
} from '../Context/types';

const FilterState = props => {
  const initialState = {
    loading: false,
    searchType: 'ticket',
    tickets: [],
    typeFiltered: null,
    urlParam: null,
    url: null,
    error: null,
    response: null
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  const onTicketFilter = async (login, key, param, searchtype) => {
    dispatch({type: SET_LOADING, payload: true})
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&search=${searchtype}&param=${param}`);
    const data = await res.json();
    dispatch({type: FILTER_TICKETS, payload: data.arr})
    console.log(data)
  }

  const clearFilter = () => {
    dispatch({type: СLEAR_FILTER})
  }
  const clearTypeFilter = () => {
    dispatch({type: CLEAR_TYPE_FILTER})
  }

  const typeFilter = (type) => {
    dispatch({type: TYPE_FILTER, payload: type})
  }

  const setSearchType = (type) => {
    dispatch({type: SET_SEARCH_TYPE, payload: type})
  }

  const getUrlParam = (arr) => {
    dispatch({type: SET_IMG_URL, payload: arr})
    console.log('get photo')
  }

  const getImg = async (login, key, param) => {
    dispatch({type: SET_LOADING, payload: true})
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=getphotourl&cod=${param}`);
    const data = await res.json();
    dispatch({type: GET_IMG, payload: data.photoURL})
    console.log(data.photoURL)
  }

  const clearImg = () => {
    dispatch({type: CLEAR_IMG})
  }

  const onCheck = async (login, key, code, value) => {
      dispatch({type: SET_LOADING, payload: true})
      const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=replacenumber&cod=${code}&param=${value}`);
      const data = await res.json();
      if (data.status === 'Error') {
        dispatch({type: SET_ERROR, payload: 'Введен неверный код'})
      } else {
        const {number, replaceNumber} = data;
        dispatch({type: ON_CHECK, payload: {number, replaceNumber}})
        const isTrue = window.confirm(`Вы хотите заменить\n ${number} на ${replaceNumber} ?`)
        if (isTrue) {
          const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&request=replaceset&cod=${code}&param=${value}`);
          const data = await res.json();
          if (data.status === true) {
            alert('Номер успешно обновлен.')
            dispatch({type: SET_LOADING, payload: false})
          } else {
            dispatch({type: SET_ERROR, payload: 'Ошибка сервера, попробуйте позже'})
          }
        } else {
          dispatch({type: SET_LOADING, payload: false})
          alert('Отмена')
        }   
      }
  }

  return (
    <FilterContext.Provider
      value={{
        loading: state.loading,
        alert: state.alert,
        searchType: state.searchType,
        tickets: state.tickets,
        typeFiltered: state.typeFiltered,
        urlParam: state.urlParam,
        url: state.url,
        error: state.error,
        response: state.response,
        onTicketFilter,
        clearFilter,
        typeFilter,
        setSearchType,
        clearTypeFilter,
        getUrlParam,
        getImg,
        clearImg,
        onCheck
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;