import React, { useReducer } from 'react'
import { GET_NEWS, SET_ERROR, SET_FETCH_LOADING } from '../types'
import fetchContext from './fetchContext'
import { FetchReducer } from './FetchReducer'

const FetchState = ({children}) => {

    const initialState = {
        loading: false,
        error: null,
        news: []
    }

    const [state, dispatch] = useReducer(FetchReducer, initialState)

    const getNews = async () => {
        try {
            dispatch({ type: SET_FETCH_LOADING, payload: true})
            const res = await fetch(`https://script.google.com/macros/s/AKfycbxIqFt9DzdnB085apVHNbLC6jiPqClksLWhUK1PtpbyCdDsGLRz/exec?request=newsList`)
            const data = await res.json()
            dispatch({ type: GET_NEWS, payload: data.newsList })
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message})
        }
    }

    return (
        <fetchContext.Provider value={{
            loading: state.loading,
            error: state.error,
            news: state.news,
            getNews
        }}>
            {children}
        </fetchContext.Provider>
    )
}


export default FetchState
