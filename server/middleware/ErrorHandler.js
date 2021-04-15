// membuat ErrorHandler secara global
const ErrorResponse = require('../utilities/ErrorResponse')

const ErrorHandler = (error, request, response, next) => {
    console.log(error)

    let err = { ...error }
    err.message = error.message

    // mengecek 3 type error
    if(error.name === 'CastError') {
        const message = 'Resource Not Found'
        err = new ErrorResponse(message, 404)
        console.log(error.name)
    }

    if(error.code === 11000) {
        const message = 'Duplicate Field Value Entered'
        err = new ErrorResponse(message, 400)
        console.log(error.code)
    }

    if(error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(warning => warning.message).join(', ')
        err = new ErrorResponse(message, 400)
        console.log(error.name)
    }

    // apabila terjadi internal server error
    response.status(err.statusCode || 500).json({status: false, error: err.message || 'Internal Server Error'})
}

module.exports = ErrorHandler