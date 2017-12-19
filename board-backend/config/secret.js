module.exports={
    'mongoDB' : {
        'DBUser' : 'xxxx',
        'DBPassword' : 'xxxx',
        'TB' : 'xxxx',
        'connectURL' : 'mongodb://aaaa:bbbb:cccc/dddd'
    }
    , 'passport' : {
        'naver' : {
            'clientID' : 'xxxx',
            'clientSecret' : 'xxxx',
            'callbackURL' : '/api/authen/login/naver/callback'
        },
        'google' : {
            'clientID': 'xxxx',
            'clientSecret': 'xxxx',
            'callbackURL': '/api/authen/login/google/callback',
        },
        'kakao' : {
            'clientID' : 'xxxx',
            'callbackURL' : '/api/authen/login/kakao/callback'
        }
    }
}