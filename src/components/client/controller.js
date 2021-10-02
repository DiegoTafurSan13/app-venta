const { request } = require('express');
const store = require('./store');
const { message } = require('../../helpers/response');

const controllerGet = async (req = request, res, next) => {
    const name = req.query.name || null;
    const query = req.query;
    store.get(name, query)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res, next) => {
    const client = req.body;
    store.post(client)
        .then(data => message(req, res, data));
};

const controllerPatch = async (req = request, res, next) => {
    const id = req.params.id;
    const client = req.body;
    store.patch(id, client)
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
    controllerPatch,
    controllerDelete
}