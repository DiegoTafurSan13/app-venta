const router = require('express').Router();
const { check } = require('express-validator');
const { controllerGet, controllerPost, controllerDelete, controllerPatch } = require('./controller');
const {validateShield} = require('../../middleware/shield-validate');
const {validateIdEmployed} = require('../../helpers/db-validate');

router.get('/',controllerGet);

router.post('/',
[
    check('lastname','lastname can not be null').notEmpty(),
    check('name','name can not be null').notEmpty(),
    check('datebirth','datebirth can not be null').notEmpty(),
    check('datecontract','datecontract can not be null').notEmpty(),
    check('address','address can not be null').notEmpty(),
    check('city','city can not be null').notEmpty(),
    check('region','region can not be null').notEmpty(),
    check('country','country can not be null').notEmpty(),
    check('phone','phone can not be null').notEmpty(),
    validateShield
],controllerPost);

router.patch('/:id',
[
    check('id','not is mongo id').isMongoId(),
    check('id').custom(validateIdEmployed),
    check('lastname','lastname can not be null').notEmpty(),
    check('name','name can not be null').notEmpty(),
    check('datebirth','datebirth can not be null').notEmpty(),
    check('datecontract','datecontract can not be null').notEmpty(),
    check('address','address can not be null').notEmpty(),
    check('city','city can not be null').notEmpty(),
    check('region','region can not be null').notEmpty(),
    check('country','country can not be null').notEmpty(),
    check('phone','phone can not be null').notEmpty(),
    validateShield
],controllerPatch);

router.delete('/:id',
[
    check('id','not is mongo id').isMongoId(),
    check('id').custom(validateIdEmployed),
    validateShield
],controllerDelete);

module.exports = router;