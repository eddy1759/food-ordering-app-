const mongoose = require('mongoose')
const {StatusCodes} = require('http-status-codes')

const ObjectId = mongoose.isValidObjectId

async function paramIsValidId(req, res, next) {
    if (ObjectId(req.params.id)) {
        return next()
    }

    res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Invalid param value ${req.param.id}`
    })
}

module.exports = paramIsValidId