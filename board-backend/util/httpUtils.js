module.exports.getRemoteAddr = function (req){
    let ipAddress;


    /*
    if(!!req.hasOwnProperty('sessionID')){
        ipAddress = req.headers['x-forwarded-for'];
    } else{
        if(!ipAddress){
            var forwardedIpsStr = req.header('x-forwarded-for');

            if(forwardedIpsStr){
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if(!ipAddress){
                ipAddress = req.connection.remoteAddress;
            }
        }
    }
    */
    ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    console.log(ipAddress);
    return ipAddress;
}