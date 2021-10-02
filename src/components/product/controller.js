const { request } = require('express');
const store = require('./store');
const { message } = require('../../helpers/response');

const controllerGet = async (req = request, res, next) => {
    const query = req.query;
    const name = req.query.name || null;
    store.get(name, query)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res, next) => {
    const product = req.body;
    store.post(product)
        .then(data => message(req, res, data));
};

const controllerPatch = async (req = request, res, next) => {
    const id = req.params.id;
    const product = req.body;
    store.patch(id, product)
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
    controllerPatch,
    controllerPost
}