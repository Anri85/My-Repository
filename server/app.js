const express = require('express')
// importing socket.io and express instance for running the server
const { app, server } = require('./core/core')
// importing file for connect to database
const connectDB = require('./database/connection')
// importing cors module
const cors = require('cors')
// using dotenv module for read file .env
const dotenv = require('dotenv')

// connecting to error response middleware
const errorResponse = require('./utilities/errorResponse')

// membaca isi file .env
dotenv.config()

// mengambil data pada request.body
app.use(express.json())

// menerapkan cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// koneksi kedalam database
connectDB()

// menggunakan route
app.use('/api/product', require('./route/productRoute'))
app.use('/api/user', require('./route/usersRoute'))

// menerapkan ErrorHandler secara global
app.use(errorResponse)

// menggunakan server bukan app
server.listen(process.env.PORT, () => {
    console.log('server Is Running At Port: ' + process.env.PORT)
})