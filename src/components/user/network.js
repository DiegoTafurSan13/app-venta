const router = require('express').Router();
const { check } = require('express-validator');

const passport = require('passport');
const { controllerPost, controllerLogout, controllerDelete, controllerPatch, controllerProfile, controllerGet } = require('./controller');
const { validateShield } = require('../../middleware/shield-validate');
const { comparePassword } = require('../../middleware/validate-password');
const { isAuthenticate, isDesAuthenticate } = require('../../middleware/isAuthenticate');
const { validateUserEmail, validateUserIdEmployed, validateUsername, validateIdEmployed, validateIdRole, validateUserID } = require('../../helpers/db-validate');
const { validateAdmin } = require('../../middleware/validate-role');

router.get('/', [
    isAuthenticate,
    validateAdmin
], controllerGet);

router.get('/profile',
    [
        isAuthenticate
    ],
    controllerProfile);

router.get('/logout',
    [
        isAuthenticate
    ],
    controllerLogout);

router.post('/signin',
    [
        isDesAuthenticate,
        check('username', 'username cant not be empty').notEmpty(),
        check('password', 'password cant not be empty').notEmpty(),
        validateShield,
        comparePassword,

    ], passport.authenticate('local-signin', {
        successMessage: "sucessfull login",
        failureRedirect: '/signin',
        passReqToCallback: true,
    }));

router.post('/signup',
    [
        isAuthenticate,
        check('role', 'not is mongoID').isMongoId(),
        check('role').custom(validateIdRole),
        validateAdmin,
        check('employed').custom(validateUserIdEmployed),
        check('employed', 'not is mongoID').isMongoId(),
        check('employed').custom(validateIdEmployed),
        check('username', 'username cant not be empty').notEmpty(),
        check('username').custom(validateUsername),
        check('password', 'password cant not be empty').notEmpty(),
        check('email', 'this not is structure email').isEmail(),
        check('email').custom(validateUserEmail),
        validateShield,
    ], controllerPost);

router.patch('/:id', [
    isAuthenticate,
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateUserID),
    check('role', 'not is mongoID').isMongoId(),
    check('role').custom(validateIdRole),
    validateAdmin,
    check('employed').custom(validateUserIdEmployed),
    check('employed', 'not is mongoID').isMongoId(),
    check('employed').custom(validateIdEmployed),
    check('username', 'username cant not be empty').notEmpty(),
    check('username').custom(validateUsername),
    check('password', 'password cant not be empty').notEmpty(),
    check('email', 'this not is structure email').isEmail(),
    check('email').custom(validateUserEmail),
    validateShield,
], controllerPatch);

router.delete('/:id', [
    isAuthenticate,
    validateAdmin,
    check('id', 'not is mongo ID').isMongoId(),
    check('id').custom(validateUserID),
    validateShield,

], controllerDelete);

module.exports = router;





/**
 * , passport.authenticate('local-signup', {
        successMessage: "sucessfull register",
        failureMessage: 'Registration error',
        passReqToCallback: true
    })
 */