const loginInfo = require('../../config/secret.js');
const env = require('../../config/env');

const passport = require('passport');

const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const successRedirect = env.successRedirect;

/**
 * 로그인 성공시 사용자 정보를 Session에 저장한다
 */
passport.serializeUser((user, done)=>{
  done(null, user)
  return;
}); 
 
 
/**
 * 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
 */
passport.deserializeUser((user, done)=>{
  done(null, user);
  return;
}); 

 
/**
 * 로그인 유저 판단 로직
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuthenticated = (req, res, next)=>{
  if(req.isAuthenticated())
    return next();
  res.redirect("/");
};

const loginByThirdparty = (data, done)=>{
  //사용자 정보를 DB에서 저장 시, 여기서 관리
  done(null,data);
  return;
}

passport.use(new KakaoStrategy({
    clientID : loginInfo.passport.kakao.clientID,
    callbackURL : loginInfo.passport.kakao.callbackURL,
    passReqToCallback : true
  },
  (req, accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    var _profile = profile._json;

    req.res.cookie('loginProvider', profile.provider);
    
    //세션에 올릴 데이터 정의
    let sessionData = {
      'userId': _profile.id,
      'nickName': _profile.properties.nickname,
      'accessToken' : accessToken,
      'provider' : profile.provider
    };

    loginByThirdparty(sessionData, done);
  }
));

passport.use(new NaverStrategy({
    clientID: loginInfo.passport.naver.clientID,
    clientSecret: loginInfo.passport.naver.clientSecret,
    callbackURL: loginInfo.passport.naver.callbackURL,
    passReqToCallback : true
  },
  (req, accessToken, refreshToken, profile, done) => {
    let _profile = profile._json;
  
    req.res.cookie('loginProvider', 'naver');
    
    let sessionData = {
      'userId': _profile.id,
      'nickName': _profile.nickname,
      'accessToken' : accessToken,
      'provider' : 'naver'
    }
    
    loginByThirdparty(sessionData, done);
  }
));

passport.use(new GoogleStrategy({
      clientID: loginInfo.passport.google.clientID,
      clientSecret: loginInfo.passport.google.clientSecret,
      callbackURL: loginInfo.passport.google.callbackURL,
      passReqToCallback : true
    },
    (req, accessToken, refreshToken, profile, done) => {
      let _profile = profile._json;
      
      req.res.cookie('loginProvider', 'google');
      
      let sessionData = {
        'userId': _profile.id,
        'nickName': _profile.displayName,
        'accessToken' : accessToken,
        'provider' : 'google'
      }
    
      loginByThirdparty(sessionData, done);
    }
));

/**
 * 카카오 로그인 요청 시
 */
exports.handleKaKaoLogin = passport.authenticate('kakao');

/**
 * 카카오 로그인(인증) 완료 후
 */
exports.handleAfterKaKaoLogin = passport.authenticate('kakao', {
  successRedirect: successRedirect,
  failureRedirect: '/login'
});

/**
 * 네이버 로그인 요청 시
 */
exports.handleNaverLogin = passport.authenticate('naver')

/**
 * 네이버 로그인(인증) 완료 후
 */
exports.handleAfterNaverLogin = passport.authenticate('naver', {
  successRedirect: successRedirect,
  failureRedirect: '/login'
});

/**
 * 구글 로그인 요청 시
 */
exports.handleGoogleLogin = passport.authenticate('google', { scope: ['email profile'] })

/**
 * 구글 로그인(인증) 완료 후
 */
exports.handleAfterGoogleLogin = passport.authenticate('google', {
  successRedirect: successRedirect,
  failureRedirect: '/login'
});

exports.logout = (req, resp) => {
  req.logout();
  resp.clearCookie('loginProvider');

  //const token = req.session.passport.accessToken;
  
  /*
  console.log(req.connection.remoteAddress);
  console.log(req.connection.remotePort);
  console.log(req.connection.localAddress);
  console.log(req.connection.localPort);

  console.log(req.get('host'));
  */
  return resp.json({
      success: true
  });
}

exports.checkUserInfoForTest = (req, resp) => {
  console.log(req.session);
  
  if(req.isAuthenticated()){
    console.log('로긴 되어있음');
  }else{
    console.log('안되어 있음');
  }

  return resp.json({
      success: true
  });
}