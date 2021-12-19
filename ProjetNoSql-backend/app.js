const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const config = require('./config/database')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const announcementRouter = require('./routes/announcement');
const visitRouter = require('./routes/visit');
const dealRouter = require('./routes/deal');
const governorateRouter = require('./routes/governorate');
const cityRouter = require('./routes/city');


const mongoose = require('mongoose')
//connecting to mongo database:
mongoose.connect(config.database);
/*// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+'mongodb://localhost:27017/ProjetNoSql_DB');
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});
*/
const app = express();

// CORS Middleware
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//ou on traite les endpoints:
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/announcements',announcementRouter);
app.use('/visits',visitRouter);
app.use('/deals',dealRouter);
app.use('/governorates',governorateRouter);
app.use('/cities',cityRouter);


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

module.exports = app;
