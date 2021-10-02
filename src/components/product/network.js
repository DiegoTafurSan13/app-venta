const router = require('express').Router();
const { check } = require('express-validator');
const { controllerGet, controllerPost, controllerDelete, controllerPatch } = require('../product/controller');
const { validateIDCategory, validateCodeProduct, validateNameProduct, validateIDProduct } = require('../../helpers/db-validate');
const { isAuthenticate } = require('../../middleware/isAuthenticate');
const { validateAdmin } = require('../../middleware/validate-role');
const { validateShield } = require('../../middleware/shield-validate');
router.get('/',
    [
        isAuthenticate
    ], controllerGet);

router.post('/',
    [
        isAuthenticate,
        validateAdmin,
        check('category', 'not is mongo ID').isMongoId(),
        check('category').custom(validateIDCategory),

        check('code', 'code is required').notEmpty(),
        check('code').custom(validateCodeProduct),
        check('name', 'name is required').notEmpty(),
        check('name').custom(validateNameProduct),

        validateShield
    ], controllerPost);

router.patch('/:id',
    [
        isAuthenticate,
        validateAdmin,
        check('id', 'not is mongo ID').isMongoId(),
        check('id').custom(validateIDProduct),
        check('category', 'not is mongo ID').isMongoId(),
        check('category').custom(validateIDCategory),

        check('code', 'code is required').notEmpty(),
        check('code').custom(validateCodeProduct),
        check('name', 'name is required').notEmpty(),
        check('name').custom(validateNameProduct),

        validateShield
    ], controllerPatch);

router.delete('/:id',
    [
        isAuthenticate,
        validateAdmin,
        check('id', 'not is mongo ID').isMongoId(),
        check('id').custom(validateIDProduct),

        validateShield
    ], controllerDelete);

module.exports = router;