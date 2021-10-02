const { request, response } = require('express');
const { matchPassword } = require('../helpers/encryptPasswork');
const Model = require('../components/user/model');

async function comparePassword(req = request, res = response, next) {

    const foundUser = await Model.findOne({ username: req.body.username });
    const opt = await matchPassword(req.body.password,foundUser.password);
    if(!foundUser || !opt){
        return res.status(400).json({
            err:`Username or Password Incorrect`,
        });
    };
    req.user = foundUser;
    next();
}

module.exports = {
    comparePassword
}