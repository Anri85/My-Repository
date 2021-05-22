const express = require('express')
// importing file for connect to database
const connectDB = require('./database/connection')
// using cors module
const cors = require('cors')
// using dotenv module for read file .env
const dotenv = require('dotenv')
// initialization express into app constant
const app = express()
// connecting to error response middleware
const errorResponse = require('./utilities/errorResponse')

// membaca isi file .env
dotenv.config()

// koneksi kedalam database
connectDB()

// menerapkan cross origin resource sharing
const corsOpt = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOpt))

// mengambil data pada request.body
app.use(express.json())

// menggunakan route
app.use('/api/product', require('./route/productRoute'))
app.use('/api/user', require('./route/usersRoute'))

// menerapkan ErrorHandler secara global
app.use(errorResponse)

app.listen(process.env.PORT, () => {
    console.log('server Is Running At Port: ' + process.env.PORT)
})