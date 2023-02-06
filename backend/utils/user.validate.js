const userModel = require('../model/user');

const validateUser = async (email, password) => {
    let user = await userModel.findOne({
        email: email
    })
    if (!user) {
        return false
    }
   user.isValidPassword(password, (err, match) => {
        if (!match) {
            return false
        }
   })
    return user
}

module.exports = validateUser