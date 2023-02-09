const catchAsync = require('../utils/catchAsync')
const userService = require('../services/index')



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
            message: message
        })
    }

    // ! If everything is Ok, send data
    return res.status(statusCode).json({
        type,
        message: message,
        user
    })

})

/**
 * @desc Login user
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @property {Object} - req.body - Body object data
 * @returns {JSON} - A JSON representing the type, message and cookie
 */
const loginUser = catchAsync(async (req, res) => {
    const {type, message, statusCode, token} = await userService.logIn(
        req.body
    )

    // ! Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message: message
        })
    }

    //! Set the token as a cookie if everything is okay and send response
    res.cookie('jwt_token', token, {httpOnly: true})
        .status(statusCode)
        .json({
        type,
        message: message
    })
})

/**
 * @desc Logout a user controller
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns - it return nothing
 */
const logout = catchAsync(async (req, res) => {
    res.logout()
        .clearCookie('jwt_token')
        .status(statusCode)
        .json({
            type: success,
            message: 'User logged out successfully.'
        })
})

/**
 *  @desc Update User Details Controller
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns - it return nothing
 */ 
const updateUserDetails = catchAsync(async (req, res) => {
    // ! Find user document and update it's details
    const {type, message, statusCode, user} = await userService.updateUserDetails(req.user, req.body);

    // ! check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message: message
        })
    }

    // ! if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message: message,
        user
    })
})

/** 
 * @desc Update User Profile Image Controller
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @property {Object} req.file - User image
 * @property {Object} req.user - An object contains logged in user data
 * @returns {JSON} - A json object representing the type, message and user data
*/
const updateUserProfileImage = catchAsync(async (req, res) => {
    // ! Find user document and update it's profile image
    const {type, message, statusCode, user} = await userService.updateUserProfileImage(req.user, req.file)

    // ! Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode)
            .json({
                type,
                message: message
            })
    }

    // ! if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message: message,
        user
    })
})


/**
 * @desc      Delete User's Data Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
 const deleteUser = catchAsync(async (req, res) => {
    // ! Find user document and delete it
    const { type, message, statusCode } = await userService.deleteUser(
      req.params.id
    );
  
    // ! Check if there is an error
    if (type === 'Error') {
      return res.status(statusCode).json({
        type,
        message: message
      });
    }
  
    // ! If everything is OK, send data
    return res.status(statusCode).json({
      type,
      message: message
    });
  });

  module.exports = {
    createUser,
    loginUser,
    logout,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser
  }