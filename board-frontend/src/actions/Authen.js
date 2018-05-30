import {
    SET_IS_LOGIN
    , LOGOUT_WAIT
    , LOGOUT_SUCCESS
    , LOGOUT_FAIL
} from './ActionTypes';
import { dataLoading, dataLoadingComplete } from './Common';

import { requestGET } from '../utils/ajaxUtils';
import cookieUtils from '../utils/cookieUtils';
//TODO : action에서 다른 작업(toast) 하는게 맞는건가 고민중
import { Materialize } from '../utils/thirdPartyLib';

const LOG_OUT_API = "/api/authen/logout/";
const USER_INFO = "/api/authen/userInfo";

/**
 * 쿠키 값으로 로그인 상태여부 판별
 * @param {*} boolean 
 */
export function setIsLogin(boolean){

    const loginProvider = cookieUtils.getCookie('loginProvider');

    let _isLogin;
    
    if(loginProvider)   _isLogin = true;
    else                _isLogin = false;

    //TODO : 현재 로그인 처리를 적용하지 않아서, 임시로 항상 로그인 상태로 처리
    _isLogin = true;

    return {
        type:SET_IS_LOGIN
        , isLogin : _isLogin
    }
}

/**
 * 로그아웃 처리
 */
export function logOutRequest() {
    return (dispatch) => {

        dispatch(dataLoading());
        dispatch(logOutWait());
        
        return requestGET(LOG_OUT_API)
        .then((response) => {
            dispatch(logOutSuccess(response.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(logOutFail(error.message));
            dispatch(dataLoadingComplete());
        });
    };
}

export function logOutWait() {
    return {
        type: LOGOUT_WAIT
    };
}

export function logOutSuccess(data) {
    Materialize.toast("로그아웃 성공", 2000);
    return {
        type: LOGOUT_SUCCESS
    };
}

export function logOutFail(msg) {
    Materialize.toast(msg || '오류가 발생 하였습니다.', 2000);
    return {
        type: LOGOUT_FAIL
        , msg
    };
}

//로그인 사용자 보기. 나중에 없앨꺼
export function userInfoRequest() {
    return (dispatch) => {

        dispatch(dataLoading());
        
        return requestGET(USER_INFO)
        .then((response) => {
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            Materialize.toast(error.message || '오류가 발생 하였습니다.', 2000);

            dispatch(dataLoadingComplete());
        });
    };
}