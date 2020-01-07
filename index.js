const express=require('express');
var createError = require('http-errors');
const path=require('path');
var cookieParser = require('cookie-parser');
var expresshbs=require('express-handlebars');
var hbs=require('hbs');
// const authUtils = require('./utils/auth');

//passport starts
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
var session = require("express-session");
const flash = require('connect-flash');

var homeconroller=require('./controller/home.js');
var categoryconroller=require('./controller/category.js');
// var authcontroller=require('./controller/auth.js')
// var userscontroller=require('./controller/category.js/index.js')

const app=express();

var mongojs = require('mongojs');
// app.locals.db = mongojs("mongodb+srv://amol:amol@cluster0-0wbxn.mongodb.net/test?retryWrites=true&w=majority");
app.locals.db = mongojs('localhost/mytestdb');

app.set('views',path.join(__dirname,'/views'));
app.engine('hbs',expresshbs({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname+"/views/layouts/"}));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('if_eq', function(a, b, opts) {
  if(a == b)
      return opts.fn(this);
  else
      return opts.inverse(this);
});
const bodyparser=require('body-parser');
app.use(bodyparser.json())
app.use(cookieParser());
app.use(express.static("public"));
// app.use(require('cookie-parser')());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {
//     res.locals.loggedIn = req.isAuthenticated();
//     next();
//   });


app.use('/',homeconroller);
// app.use('/auth',authcontroller);
app.use('/category',categoryconroller);
// app.use('/users',userscontroller);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.status(404);
  res.send('404: File Not Found');
});
const port=process.env.PORT || 5500;
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});

