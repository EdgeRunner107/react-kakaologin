var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var usersRouter = require('./routes/users');
var app = express();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;




require('dotenv').config();
const session = require('express-session');

const KakaoStrategy = require('passport-kakao').Strategy;
const tokenMiddleware = require('./tokenMiddleware');
const kakaoLoginRouter = require('./routes/kakaologin')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/crawler', require('./routes/crawler'));// 방경석 크라울러 라우트 추가 



// express-session 설정
app.use(session({
  secret: 1947,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Passport 세션 설정
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID, // .env 파일이나 환경변수에서 가져옴
  callbackURL: '/kakaologin/callback',
},
async (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, refreshToken, profile, done)
  // 사용자 찾기 또는 생성 로직
  // 예: const user = await User.findOrCreate({ kakaoId: profile.id });
  // done(null, user);


}
));
app.use(tokenMiddleware);
app.use('/kakaologin', kakaoLoginRouter);


const indexRouter = require('./routes/index');
const loginRoute = require('./routes/login');

// 라우터 사용
app.use('/', indexRouter);
app.use('/auth', loginRoute);














// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cors());

// 또는 특정 출처에 대해서만 허용하고자 할 경우
app.use(cors({
  origin: 'http://localhost:3000' // React 앱의 호스트
}));

var db = require('./db');
db.connect();



module.exports = app;
