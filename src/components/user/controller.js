const { request } = require('express');
const store = require('./store');
const { message } = require('../../helpers/response');

const controllerGet = async (req = request, res, next) => {
    const query = req.query;
    store.get(query)
        .then(data => message(req, res, data));
};

const controllerProfile = async (req = request, res, next) => {
    const username = req.user.username;
    store.getProfile(username)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res, next) => {
    const user = req.body;
    store.signup(user)
        .then(data => message(req, res, data));
};

const controllerLogout = async (req = request, res, next) => {
    req.logOut();
    res.status(200).json({
        msg: `logout complete`
    });
};

const controllerPatch = async (req = request, res, next) => {
    const id = req.params.id;
    const user = req.body;
    store.patch(id, user)
        .then(data => message(req, res, data));
};

const controllerDelete = async (req = request, res, next) => {
    const id = req.params.id;
    store.delete(id)
        .then(data => message(req, res, data));
};


module.exports = {
    controllerGet,
    controllerPost,
    controllerDelete,
    controllerLogout,
    controllerPatch,
    controllerProfile
}