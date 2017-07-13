import {
    ADD_REVIEWS,
    REVIEWS_LOADING,
    REVIEWS_LOADED,
    REIVEWS_FETCH_ERROR
} from './types';

export function addReviews(reviews){
    return {
        type: ADD_REVIEWS,
        payload: reviews,
    };
}

export function reviewsLoading(){
    return {
        type : REVIEWS_LOADING,
    }
}

export function reviewsLoaded(reviews){
    return {
        type : REVIEWS_LOADED,
        payload: reviews,
    }
}

export function reviewsFetchError(){
    return {
        type : REIVEWS_FETCH_ERROR,
    }
}
