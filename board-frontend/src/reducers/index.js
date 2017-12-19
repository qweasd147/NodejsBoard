import board from './board';
import authen from './authen';
import common from './common';

import { combineReducers } from 'redux';

export default combineReducers({
    board, authen, common
});
