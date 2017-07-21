// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

// screens imports
import ReviewLayoutScreen from './screens/ReviewLayoutScreen';
import AddAReviewScreen from './screens/AddAReviewScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import MyReviews from './screens/MyReviews';
import FullReviewScreen from './screens/FullReviewScreen';
import RateScreen from './screens/RateScreen';
// themes imports


export const screens = {
  ReviewLayoutScreen,
  AddAReviewScreen,
  ReviewListScreen,
  MyReviews,
  FullReviewScreen,
  RateScreen,
};

export const themes = {

};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}

export function getUsers() {
  return fetch(db + '/users.json')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      //users are saved in responseJson.users
      return responseJson.users;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const auth = "?auth=JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk"
export const db = "https://gamereviewsapp.firebaseio.com";

export function getUsersById(id) {
  return fetch(`$(db)/users/$(id).json$(auth)`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      //users are saved in responseJson.users
      return responseJson.users;
    })
    .catch((error) => {
      console.error(error);
    });
}