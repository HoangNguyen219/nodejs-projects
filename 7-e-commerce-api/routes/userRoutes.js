const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middlewares/authentication')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword } = require('../controller/userController')


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)

router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
