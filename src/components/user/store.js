const Model = require('./model');
const { encryptPassword, matchPassword } = require('../../helpers/encryptPasswork');

async function getProfile(username) {
    try {
        const foundUser = await Model.findOne({ username })
            .populate({
                path: 'role',
            })
            .populate({
                path: 'employed'
            });
        return {
            status: 200,
            data: foundUser
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function getAllUser(query) {
    try {

        const [limit = 5, skip = 0] = query;

        const [count, foundUser] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true })
                .populate({
                    path: 'role',
                })
                .populate({
                    path: 'employed'
                })
                .skip(Number(skip))
                .limit(Number(limit))
        ]);
        return {
            status: 200,
            data: foundUser
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function postUserSignup(user) {
    try {
        const newUser = await Model(user);
        newUser.password = await encryptPassword(newUser.password);
        /*return await newUser.save();*/
        return {
            status: 200,
            data: await newUser.save()
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function postUserSignin(username) {
    try {
        const foundUser = await Model.findOne({ username });
        return foundUser;
    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function patchUser(id, user) {
    try {
        const { _id, __v, state, ...objUser } = user;
        objUser.password = await encryptPassword(objUser.password);
        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, objUser),
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function deleteUser(id) {
    try {

        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, { state: false }),
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

module.exports = {
    signin: postUserSignin,
    signup: postUserSignup,
    patch: patchUser,
    delete: deleteUser,
    getProfile:getProfile,
    get:getAllUser
}

