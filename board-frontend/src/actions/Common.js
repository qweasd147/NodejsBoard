import {
    DATA_LOADING
    , DATA_LOADING_COMPLETE
} from './ActionTypes';
import { Materialize } from '../utils/thirdPartyLib';

export function dataLoading(){
    return {
        type : DATA_LOADING
    };
}

export function dataLoadingComplete(){
    return {
        type : DATA_LOADING_COMPLETE
    };
}

export function successHandler(msg, isDisplay, action){
    if(isDisplay)
        Materialize.toast(msg || '처리 완료.', 2000);

    return action;
}

export function waitHandler(msg, isDisplay, action){
    if(isDisplay)
        Materialize.toast(msg || '요청중', 2000);

    return action;
}

export function failHandler(msg, isDisplay, action){
    if(isDisplay)
        Materialize.toast(msg || '오류가 발생 하였습니다.', 2000);

    return action;
}

export function getErrMsg(error){
    if(error.response && error.response.data && error.response.data.message)
        return error.response.data.message;
    else
        return error.message;
}