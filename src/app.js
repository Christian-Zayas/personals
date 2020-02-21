'use strict'
const express = require('express');
const passport = require('passport');
const exphbs  = require('express-handlebars');
const _method = require('method-override');
const session =  require('express-session');
const flash =  require('connect-flash');
const MongoStore = require('connect-mongo')(session)
const path = require('path');
const uuid = require('uuid').v4();
const app = express();
require('./dba/dba')
require('./passport/passport');
// Setting
app.set('port', process.env.PORT || 4000);
app.set('views' , path.join(__dirname , 'views'));
app.engine('.hbs' , exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') , 'layouts'),
    partialsDir: path.join(app.get('views') , 'partials'),
    extname: '.hbs'
}));
app.set('view engine' , '.hbs');

// Middleware
app.use(_method('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(session({
    secret: "17e1c510-4f08-453b-9b61-afd66e54a8fb",
    resave: true,
    saveUninitialized: true,
    cookie: { expires: 24 * 60 * 60 * 1000 , maxAge: 24 * 60 * 60 * 1000 },
    store : new MongoStore({
        url: process.env.MONGODB_URL,
        ttl: 24 * 60 * 60
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req , res , next) => {
    res.locals.success_mgs =  req.flash('success_mgs');
    res.locals.error_mgs =  req.flash('error_mgs');
    res.locals.error =  req.flash('error');
    res.locals.user =  req.user || null;
    next();
})
// public o assets 
app.use(express.static(path.join(__dirname , 'assets')));
app.use(express.static(path.join(__dirname , 'assets/js')));
app.use(express.static(path.join(__dirname , 'upload')))
// router

app.use('/notes' , require('./route/route'));
app.get('**' , ( req , res  , next) => {
    res.redirect('/notes');
    next();
});

module.exports = { app };