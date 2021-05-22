// creating global error response
const errorResponse = (error, request, response, next) => {
    // checking 3 types of error
    if(error.name === 'CastError') {
        return response.status(404).json({status: false, message: 'Resource Not Found!'})
    }

    if(error.name === 'ValidationError') {
        return response.status(400).json({status: false, message: 'Validation Error!'})
    }

    if(error.name === 'MongoError' && error.code === 11000) {
        return response.status(400).json({status: false, message: 'Duplicated Field Value Entered!'})
    }

    // if internal server error or general error
    return response.status(500).json({status: false, message: 'Something Went Wrong!'})
}

module.exports = errorResponse