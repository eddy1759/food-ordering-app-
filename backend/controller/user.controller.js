const catchAsync = require('../utils/catchAsync')
const userService = require('../services/index')

// const logger = require('../middlewares/logging/logger')


/** 
 * @desc Create New User Controller
 * @param {Object} req - Request object
 * 
*/







async function logoutUser (req, res) {
    res.clearCookie('jwt_token')
    logger.info('logout successful')

    res.status(StatusCodes.OK).json({
        status: true,
        msg: 'logout successful'
    })
}



