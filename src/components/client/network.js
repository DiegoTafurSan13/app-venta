const router = require('express').Router();
const { controllerPost, controllerDelete, controllerGet, controllerPatch } = require('./controller');
const { isAuthenticate } = require('../../middleware/isAuthenticate');
const { validateShield } = require('../../middleware/shield-validate');
const { validateIDClient, validateNameClient } = require('../../helpers/db-validate');
const { check } = require('express-validator');

router.get('/', [
    isAuthenticate
], controllerGet);

router.post('/', [
    isAuthenticate,
    check('typedocument', 'typedocument is require').notEmpty(),
    check('numberdocument', 'numberdocument is require').notEmpty(),
    check('numberdocument').custom(validateNameClient),
    check('name', 'name is require').notEmpty(),
    validateShield
], controllerPost);

router.patch('/:id', [
    isAuthenticate,
    check('id','not is mongo ID').isMongoId(),
    check('id').custom(validateIDClient),
    check('typedocument', 'typedocument is require').notEmpty(),
    check('numberdocument', 'numberdocument is require').notEmpty(),
    check('numberdocument').custom(validateNameClient),
    check('name', 'name is require').notEmpty(),
    validateShield
], controllerPatch);

router.delete('/:id', [
    isAuthenticate,
    check('id','not is mongo ID').isMongoId(),
    check('id').custom(validateIDClient),
    validateShield
], controllerDelete);

module.exports = router;