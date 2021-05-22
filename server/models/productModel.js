// product model
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Insert Product Name!'],
        max: 255,
        min: 3
    },
    price: {
        type: Number,
        required: [true, 'Please Insert Product Price!'],
        max: 999999,
        min: 0
    },
    description: {
        type: String,
        required: [true, 'Please Product Description!'],
        max: 255,
        min: 50
    },
    rating: {
        type: Number,
        max: 5,
        min: 0
    },
    picture: {
        type: String,
        // required: [true, 'Please Provide Your Description'],
        max: 255,
    }
})

module.exports = mongoose.model('product', productSchema)