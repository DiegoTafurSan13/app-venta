const Model = require('./model');

async function getClient(name, query) {
    try {
        const { limit = 5, skip = 0 } = query;
        if (name) {
            const foundClient = await Model.findOne({ name });
            return {
                status: 200,
                data: foundClient
            }
        }
        const [count, client] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true }).skip(Number(skip)).limit(Number(limit))
        ]);
        return {
            status: 200,
            data: {
                count,
                client
            }
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function postClient(client) {
    try {
        const newClient = new Model(client);
        return {
            status: 200,
            data: await newClient.save()
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function patchClient(id, client) {
    try {
        const { _id, __v, state, ...objClient } = client;
        const newClient = await Model.findByIdAndUpdate(id, objClient);
        return {
            status: 200,
            data: newClient
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function deleteClient(id) {
    try {
        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, { state: false })
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

module.exports = {
    get: getClient,
    post: postClient,
    patch: patchClient,
    delete: deleteClient
}