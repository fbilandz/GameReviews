import { combineReducers } from 'redux';
import {
    ADD_REVIEWS,
    REVIEWS_LOADING,
    REVIEWS_LOADED,
    REIVEWS_FETCH_ERROR
} from './types';

const reviews = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEWS:
            return {
                error : false,
                ...state,
                ...action.payload,
            };
        case REVIEWS_LOADING:
            return {
                ...state,
                isLoading : true,
            };
        case REVIEWS_LOADED:
            return {
                error : false,
                isLoading : false,
                ...action.payload,
            };
        case REIVEWS_FETCH_ERROR: 
            return {
                error : true,
                isLoading : false,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default combineReducers({ reviews });