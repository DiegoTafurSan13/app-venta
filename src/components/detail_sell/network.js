const router = require('express').Router();
const { check } = require('express-validator');
const { controllerDelete, controllerGet, controllerPatch, controllerPost } = require('./controller');
const { validateIDProduct, validateIDSell, validateIDDetailSell } = require('../../helpers/db-validate');
const { validateShield } = require('../../middleware/shield-validate');
const { isAuthenticate } = require('../../middleware/isAuthenticate');

router.get('/', [
    isAuthenticate
], controllerGet);

router.post('/', [
    check('product', 'not is mongo ID').isMongoId(),
    check('product').custom(validateIDProduct),
    check('sell', 'not is mongo ID').isMongoId(),
    check('sell').custom(validateIDSell),
    check('quantity', 'quantity is required').notEmpty(),
    check('price', 'price is required').notEmpty(),
    validateShield
], controllerPost);

router.patch('/:id', [
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateIDDetailSell),
    check('product', 'not is mongo ID').isMongoId(),
    check('product').custom(validateIDProduct),
    check('sell', 'not is mongo ID').isMongoId(),
    check('sell').custom(validateIDSell),
    check('quantity', 'quantity is required').notEmpty(),
    check('price', 'price is required').notEmpty(),
    validateShield
], controllerPatch);

router.delete('/:id', [
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateIDDetailSell),
    validateShield
], controllerPatch);

module.exports = router;