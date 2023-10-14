const { Router } = require('express');
const { userGet, userPost, userPut, userDelete, userPatch, usersGet } = require('../controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateRole } = require('../middlewares/validate-role');
const { validateEmail, userByIdExists } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRol, hasAnyRoleOf } = require('../middlewares/validate-has-role');

const router = Router();

router.get('/', usersGet);

router.get('/:id', 
[
    validateJWT, 
    // isAdminRol,
    hasAnyRoleOf('SALES_ROLE', 'USER_ROLE', 'ADMIN_ROLE')
], 
userGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, must have more than 6 words').not().isEmpty().isLength({
        min: 6,
        max: 10
    }),
    check('email', 'Email is not valid').isEmail().custom(async (value = '') => validateEmail(value)),
    // check('rol', 'Is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async (value = '') => validateRole(value)),
    validateFields
], userPost);

router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(async (value = '') => validateRole(value)),
    validateFields
], userPut);

router.delete('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields
], userDelete);

router.patch('/', userPatch);

module.exports = router;