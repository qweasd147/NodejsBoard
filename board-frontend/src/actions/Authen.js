import {
    SET_IS_LOGIN
    , LOGOUT_WAIT
    , LOGOUT_SUCCESS
    , LOGOUT_FAIL
    , LIST_THIRDPARTY_URL_WAIT
    , LIST_THIRDPARTY_URL_SUCCESS
    , LIST_THIRDPARTY_URL_FAIL
} from './ActionTypes';
import { dataLoading, dataLoadingComplete
    , waitHandler, successHandler, failHandler, getErrMsg } from './Common';

import { requestGET, requestPOST } from '../utils/ajaxUtils';
import cookieUtils from '../utils/cookieUtils';
//TODO : action에서 다른 작업(toast) 하는게 맞는건가 고민중
import { Materialize } from '../utils/thirdPartyLib';

const LOG_OUT_API = "/api/authen/logout/";
const USER_INFO = "/api/authen/userInfo";
const LOGIN_THIRD_PARTY_URL_API = "/api/authen/loginURL";       //third party 로그인 url 목록 요청

const LOGIN_COOKIE_KEY = "Authorization";   //토큰을 담을 쿠키이름

/**
 * 쿠키 값으로 로그인 상태여부 판별
 * @param {*} boolean 
 */
export function setIsLogin(boolean){

    const loginProvider = cookieUtils.getCookie(LOGIN_COOKIE_KEY);

    let _isLogin;
    
    if(loginProvider)   _isLogin = true;
    else                _isLogin = false;

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
        })
        .then(() => {
            //정상 처리 or 에러와 상관없이 쿠키를 삭제한다.
            cookieUtils.deleteCookie(LOGIN_COOKIE_KEY);
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

export function thirdPartyUrlRequest() {
    return (dispatch) => {

        dispatch(dataLoading());
        dispatch(thirdPartyWait());
        
        return requestGET(LOGIN_THIRD_PARTY_URL_API)
        .then((response) => {
            dispatch(thirdPartySuccess(response.data.data));
            dispatch(dataLoadingComplete());
        }).catch((error) => {
            dispatch(thirdPartyFail(getErrMsg(error)));
            dispatch(dataLoadingComplete());
        });
    };
}

function thirdPartyWait() {
    return waitHandler(null, false, {
        type: LIST_THIRDPARTY_URL_WAIT
    });
}

function thirdPartySuccess(data) {
    return successHandler(null, false, {
        type: LIST_THIRDPARTY_URL_SUCCESS
        , data
    });
}

function thirdPartyFail(msg) {
    return failHandler(msg, true, {
        type: LIST_THIRDPARTY_URL_FAIL
        , msg
    });
}