// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

// screens imports
import ReviewLayoutScreen from './screens/ReviewLayoutScreen';
import AddAReviewScreen from './screens/AddAReviewScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import MyReviews from './screens/MyReviews';

// themes imports


export const screens = {
  ReviewLayoutScreen,
  AddAReviewScreen,
  ReviewListScreen,
  MyReviews,
};

export const themes = {

};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
