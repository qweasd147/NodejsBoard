let coockieUtils = {};

coockieUtils.getCookie = (key) => {
        
    let value = "; " + document.cookie;
    let parts = value.split("; " + key + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export default coockieUtils;