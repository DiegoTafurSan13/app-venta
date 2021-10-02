const { request, response } = require('express');
const Model = require('../components/user/model');
const ModelRole = require('../components/role/model');

async function validateAdmin(req = request, res = response, next) {
    const role = await ModelRole.findOne({ _id: req.user.role });
    if (role.name != 'ADMIN') {
        return res.status(401).json({
            err: `access denegate`
        });
    }
    next();
}

module.exports = {
    validateAdmin
}