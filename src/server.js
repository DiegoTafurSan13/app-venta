require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Router = require('./router/router');
const path = require('path');

const mongoose = require('./database/config');
const passport = require('passport');
const session = require('express-session');

//initialization
var app = express();
require('./passport/local-auth');
//seattings
app.set('port', process.env.PORT);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret:process.env.KEY_SESSION,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

//Global
app.use((req, res, next) => {
    next();
});

//Router
Router(app);
app.use('/',(req,res,next)=>{
    res.sendFile(__dirname+'/public/index.html');
})
//Connection db
mongoose.connect();
//Public
app.use(express.static(path.join(__dirname, '/public')));
//Starting

app.listen(app.get('port'), () => {
    console.log(`App runnig in http://localhost:${app.get('port')}`);
});

