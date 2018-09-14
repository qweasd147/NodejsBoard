import axios from 'axios';
import cookieUtils from './cookieUtils';

const HOST_NAME = process.env.REACT_APP_SERVER_HOST || "";
//const HOST_NAME = "";

const METHOD = {
    get : 'get'
    , post : 'post'
    , put : 'put'
    , delete : 'delete'
}

export function requestGET(apiURL, data, option={}){
    const params = [data, option];

    return requestAjax(apiURL, METHOD.get, params);
}

export function requestPOST(apiURL, data, option={}){
    const params = [data, option];
    
    return requestAjax(apiURL, METHOD.post, params);
}

export function requestPUT(apiURL, data, option={}){
    const params = [data, option];
    
    return requestAjax(apiURL, METHOD.put, params);
}

export function requestDELETE(apiURL, data, option={}){
    const params = [data, option];
    
    return requestAjax(apiURL, METHOD.delete, params);
}

//요청 한 function을 구해서 ajax 호출 시 맞는 매개변수값을 넘겨준다.
//axios 에선 첫번째 매개변수를 url로 고정함.
function requestAjax(apiURL, method, params){
    addAuthHeader(params[1]);
    apiURL = HOST_NAME+apiURL;

    let callFn;

    switch(method){
        case METHOD.get :
            callFn = axios.get;
            params = [params[1]];
            break;
        case METHOD.delete : 
            callFn = axios.delete;
            params = [params[1]];
            break;
        case METHOD.post : callFn = axios.post;break;
        case METHOD.put : callFn = axios.put;break;
        default : callFn = axios.get;break;
    }

    return callFn.apply(this, [apiURL].concat(params));
}

function addAuthHeader(option = {}){

    const authToken = cookieUtils.getCookie("Authorization");

    if(authToken){
        option.headers = option.headers || {};
        option.headers.Authorization = 'Bearer ' + authToken;
    }
}

export { METHOD }


