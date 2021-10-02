const { response } = require('express');
const { validationResult } = require('express-validator');

const validateShield = (req, res = response, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            err
        });
    }
    next();
}

module.exports = {
    validateShield
}