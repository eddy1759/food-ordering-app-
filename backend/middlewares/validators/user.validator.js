const Joi = require('joi');

const UserAddSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .trim()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required(),
    usertype: Joi.string()
        .default('user')
        .optional(),
    DOB: Joi.date()
        .less('1-1-2023'),
    address: Joi.string()
        .required(),
    profileImg: Joi.string()
})

const UpdateUserSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim(),
    lastname: Joi.string()
        .max(255)
        .trim(),
    DOB: Joi.date()
        .less('1-1-2023'),
    address: Joi.string(),
    profileImg: Joi.string() 
})

async function AddUserValidationMW(req, res, next) {
    const userPayLoad = req.body
    try {
        await UserAddSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next(error)
    }
}

async function UpdateUserValidationMW(req, res, next) {
    const userPayLoad = req.body
    try {
        await UpdateUserSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    AddUserValidationMW,
    UpdateUserValidationMW
}