// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';

const screens = extension.screens;


import reducer from './reducer'
export {
    reducer,
    screens
}
