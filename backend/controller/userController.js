const UserService = require('../services/userServices')
const { UserAddSchema, UpdateUserSchema } = require('../middlewares/validators/user.validator')
const helper = require('../utils/helper')
const {StatusCodes} = require('http-status-codes')
const {jwtConfig} = require('../config/Configs')

const userServices = new UserService()

class UserController {
    async createUser(req, res, next) {
        try {
            const validatedUser = await UserAddSchema.validateAsync(req.body)
            const createdUser = await userServices.createUser(validatedUser)
            const token = helper.getToken({userid: createdUser._id})
            res.cookie('jwt', token, {httpOnly: true, maxAge: 86400000})
            const emailToken = helper.getEmailToken({userId: createdUser._id})
            await this.userServices.sendVerificationEmail(createdUser.email, emailToken)
            res.status(StatusCodes.ACCEPTED).json(createdUser)
        } catch (error) {
           next(error); 
        }
    }

    async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            const token = await userServices.loginUser(email, password)
            res.cookie('jwt', token, {httpOnly: true, maxAge: jwtConfig.EXPIRESIN})
            res.status(StatusCodes.OK).json({
                message: "Login successful",
                token
            })
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {
        try {
            const {error, value} = await UpdateUserSchema.validateAsync(req.body)
            if (error) {
                throw new Error(error.details[0].message);
              }
            const updatedUser = await userServices.updateUser(req.user._id, value)
            res.status(StatusCodes.OK).json(updatedUser)
        } catch (error) {
           next(error) 
        }
    }

    async logoutUser(req, res) {
        try {
            res.clearCookie("jwt")
            res.status(StatusCodes.OK).json({message: "Logout successful"})
        } catch (error) {
            next(error)
        }
    }

    async uploadProfileImage(req, res, next) {
        try {
            console.log(req.user)
            const result = await userServices.uploadProfileIlmage(req.file)
            const updatedUser = await userServices.updateUser(req.user.id, result)
            res.status(StatusCodes.OK).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userServices.getUsers()
            res.status(StatusCodes.OK).json({
                users
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController;