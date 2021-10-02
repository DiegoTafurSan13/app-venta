const Model = require('./model');

async function getCategory(name, query) {
    try {
        const { limit = 5, skip = 0 } = query;

        const [count, data] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true }).skip(Number(skip)).limit(Number(limit))
        ]);
        return {
            status: 200,
            data: {
                count,
                data
            }
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
};

async function postCategory(category) {
    try {
        const { state, ...objCategory } = category;
        objCategory.name = objCategory.name.toUpperCase();
        const newCategory = new Model(objCategory);
        return {
            status: 200,
            data: await newCategory.save()
        };

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
};

async function patchCategory(id, category) {
    try {
        const { _id, __v, state, ...objCategory } = category;
        objCategory.name = objCategory.name.toUpperCase();
        const newCategory = await Model.findByIdAndUpdate(id, objCategory);
        return {
            status: 200,
            data: newCategory
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function deleteCategory(id) {
    try {
        return {
            status: 200,
            data: await Model.findByIdAndUpdate(id, { state: true }),
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

module.exports = {
    get: getCategory,
    post: postCategory,
    patch: patchCategory,
    delete: deleteCategory
}