const db = require('mongoose');

async function connect(){
    try {
        await db.connect(process.env.MONGO_CNN);
        console.log('[CONFIG] conneccion exitosa');
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    connect
}