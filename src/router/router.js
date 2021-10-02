const category = require('../components/category/network');
const employed = require('../components/employed/network');
const role = require('../components/role/network');
const user = require('../components/user/network');
const product = require('../components/product/network');
const client = require('../components/client/network');
const sell = require('../components/sell/network');
const detailSell = require('../components/detail_sell/network');

function router(server) {
    server.use('/category', category);
    server.use('/employed', employed);
    server.use('/role', role);
    server.use('/user', user);
    server.use('/product', product);
    server.use('/client', client);
    server.use('/sell', sell);
    server.use('/detail-sell', detailSell);
}

module.exports = router;