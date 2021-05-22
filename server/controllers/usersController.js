// import usersModel
const usersModel = require('../models/usersModel')
// import validation
const { loginValidationSchema, registerValidationSchema } = require('../utilities/validator')
// import bcrypt
const bcrypt = require('bcrypt')

// login controller
exports.Login = async (request, response, next) => {
    // menerapkan validasi
    const validator = loginValidationSchema.validate(request.body)
    if(validator.error) {
        return response.status(400).json({status: false, message: validator.error.details[0].message})
    }
    // mengecek apakah email terdaftar didalam database
    const data = await usersModel.findOne({'email': validator.value.email})
    if(!data) {
        return response.status(400).json({status: false, message: 'Email Does Not Exist!'})
    }
    // mengecek kecocokan password
    const comparePassword = await bcrypt.compare(validator.value.password, data.password)
    if(comparePassword === false) {
        return response.status(400).json({status: false, message: 'Password Incorrect!'})
    }
    // membuat jwt

    // berhasil login
    return response.status(200).json({status: true, value: data, message: 'Login Successfull!'})
}

// register controller
exports.Register = async (request, response, next) => {
    // menerapkan validasi
    const validator = registerValidationSchema.validate(request.body)
    if(validator.error) {
        return response.status(400).json({status: false, message: validator.error.details[0].message})
    }
    // mengecek apakah email yang digunakan sudah terdaftar
    const emailExist = await usersModel.findOne({'email': validator.value.email})
    if(emailExist) {
        return response.status(400).json({status: false, message: 'Email Already Exist!'})
    }
    // melakukan hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(validator.value.password, salt)
    // input kedalam database
    try {
        const register = new usersModel({
            username: validator.value.username,
            email: validator.value.email,
            password: hashPassword
        })
        const data = await register.save()
        return response.status(201).json({status: true, value: data, message: 'Register Successfull!'})
    } catch (error) {
        next(error)
    }
}