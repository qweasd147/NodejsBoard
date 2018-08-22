import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    isLogin: false
    , urlRequest : {
        status : types.INITAL_APP
        , dataMap : {}
        , msg : 'INIT'
    }
};


export default function board(authenState, action){
    if(typeof authenState === "undefined") {
        authenState = initialState;
    }
    switch(action.type) {
        case types.SET_IS_LOGIN:
            return update(authenState, {
                isLogin: { $set: action.isLogin }
            });

            case types.LIST_THIRDPARTY_URL_WAIT:
            return update(authenState, {
                urlRequest : {
                    status : {$set:types.LIST_THIRDPARTY_URL_WAIT}
                }
            });
        case types.LIST_THIRDPARTY_URL_SUCCESS:
            return update(authenState, {
                urlRequest: {
                    dataMap: { $set: action.data.dataMap }
                    , status : {$set:types.LIST_THIRDPARTY_URL_SUCCESS}
                }, 
            });
        case types.LIST_THIRDPARTY_URL_FAIL:
            return update(authenState, {
                urlRequest : {
                    status : {$set:types.LIST_THIRDPARTY_URL_FAIL}
                    , msg : { $set: action.msg }
                }
            });

        default:
            return authenState;
    }
};