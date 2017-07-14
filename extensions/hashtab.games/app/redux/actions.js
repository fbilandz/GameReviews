import {
    ADD_REVIEWS,
    ADD_REVIEW,
    REVIEWS_LOADING,
    REVIEWS_LOADED,
    REIVEWS_FETCH_ERROR,
    MAP_REVIEWS,
    MAP_REVIEW,
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
        type: ADD_REVIEW,
        payload: review,
        name: name,
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

export function mapReviews(payload, id) {
    return {
        type: MAP_REVIEWS,
        payload,
        id,
    };
}
export function mapReview(review, name, id) {
    return {
        type: MAP_REVIEW,
        payload: review,
        name: name,
        id: id
    }
}