const express = require('express')
const helper = require('../utils/helper')
const singleFile = require('../utils/multer')
const paramIsValidId = require('../middlewares/reqParam.validation')
const {AddUserValidationMW, UpdateUserValidationMW
} = require('../middlewares/validators/user.validator')
const userController = require('../controller/index')


const router = express.Router()

router.route('/signup').post( singleFile('image'),userController.createUser)

router.route('/signin').post(userController.loginUser)

router.route('/logout').get(helper.verifyUser, userController.logout)

router.route(paramIsValidId, '/update-details').put(UpdateUserValidationMW, userController.updateUserDetails)

router.route(paramIsValidId, '/update-profile-image').patch(singleFile('image'), userController.updateUserProfileImage)

router.route('/:id').delete(helper.verifyAdmin, userController.deleteUser)

module.exports = router