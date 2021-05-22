// users model
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'Please Insert Your Username!']
    },
    email: {
        type: String,
        min: 11,
        max: 255,
        required: [true, 'Please Insert Your Email!']
    },
    password: {
        type: String,
        min: 8,
        max: 255,
        required: [true, 'Please Insert Your Password!']
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('users', usersSchema)