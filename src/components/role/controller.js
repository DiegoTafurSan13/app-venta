const { request } = require('express');
const store = require('./store');
const { message } = require('../../helpers/response');

const controllerGet = async (req = request, res, next) => {
    const query = req.query;
    store.get(query)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res, next) => {
    const role = req.body;
    store.post(role)
        .then(data => message(req, res, data));
};

const controllerPatch = async (req = request, res, next) => {
    const id = req.params.id;
    const role = req.body;
    store.patch(id, role)
        .then(data => message(req, res, data));
};

const controllerDelete = async (req = request, res, next) => {
    const id = req.params.id;
    store.delete(id)
        .then(data => message(req, res, data));
};

module.exports = {
    controllerGet,
    controllerDelete,
    controllerPost,
    controllerPatch
}