
const { request, response } = require('express');
const Model = require('../components/user/model');

async function isAuthenticate(req = request, res = response, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}
async function isDesAuthenticate(req = request, res = response, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    isAuthenticate,
    isDesAuthenticate
}