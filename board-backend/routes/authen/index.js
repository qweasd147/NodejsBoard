const express = require('express');
const router = express.Router();

const authenCtrl = require('./ctrl')

//kakao
router.get('/login/kakao', authenCtrl.handleKaKaoLogin);
router.get('/login/kakao/callback', authenCtrl.handleAfterKaKaoLogin);

//naver
router.get('/login/naver', authenCtrl.handleNaverLogin);
router.get('/login/naver/callback', authenCtrl.handleAfterNaverLogin);


//google
router.get('/login/google', authenCtrl.handleGoogleLogin);
router.get('/login/google/callback', authenCtrl.handleAfterGoogleLogin);



router.get('/logout', authenCtrl.logout);
router.get('/userInfo', authenCtrl.checkUserInfoForTest);

module.exports = router;