const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema({
    code: {
        type: String
    },
    discount: Number,
    expireDate: Date
})

const couponModel = mongoose.model('coupon', couponSchema);
module.exports = couponModel