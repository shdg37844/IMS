require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
const cors = require('./middlewares/cors.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var nunjucks = require('nunjucks');
var app = express();

var filters = require('./filters/index');

// Nunjucks配置
app.set('view engine', 'tpl');
var env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

// 添加时间格式化过滤器到Nunjucks
env.addFilter('formatDate', filters.formatDate);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors.allowAll);

filters.loginFilter(app);

app.use('/', indexRouter);
app.use('/api', apiRouter);


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
