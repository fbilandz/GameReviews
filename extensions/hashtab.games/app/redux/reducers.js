import { combineReducers } from 'redux';
import { ADD_REVIEWS } from './types';

const reviews = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEWS:
            return {
                ...state,
                ...action.payload,
            };
        default: 
            return state;
    }
}



export default combineReducers({reviews});