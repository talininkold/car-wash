import { GET_NEWS, SET_ERROR, SET_FETCH_LOADING } from '../types'

export const FetchReducer = (state, action) => {
    switch (action.type) {
        case SET_FETCH_LOADING:
            return {
                ...state, 
                loading: action.payload
            }
        case SET_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_NEWS: 
            return {
                ...state,
                loading: false,
                news: action.payload
            }
        default:
            return state
    }
}