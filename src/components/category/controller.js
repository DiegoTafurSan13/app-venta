const { request, response } = require('express');
const { message } = require('../../helpers/response');
const store = require('./store');

const controllerGet = async (req = request, res = response, next) => {
    const query = req.query;
    store.get(query)
        .then(data => message(req, res, data));
};

const controllerPost = async (req = request, res = response, next) => {
    const category = req.body;
    store.post(category)
        .then(data => message(req, res, data));
};

const controllerPatch = async (req = request, res = response, next) => {
    const id = req.params.id;
    const category = req.body;
    store.patch(id, category)
        .then(data => message(req, res, data));
};

const controllerDelete = async (req = request, res = response, next) => {
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