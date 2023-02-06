const express = require('express')
const userRoute = require('./user.route')


const rootRouter = express.Router()


rootRouter.use('/users', userRoute)


module.exports = rootRouter