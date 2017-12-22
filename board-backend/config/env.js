const envData = {
    'dev' : {
        'successRedirect' : "http://localhost:3000/"
    }
    , 'production' : {
        'successRedirect' : "/"
    }
}

module.exports=(function(env){
    
    return envData[env] || envData['dev'];

})(process.env.NODE_ENV || "dev");