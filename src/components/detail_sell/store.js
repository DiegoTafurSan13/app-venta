const Model = require('./model');
const { ObjectId } = require('mongoose').Types;

async function getDetailSell(query) {
    try {
        const { limit = 5, skip = 0, sell = null } = query;
        if (ObjectId.isValid(sell)) {
            const foundSell = await Model.findById(sell);
            return {
                status: 200,
                data: foundSell
            }
        }

        const [count, detailSell] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true }).populate({ path: 'product' }).populate({ path: 'sell' }).skip(Number(skip)).limit(Number(limit))
        ]);
        return {
            status: 200,
            data: {
                count,
                detailSell
            }
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function postDetailSell(detailSell) {
    try {
        const newDetailSell = new Model(detailSell);
        return {
            status: 200,
            data: await newDetailSell.save(),
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function patchDetailSell(id, detailSell) {
    try {
        const { _id, __v, state, ...objDetailSell } = detailSell;
        const foundDetailSell = await Model.findByIdAndUpdate(id, objDetailSell);
        return {
            status: 200,
            data: foundDetailSell
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function deleteDetailSell(id) {
    try {
        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, { state: false }),
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }

}

module.exports = {
    get: getDetailSell,
    post: postDetailSell,
    patch: patchDetailSell,
    delete: deleteDetailSell
}