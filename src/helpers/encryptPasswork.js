const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function matchPassword(newPassword,hashPassword) {
    return bcrypt.compareSync(newPassword, hashPassword);
}

module.exports = {
    encryptPassword,
    matchPassword
}