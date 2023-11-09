// routes/kakaologin.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// 카카오 로그인 라우트
router.get('/', passport.authenticate('kakao'));

// 카카오 로그인 콜백 라우트
router.get('/callback', 
  passport.authenticate('kakao', {
    failureRedirect: '/login',
    successRedirect: '/'
  }),
  (req, res) => {
    // 필요한 경우 추가적인 처리를 여기에 작성
  }
);

module.exports = router;
