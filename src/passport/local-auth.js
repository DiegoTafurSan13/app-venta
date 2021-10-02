const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const store = require('../components/user/store');
const Model = require('../components/user/model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await Model.findById(id);
    done(null, user);
});
/*passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    store.signup(req.body)
        .then((user) => done(null, user));
}));*/

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    store.signin(username)
        .then((user) => done(null, user));
}));