import React, { useReducer } from 'react';
import FilterContext from '../Context/filterContext'
import FilterReducer from '../Context/FilterReducer'
import {
  SET_LOADING,
  FILTER_TICKETS,
  СLEAR_FILTER,
  TYPE_FILTER,
  CLEAR_TYPE_FILTER,
  SET_SEARCH_TYPE
} from '../Context/types';

const FilterState = props => {
  const initialState = {
    loading: false,
    searchType: 'ticket',
    tickets: [],
    typeFiltered: null
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

  return (
    <FilterContext.Provider
      value={{
        loading: state.loading,
        alert: state.alert,
        searchType: state.searchType,
        tickets: state.tickets,
        typeFiltered: state.typeFiltered,
        onTicketFilter,
        clearFilter,
        typeFilter,
        setSearchType,
        clearTypeFilter
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;