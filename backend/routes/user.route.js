const express = require('express')
const helper = require('../utils/helper')
// const paramIsValidId = require('../middlewares/reqParam.validation')
const UserController = require('../controller/userController')
const uploadSingleImage = require('../utils/multer')
const passport = require('passport')


const router = express.Router()

const userControl = new UserController()

router.get('/users', userControl.getUsers)

router.post('/users', userControl.createUser)

router.post('/users/login', userControl.loginUser)

router.put('/users', helper.authMiddleware, userControl.updateUser)

router.post('/users/logout', userControl.logoutUser)

router.post('/users/profileimg',passport.authenticate('jwt', { session: false}), uploadSingleImage, userControl.uploadProfileImage)

module.exports = router