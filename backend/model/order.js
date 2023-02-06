const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderFood: [{
        meal: {
            type: Schema.Types.ObjectId,
            ref: 'items'
        },
        quantity: {
            type: Number,
            min: [0, 'quantity cannot be eqaul or less than zero']
        }
    }],
    order_date: {
        type: Date
    },
    total_price: Nnumber,
    Status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
    },
    delivery_fee: Number
})

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel

