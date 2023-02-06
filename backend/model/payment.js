const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    amount: Number,
    status: {
        type: String,
        enum: ['pending', 'successful']
    },
    payment_date: {
        type: Date
    }
})

const paymentModel = mongoose.model('payment', paymentSchema);
module.exports = paymentModel;