const jwt = require('jsonwebtoken')
const {jwtConfig} = require('../config/Configs')
const userModel = require('../model/items')
const passport = require('passport')


const getToken = function (user) {
    return jwt.sign(user, 
        jwtConfig.SECRET, 
        { expiresIn: "168h"}
        )
}

const getEmailToken = function(userId) {
    return jwt.sign(userId, jwtConfig.EMAILJWT)
}

const authMiddleware  = passport.authenticate('jwt', { session: false})

const verifyAdmin = async (req, res, next) => {
    const user = await userModel.findOne({_id: req.user._id})

    if(user.user_type === 'admin') {
        next()
    }
}

module.exports = {
    getToken,
    getEmailToken,
    authMiddleware,
    verifyAdmin
}