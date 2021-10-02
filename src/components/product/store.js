const Model = require('./model');

async function getProduct(name, query) {
    try {
        const { limit = 5, skip = 0 } = query;
        if (name) {
            const foundProdut = await Model.findOne({ name, state: true });
            return {
                status: 200,
                data: foundProdut
            }
        }
        const [count, products] = await Promise.all([
            Model.countDocuments({ state: true }),
            Model.find({ state: true }).populate({ path: 'category' }).skip(Number(skip)).limit(Number(limit)),
        ]);
        return {
            status: 200,
            data: {
                count,
                products
            }
        }

    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function postProduct(product) {
    try {
        product.name = product.name.toUpperCase();
        const newProduct = new Model(product);
        return {
            status: 200,
            data: await newProduct.save(),
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function patchProduct(id, product) {
    try {
        const { _id, __v, state, ...objProduct } = product;
        objProduct.name = objProduct.name.toUpperCase();
        const newProduct = await Model.findByIdAndUpdate(id, objProduct);
        return {
            status: 200,
            data: newProduct
        }
    } catch (err) {
        return {
            status: 400,
            data: err
        }
    }
}

async function deleteProduct(id) {
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
    get: getProduct,
    post: postProduct,
    patch: patchProduct,
    delete: deleteProduct
}