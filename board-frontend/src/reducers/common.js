import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const status = {
    isLoading: false
};


export default function common(state, action){
    if(typeof state === "undefined") {
        state = status;
    }
    switch(action.type) {
        case types.DATA_LOADING:
            return update(status, {
                isLoading: { $set: true }
                
            });
        case types.DATA_LOADING_COMPLETE:
            return update(status, {
                isLoading: { $set: false }
                
            });
        default:
    }

    return state;
};