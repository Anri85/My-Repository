const express = require('express')
const connectDB = require('./database/connection')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const ErrorHandler = require('./middleware/ErrorHandler')

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
app.use('/api/data', require('./route/dataRoute'))

// menerapkan ErrorHandler secara global
app.use(ErrorHandler)

app.listen(process.env.PORT, () => {
    console.log('server is running at port: ' + process.env.PORT)
})