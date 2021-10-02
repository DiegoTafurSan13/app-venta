const { request } = require('express');
const store = require('./store');
const { message } = require('../../helpers/response');

const controllerGet = async (req = request, res, next) => {
    const query = req.query;
    store.get(query)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res, next) => {
    const sell = req.body;
    store.post(sell)
        .then(data => message(req, res, data));
};

const controllerPatch = async (req = request, res, next) => {
    const id = req.params.id;
    const sell = req.body;
    store.patch(id, sell)
        .then(data => message(req, res, data));
};

const controllerDelete = async (req = request, res, next) => {
    const id = req.params.id;
    store.delete(id)
        .then(data => message(req, res, data));
};

module.exports = {
    controllerDelete,
    controllerGet,
    controllerPatch,
    controllerPost
}