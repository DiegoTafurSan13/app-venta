const router = require('express').Router();
const { check } = require('express-validator');
const { controllerDelete, controllerGet, controllerPatch, controllerPost } = require('./controller');
const { validateUserID, validateIDClient, validateIDSell } = require('../../helpers/db-validate');
const { validateShield } = require('../../middleware/shield-validate');
const { isAuthenticate } = require('../../middleware/isAuthenticate');

router.get('/', [
    isAuthenticate
], controllerGet);

router.post('/', [
    check('user', 'not is mongo ID').isMongoId(),
    check('user').custom(validateUserID),
    check('client', 'not is mongo ID').isMongoId(),
    check('client').custom(validateIDClient),
    check('typevoucher', 'typevoucher is required').notEmpty(),
    check('numbervoucher', 'numbervoucher is required').notEmpty(),
    check('serievoucher', 'serievoucher is required').notEmpty(),
    check('tax', 'tax is required').notEmpty(),
    check('total', 'total is required').notEmpty(),
    validateShield
], controllerPost);

router.patch('/:id', [
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateIDSell),
    check('user', 'not is mongo ID').isMongoId(),
    check('user').custom(validateUserID),
    check('client', 'not is mongo ID').isMongoId(),
    check('client').custom(validateIDClient),
    check('typevoucher', 'typevoucher is required').notEmpty(),
    check('numbervoucher', 'numbervoucher is required').notEmpty(),
    check('serievoucher', 'serievoucher is required').notEmpty(),
    check('tax', 'tax is required').notEmpty(),
    check('total', 'total is required').notEmpty(),
    validateShield
], controllerPatch);

router.delete('/:id', [
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateIDSell),
    validateShield
], controllerDelete);

module.exports = router;