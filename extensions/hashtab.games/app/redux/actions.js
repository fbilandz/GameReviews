import {
    ADD_REVIEWS,
    REVIEWS_LOADING,
    REVIEWS_LOADED,
    REIVEWS_FETCH_ERROR
} from './types';

export function addReviews(reviews, id) {
    console.log(reviews, id);
    return {
        type: ADD_REVIEWS,
        payload: reviews,
        id: id,
    };
}

export function addAReview(review, name, id) {
    return {
        type: ADD_REVIEWS,
        payload: { [name]: review },
        id: id
    }
}
export function reviewsLoading() {
    return {
        type: REVIEWS_LOADING,
    }
}

export function reviewsLoaded() {
    return {
        type: REVIEWS_LOADED,

    }
}

export function reviewsFetchError() {
    return {
        type: REIVEWS_FETCH_ERROR,
    }
}
