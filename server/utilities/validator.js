// create validator using joi package
const Joi = require('joi')

// product valdation
const productValidationSchema = Joi.object().keys({
    name: Joi.string().min(3).max(255).required(),
    price: Joi.number().min(0).max(999999).required(),
    description: Joi.string().min(50).max(255).required(),
    rating: Joi.number().min(0).max(5),
    picture: Joi.string().max(255)
})

// register validation
const registerValidationSchema = Joi.object().keys({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(11).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
})

// login validation
const loginValidationSchema = Joi.object().keys({
    email: Joi.string().min(11).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
})

module.exports = {
    productValidationSchema,
    loginValidationSchema,
    registerValidationSchema
}