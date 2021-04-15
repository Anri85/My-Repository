// membuat penanganan response error secara global (membuat blueprint untuk errorHandler secara global)
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = ErrorResponse