// membuat model
const mongoose = require('mongoose')
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Your Name'],
        max: 255,
        min: 8
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your Email'],
        max: 255,
        min: 11
    },
    phone_number: {
        type: String,
        required: [true, 'Please Provide Your Phone Number'],
        max: 15,
        min: 8
    },
    age: {
        type: String,
        required: [true, 'Please Enter Your Age'],
        max: 3,
        min: 1
    },
    description: {
        type: String,
        required: [true, 'Please Provide Your Description'],
        max: 1024,
        min: 50
    }
})

const dataModel = mongoose.model('data', dataSchema)

module.exports = dataModel