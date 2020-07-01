import React, { useReducer } from 'react';
import FilterContext from '../Context/filterContext'
import FilterReducer from '../Context/FilterReducer'
import {
  SET_LOADING,
  FILTER_TICKETS,
  СLEAR_FILTER
} from '../Context/types';

const FilterState = props => {
  const initialState = {
    loading: false,
    tickets: []
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  const onTicketFilter = async (login, key, param) => {
    dispatch({type: SET_LOADING, payload: true})
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?user=${login}&key=${key}&search=ticket&param=${param}`);
    const data = await res.json();
    dispatch({type: FILTER_TICKETS, payload: data.arr})
    console.log(data)
  }

  const clearFilter = () => {
    dispatch({type: СLEAR_FILTER})
  }

  return (
    <FilterContext.Provider
      value={{
        loading: state.loading,
        alert: state.alert,
        tickets: state.tickets,
        onTicketFilter,
        clearFilter
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;