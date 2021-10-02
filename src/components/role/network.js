const router = require('express').Router();
const { check } = require('express-validator');
const { controllerGet, controllerPost, controllerPatch, controllerDelete } = require('./controller');
const {validateShield} = require('../../middleware/shield-validate');
const {validateIdRole,validateNameRole} = require('../../helpers/db-validate');

router.get('/',controllerGet);

router.post('/',
[
    check('name','name cant not be empty').notEmpty(),
    check('name').custom(validateNameRole),
    validateShield
],controllerPost);

router.patch('/:id',
[
    check('id','not is mongoId').isMongoId(),
    check('id').custom(validateIdRole),
    check('name','name cant not be empty').notEmpty(),
    check('name').custom(validateNameRole),
    validateShield
],controllerPatch);

router.delete('/:id',
[
    check('id','not is mongoId').isMongoId(),
    check('id').custom(validateIdRole),
    validateShield
],controllerDelete);

module.exports = router;
