const modelCategory = require('../components/category/model');
const modelEmployed = require('../components/employed/model');
const modelRole = require('../components/role/model');
const modelUser = require('../components/user/model');
const modelProduct = require('../components/product/model');
const modelClient = require('../components/client/model');
const modelSell = require('../components/sell/model');
const modelDetailSell = require('../components/detail_sell/model');

async function validateNameCategory(name) {
    const foundName = await modelCategory.findOne({ name });

    if (foundName) {
        throw new Error(`Name ${name} of category exits`);
    }
}

async function validateIDCategory(id) {
    const foundCategory = await modelCategory.findById(id);

    if (!foundCategory) {
        throw new Error(`Category with ${id} not exits`);
    }
}

async function validateIdEmployed(id) {
    const foundEmployed = await modelEmployed.findById(id);

    if (!foundEmployed) {
        throw new Error(`ID ${id} not exits`);
    }
}
async function validateNameRole(name) {
    const foundRole = await modelRole.findOne({ name });
    if (foundRole) {
        throw new Error(`${name} is register`);
    }
}
async function validateIdRole(id) {
    const foundRole = await modelRole.findById(id);
    if (!foundRole) {
        throw new Error(`${id} not found`);
    }
}

async function validateUserIdEmployed(id) {
    const foundUserEmployed = await modelUser.findOne({ employed: id });
    if (foundUserEmployed) {
        throw new Error(`Employed with ${id} is register`);
    }
}

async function validateUsername(username) {
    const foundUser = await modelUser.findOne({ username });
    if (foundUser) {
        throw new Error(`Username ${username} is register`);
    }
}

async function validateUserEmail(email) {
    const foundUser = await modelUser.findOne({ email });
    if (foundUser) {
        throw new Error(`Email ${email} is register`);
    }
}

async function validateUserID(id) {
    const foundUser = await modelUser.findById(id);
    if (!foundUser) {
        throw new Error(`user with ${id} not exist`);
    }
}

async function validateCodeProduct(code) {
    const foundProduct = await modelProduct.findOne({code});
    if (foundProduct) {
        throw new Error(`code ${code} exist`);
    }
}

async function validateNameProduct(name) {
    const foundProduct = await modelProduct.findOne({name});
    if (foundProduct) {
        throw new Error(`name ${name} exist`);
    }
}

async function validateIDProduct(id) {
    const foundProduct = await modelProduct.findById(id);
    if (!foundProduct) {
        throw new Error(`product with ${id} not exist`);
    }
}

async function validateIDClient(id) {
    const foundClient = await modelClient.findById(id);
    if (!foundClient) {
        throw new Error(`client with ${id} not exist`);
    }
}

async function validateNameClient(name) {
    const foundClient = await modelClient.findOne({name});
    if (foundClient) {
        throw new Error(`client ${name} exist in register`);
    }
}

async function validateIDSell(id) {
    const foundSell = await modelSell.findById(id);
    if (!foundSell) {
        throw new Error(`sell with ${id} not exist`);
    }
}

async function validateIDDetailSell(id) {
    const foundDetailSell = await modelDetailSell.findById(id);
    if (!foundDetailSell) {
        throw new Error(`Detail sell with ${id} not exist`);
    }
}

module.exports = {
    validateIdEmployed,
    validateIdRole,
    validateUserIdEmployed,
    validateIDCategory,
    validateUserID,
    validateIDProduct,
    validateIDClient,
    validateIDSell,
    validateIDDetailSell,
    validateNameCategory,
    validateNameRole,
    validateUserEmail,
    validateUsername,
    validateCodeProduct,
    validateNameProduct,
    validateNameClient
}