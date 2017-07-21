import {
  ADD_REVIEWS,
  ADD_REVIEW,
  REVIEWS_LOADING,
  REVIEWS_LOADED,
  REIVEWS_FETCH_ERROR,
  MAP_REVIEWS,
  MAP_REVIEW,
  INITIAL,
  EDIT_REVIEW,
  INVERT,
} from './types';

export function addReviews(reviews, id) {
  console.log(reviews, id);
  return {
    type: ADD_REVIEWS,
    payload: reviews,
    id,
  };
}

export function initialReviews(reviews, id) {
  return {
    type: INITIAL,
    payload: reviews,
    id,
  };
}

export function addAReview(review, name, id) {
  return {
    type: ADD_REVIEW,
    payload: review,
    name,
    id,
  };
}
export function reviewsLoading() {
  return {
    type: REVIEWS_LOADING,
  };
}

export function reviewsLoaded() {
  return {
    type: REVIEWS_LOADED,
  };
}

export function reviewsFetchError() {
  return {
    type: REIVEWS_FETCH_ERROR,
  };
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
    name,
    id,
  };
}

export function editAReview(review, name, id) {
  return {
    type: EDIT_REVIEW,
    payload: review,
    name,
    id,
  };
}
