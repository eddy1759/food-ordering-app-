const userModel = require('../model/user')
const helper = require('../utils/helper')
const {StatusCodes} = require('http-status-codes')
const validateUser = require('../utils/user.validate')
const logger = require('../middlewares/logging/logger')

async function createUser(req, res, next) {
    const {
        firstname,
        lastname,
        email,
        password,
        usertype,
        DOB,
        address,
    } = req.body
    
    try {
        let userExist = await userModel.findOne({
            email: email
        })
    
        if (userExist) {
            return res.status(StatusCodes.CONFLICT).json({
                status: false,
                msg: 'This user already exist'
            })
        }

        const user =  await userModel.create({
            firstname,
            lastname,
            email,
            password,
            usertype,
            DOB,
            address
        })

        return res.status(StatusCodes.ACCEPTED).json({
            msg: 'Registration successful!',
            user
        })
    } catch (error) {
        next(error)
    }
}

async function logIn(req, res, next){
    // const {email, password} =  req.body
    try {
        const user = await validateUser(req.body.email, req.body.password)
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send('Invalid credentials')
        }

        const token = helper.getToken({
            _id: user._id, email: user.email
        })
        res.status(StatusCodes.OK).json({
            status: true,
            msg: 'Login successful',
            token
        })
    } catch (error) {
        next(error)
    }
}


async function logoutUser (req, res) {
    res.clearCookie('jwt_token')
    logger.info('logout successful')

    res.status(StatusCodes.OK).json({
        status: true,
        msg: 'logout successful'
    })
}

async function updateUserById(req, res, next) {
    const id = req.params.id
    try {
        let user = await userModel.findByIdAndUpdate(id, req.body, {new: true})

        if (!user) {
            return res.status(404).json({
                status: false,
                msg: "User does not exist"
            })
        }

        res.status(StatusCodes.ACCEPTED).json({
            status: true,
            msg: 'User updated Successfully',
            data: user,
        })
    } catch (error) {
       next(error) 
    }
}

module.exports = {
    createUser,
    logIn,
    logoutUser,
    updateUserById
}