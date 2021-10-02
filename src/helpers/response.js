const { response } = require('express');

async function message(req, res = response, message) {
    res.status(message.status || 200).json(message.data);
}

module.exports = {
    message
};