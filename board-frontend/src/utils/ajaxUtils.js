import axios from 'axios';

//const HOST_NAME = process.env.REACT_APP_SERVER_HOST || "";
const HOST_NAME = "";

const METHOD = {
    get : 'get'
    , post : 'post'
    , put : 'put'
    , delete : 'delete'
}

//첫번째 매개변수는 요청 URL 고정, 그외 나머지 값은 array로 만들어서 ajax로 넘겨준다.
export function requestGET(apiURL){
    const params = Array.prototype.slice.call(arguments,1);

    return requestAjax(apiURL, METHOD.get, params);
}

export function requestPOST(apiURL){
    const params = Array.prototype.slice.call(arguments,1)
    
    return requestAjax(apiURL, METHOD.post, params);
}

export function requestPUT(apiURL){
    const params = Array.prototype.slice.call(arguments,1)
    
    return requestAjax(apiURL, METHOD.put, params);
}

export function requestDELETE(apiURL){
    const params = Array.prototype.slice.call(arguments,1)
    
    return requestAjax(apiURL, METHOD.delete, params);
}

//요청 한 function을 구해서 ajax 호출 시 맞는 매개변수값을 넘겨준다.
//axios 에선 첫번째 매개변수를 url로 고정함.
function requestAjax(apiURL, method, params){

    apiURL = HOST_NAME+apiURL;

    let callFn;

    switch(method){
        case METHOD.get : callFn = axios.get;break;
        case METHOD.post : callFn = axios.post;break;
        case METHOD.put : callFn = axios.put;break;
        case METHOD.delete : callFn = axios.delete;break;
        default : callFn = axios.get;break;
    }

    return callFn.apply(this, [apiURL].concat(params));
}

export { METHOD }


