const express = require('express');
const path = require('path');
const morgan = require('morgan');            // HTTP REQUEST LOGGER
const bodyParser = require('body-parser');   // PARSE HTML BODY
const mongoose = require('mongoose');        //mongodb 데이터 모델링 툴; MongoDB 에 있는 데이터를 Application에서 JavaScript 객체로 사용 할 수 있도록 해준다.
const session = require('express-session');
const api = require('./routes');

const cookieSession = require('cookie-session');
const flash = require('connect-flash'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors')();

const secretConf = require('./config/secret');
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(cors);            //어느 host 든 ajax 요청 허용. TODO : 나중에 특정 호스트만 처리할 수 있게 막을 수도 있음
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, './public')));

app.use(cookieSession({
  keys: ['jooo'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));

app.use(flash());
app.use(passport.initialize()); //세션구동
app.use(passport.session());    //세션 연결


/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect(secretConf.mongoDB.connectURL);

/* use session */
app.use(session({
    secret: '@#$sessionSID#@!',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', api);

/* support client-side routing */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

/* handle error. 라우터에서 throw err이 실행되면 이 코드가 실행됨*/
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});