import { ADD_REVIEWS } from './types';

export function addReviews(reviews){
    return {
        type: ADD_REVIEWS,
        payload: reviews,
    };
}