const Model = require('./model');
const { ObjectId } = require('mongoose').Types;
async function getSell(query) {
    try {
        const { limit = 5, skip = 0, user = null, client = null } = query;
        if (ObjectId.isValid(user) || ObjectId.isValid(client)) {

            const foundSell = await Model.find({
                $or: [{ user: user }, { client: client }],
                $and: [{ state: true }]
            })
                .populate({ path: 'user' })
                .populate({ path: 'client' });
            return {
                status: 200,
                data: foundSell
            }

        }
        const [count, sell] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true })
                .populate({ path: 'user' })
                .populate({ path: 'client' })
                .skip(Number(skip)).limit(Number(limit))
        ]);
        return {
            status: 200,
            data: {
                count,
                sell
            }
        }

    } catch (err) {
        return {
            status: 200,
            data: err
        }
    }
}
async function postSell(sell) {
    try {
        const newSell = new Model(sell);
        return {
            status: 200,
            data: await newSell.save(),
        }
    } catch (err) {
        return {
            status: 200,
            data: err
        }
    }
}
async function patchSell(id, sell) {
    try {
        const { _id, __v, state, ...objSell } = sell;
        const newSell = await Model.findByIdAndUpdate(id, objSell);
        return {
            status: 200,
            data: newSell
        }
    } catch (err) {
        return {
            status: 200,
            data: err
        }
    }
}
async function deleteSell(id) {
    try {
        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, { state: false })
        }
    } catch (err) {
        return {
            status: 200,
            data: err
        }
    }
}
module.exports = {
    get: getSell,
    post: postSell,
    patch: patchSell,
    delete: deleteSell
}