// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

// screens imports
import Games from './screens/Games';
import ArticleDetailsScreen from './screens/ArticleDetailsScreen'
// themes imports


export const screens = {
  Games,
  ArticleDetailsScreen
};

export const themes = {

};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
