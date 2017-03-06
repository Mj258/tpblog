var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer')
var methodOverride = require('method-override');
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var template = require('art-template');

var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');

// app.use(multer({ dest: './public/images'}))
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

// app.use(bodyParser.json({limit: "50mb"}));
// app.use(express.methodOverride());
// app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
// app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

/*跨域支持*/
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://test.coolpoint.cc");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	res.header("Access-Control-Allow-Credentials", 'true');

	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

// var listener = app.listen( '3000' , function() {
// 	console.log( 'Express server started. Content: 3000' );
// });
http.createServer(app).listen("3000", function(){
	console.log('Express server listening on port: 3000');
});
module.exports = app;
