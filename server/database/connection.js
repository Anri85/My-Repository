// koneksi kedalam database
const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.Database_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('Connect To Database Successfull')
    })
}

module.exports = connectDB