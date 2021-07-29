var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
// const session = require('express-session');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var productosRouter = require('./routes/productos');
var carritoRouter = require('./routes/carrito')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
// app.use(session( {secret: 'Aguante JS'}));
app.use(cors())

app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
// app.use((req, res, next) => {
//   if(req.cookies.usuario != undefined){
//     req.session.usuarioLogueado = req.cookies.usuario;
//   }
//   next();
// });

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
