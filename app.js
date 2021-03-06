const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const taskrouter = require('./routes/tasks');
const index = require('./routes/index');

const sender = require('./middleware/sender-middleware');
const logger = require('./middleware/logger-middleware');
const db = require('./middleware/database-middleware');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(sender.addSenderUtility);
app.use(logger.addLogger);
// app.use(db.addDatabaseConnection);

app.use('/', index);
app.use('/users', usersRouter);
app.use('/tasks', taskrouter);

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
  // res.render('error');
});

module.exports = app;
