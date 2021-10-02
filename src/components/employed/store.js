const Model = require('./model');

async function getEmployed(name, query) {
    try {
        const { limit = 5, skip = 0 } = query;

        if (name) {
            const foundEmployed = await Model.findOne({ name: name, state: true });
            return {
                status: 200,
                data: foundEmployed,
            }
        }
        const [count, employed] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true }).skip(Number(skip)).limit(Number(limit))
        ]);
    
        return {
            status: 200,
            data: {
                count,
                employed
            }
        };

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function addEmployed(employed) {
    try {
        const { state, ...objEmployed } = employed;
        const newEmployed = new Model(objEmployed);
        return {
            status: 200,
            data: await newEmployed.save()
        };

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function patchEmployed(id, employed) {
    try {
        const { _id, __v,state, ...objEmployed } = employed;

        const employe = await Model.findByIdAndUpdate(id, objEmployed);
        return {
            status: 200,
            data: employe
        };

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function deleteEmployed(id) {
    try {

        const employe = await Model.findByIdAndUpdate(id, {state:false});
        return {
            status: 200,
            data: employe
        };

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}


module.exports = {
    get:getEmployed,
    add: addEmployed,
    patch:patchEmployed,
    delete:deleteEmployed
}