import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    isLogin: false
};


export default function board(state, action){
    if(typeof state === "undefined") {
        state = initialState;
    }
    switch(action.type) {
        case types.SET_IS_LOGIN:
            return update(state, {
                isLogin: { $set: action.isLogin }
            });

        default:
            return state;
    }
};