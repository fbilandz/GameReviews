// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';
import { actions, reducer } from './redux';

const screens = extension.screens;

export {
    screens,
    actions,
    reducer,
};
