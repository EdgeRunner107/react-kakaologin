// tokenMiddleware.js

// 토큰 갱신 로직이 필요한 경우 이 함수를 구현합니다.
const checkAndRefreshToken = (req) => {
    // 토큰이 유효한지 확인하고, 만료되었으면 갱신
  };
  
  module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
      await checkAndRefreshToken(req);
    }
    next();
  };
  
