// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

import ReviewLayoutScreen from './screens/ReviewLayoutScreen'
// themes imports


export const screens = {
  ReviewLayoutScreen,
};

export const themes = {

};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
