let coockieUtils = {};

coockieUtils.getCookie = (key) => {
        
    let value = "; " + document.cookie;
    let parts = value.split("; " + key + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

coockieUtils.deleteCookie = (key) => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default coockieUtils;