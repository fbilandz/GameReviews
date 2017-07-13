import { combineReducers } from 'redux';

import {
    ADD_REVIEWS,
    REVIEWS_LOADING,
    REVIEWS_LOADED,
    REIVEWS_FETCH_ERROR
} from './types';

import { preventStateRehydration } from '@shoutem/core/preventStateRehydration';

const reviews = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEWS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

const loader = (state = {}, action) => {
    switch (action.type) {
        case REVIEWS_LOADING:
            return {
                
                isLoading: true,
            };
        case REVIEWS_LOADED:
            return {
                
                error: false,
                isLoading: false,

            };
        case REIVEWS_FETCH_ERROR:
            return {
                
                error: true,
                isLoading: false,

            };
        default:
            return state;
    }
}

export default preventStateRehydration(combineReducers({ reviews, loader }));
