const mongoose = require('mongoose');

const Schema = mongoose.Schema

const deliverySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    delivery_date: {
        type: Date
    },
    isDelivered: {
        types: Boolean,
        default: false
    }
})

const deliveryModel = mongoose.model('delivery', deliverySchema);
module.exports = deliveryModel