import axios from 'axios';

// const HOST_NAME = "http://localhost:8080"
const HOST_NAME = process.env.REACT_APP_SERVER_HOST || "";

const METHOD = {
    get : 'get'
    , post : 'post'
    , put : 'put'
    , delete : 'delete'
}

export function requestGET(apiURL, arg1, arg2, arg3){
    const params = Array.prototype.slice.call(arguments,1);

    return requestAjax(apiURL, METHOD.get, params);
}

export function requestPOST(apiURL, arg1, arg2, arg3){
    const params = Array.prototype.slice.call(arguments,1)
    
    return requestAjax(apiURL, METHOD.post, params);
}

export function requestPUT(apiURL, arg1, arg2, arg3){
    const params = Array.prototype.slice.call(arguments,1)
    
    return requestAjax(apiURL, METHOD.put, params);
}


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


