import { combineReducers } from 'redux';
import { ADD_REVIEWS } from './types';
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



export default preventStateRehydration(combineReducers({ reviews }));