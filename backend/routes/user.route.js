const express = require('express')
const helper = require('../utils/helper')
const paramIsValidId = require('../middlewares/reqParam.validation')
const {AddUserValidationMW, UpdateUserValidationMW
} = require('../middlewares/validators/user.validator')
const userController = require('../controller/user.controller')


const userRouter = express.Router()

userRouter.route('/signup').post(AddUserValidationMW, userController.createUser)

userRouter.route('/signin').post(userController.logIn)

userRouter.route('/logout').get(helper.verifyUser, userController.logoutUser)

userRouter.route(paramIsValidId, '/:id').put(UpdateUserValidationMW, userController.updateUserById)

module.exports = userRouter