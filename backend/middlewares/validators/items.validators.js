const Joi = require('joi');

const itemAddSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(5),
    price: Joi.number()
        .min(1)
        .required(),
    imgUrl: Joi.string()
        .required()
})

const itemUpdateSchema = Joi.object({
    name: Joi.string()
    .max(255)
    .trim(),
    description: Joi.string()
        .min(5),
    price: Joi.number()
        .min(1)
})

async function AddItemValidationMW (req, res, next) {
    const itemPayload = req.body
    try {
        await itemAddSchema.validateAsync(itemPayload)
        next()
    } catch (error) {
        next(error)
    }
}

async function UpdateItemValidationMW (req, res, next) {
    const itemPayload = req.body
    try {
        await itemUpdateSchema.validateAsync(itemPayload)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    AddItemValidationMW,
    UpdateItemValidationMW
}