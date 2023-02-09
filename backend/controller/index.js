const {
    createUser,
    loginUser,
    logout,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser
} = require('./user.controller')


const userController = {
    createUser,
    loginUser,
    logout,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser
}

module.exports = userController