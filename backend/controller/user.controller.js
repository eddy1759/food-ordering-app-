const catchAsync = require('../utils/catchAsync')
const userService = require('../services/index')

// const logger = require('../middlewares/logging/logger')


/** 
 * @desc Create New User Controller
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @property {Object} req.body - Body object data
 * @property {Oobject} req.file - User image
 * @returns {JSON} - A JSON representing the type, message and user data
 */
const createUser = catchAsync(async (req, res) => {
    // ! Create new user
    const {type, message, statusCode, user} = await userService.createUser(
        req.body,
        req.file
    )

    // ! Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message: req.polyglot.t(message)
        })
    }

    // ! If everything is Ok, send data
    return res.status(statusCode).json({
        type,
        message: req.polyglot.t(message),
        user
    })
})







async function logoutUser (req, res) {
    res.clearCookie('jwt_token')
    logger.info('logout successful')

    res.status(StatusCodes.OK).json({
        status: true,
        msg: 'logout successful'
    })
}



