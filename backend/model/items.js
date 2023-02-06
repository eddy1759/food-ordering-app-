const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: [1, "Price cannot be lower than 1"],
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const itemsModel = mongoose.model("items", itemSchema)
module.exports = itemsModel