const router = require('express').Router();
const { check } = require('express-validator');
//import me

const { controllerGet, controllerPost, controllerPatch, controllerDelete } = require('./controller');
const { validateNameCategory, validateIDCategory } = require('../../helpers/db-validate');
const { validateShield } = require('../../middleware/shield-validate');
const { isAuthenticate } = require('../../middleware/isAuthenticate');
const { validateAdmin } = require('../../middleware/validate-role');

router.get('/',
    [
        isAuthenticate
    ], controllerGet);

router.post('/',
    [
        isAuthenticate,
        validateAdmin,
        check('name', 'name is required').notEmpty(),
        check('name').custom(validateNameCategory),
        validateShield
    ], controllerPost);

router.patch('/:id',
    [
        isAuthenticate,
        validateAdmin,
        check('id', 'not is mongo ID').isMongoId(),
        check('id').custom(validateIDCategory),
        check('name', 'name is required').notEmpty(),
        check('name').custom(validateNameCategory),
        validateShield
    ], controllerPatch);

router.delete('/:id',
    [
        isAuthenticate,
        validateAdmin,
        check('id', 'not is mongo ID').isMongoId(),
        check('id').custom(validateIDCategory),
        validateShield
    ], controllerDelete);

module.exports = router;