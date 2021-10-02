const Model = require('./model');

async function getRole(query) {
    const { limit = 5, skip = 0 } = query;

    const [count, role] = await Promise.all([
        Model.countDocuments({ state: true }),
        Model.find({ state: true }).skip(Number(skip)).limit(Number(limit))
    ]);
    return {
        status: 200,
        data: {
            count,
            role
        }
    }
}

async function addRole(role) {
    try {
        role.name = role.name.toUpperCase();
        const newRole = new Model(role);
        return {
            status: 200,
            data: await newRole.save()
        };
    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function patchRole(id, role) {
    try {
        const { _id, __v, state, ...objRole } = role;
        objRole.name = objRole.name.toUpperCase();
        const newRole = await Model.findByIdAndUpdate(id,objRole);
        return {
            status: 200,
            data: newRole
        };
    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

async function deleteRole(id) {
    try {
        const role = await Model.findByIdAndUpdate(id,{state:false});
        return {
            status: 200,
            data: role
        };
    } catch (err) {
        return {
            status: 400,
            data: err
        };
    }
}

module.exports = {
    get:getRole,
    post:addRole,
    patch:patchRole,
    delete:deleteRole
}