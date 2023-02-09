const {createUser,
    logIn,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser} = require('./user.service')


const userService = {
    createUser,
    logIn,
    updateUserDetails,
    updateUserProfileImage,
    deleteUser
}

module.exports = userService