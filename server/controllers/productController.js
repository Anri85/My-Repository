// import model
const productModel = require('../models/productModel')
// import validation
const { productValidationSchema } = require('../utilities/validator')

// get all product
exports.GetAllProduct = async (request, response, next) => {
    let query
    let uiValues = {
        filtering: {},
        sorting: {}
    }
    // menerapkan request.query (mengelompokan query dalam database berdasarkan parameter yang terdapat dalam request.query (gte, gt, lte, lt, in))
    const requestQueries = { ...request.query }

    // melakukan filtering jika field yang ada dalam parameter tidak ingin ditampilkan
    const removeFields = ['sort']
    // melakukan looping untuk menghilangkan field yang diinginkan pada variabel removeFields
    removeFields.forEach(value => delete requestQueries[value])

    // mengirim value filter kedalam halaman client
    const filterKey = Object.keys(requestQueries)
    const filterValues = Object.values(requestQueries)

    filterKey.forEach((value, index) => {
        uiValues.filtering[value] = filterValues[index]
    })

    // menjadikan request.query dalam format string
    let queryStr = JSON.stringify(requestQueries)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`)

    // menerapkan sort filtering
    query = productModel.find(JSON.parse(queryStr))
    if(request.query.sort) {
        const sortByArr = request.query.sort.split(',')
        sortByArr.forEach(val => {
            let order
            if(val[0] === '-') {
                order = 'descending'
            } else {
                order = 'ascending'
            }

            uiValues.sorting[val.replace('-', '')] = order
        })
        const sortByStr = sortByArr.join(' ')

        query = query.sort(sortByStr)
    }

    // menerapkan query
    const products = await query
    const maxPrice = await productModel.find().sort({ price: -1 }).limit(1).select('-_id price')
    const minPrice = await productModel.find().sort({ price: 1 }).limit(1).select('-_id price')

    uiValues.maxPrice = maxPrice[0].price
    uiValues.minPrice = minPrice[0].price
    response.status(200).json({status: true, value: products, uiValues, message: 'Successfull'})
}

// get single product
exports.GetSingleProduct = async (request, response, next) => {
    // get single product
    try {
        const product = await productModel.findById(request.params.id)
        return response.status(200).json({status: true, value: product, message: 'Successfull!'})
    } catch (error) {
        next(error)
    }
}

// add product
exports.AddProduct = async (request, response, next) => {
    // validasi request
    const validator = productValidationSchema.validate(request.body)
    if(validator.error) {
        return response.status(400).json({status: false, message: validator.error.details[0].message})
    }
    // add product
    try {
        const newProduct = await productModel.create(validator.value)
        return response.status(201).json({status: true, value: newProduct, message: 'Successfull!'})
    } catch (error) {
        next(error)
    }
}

// update product
exports.UpdateProduct = async (request, response, next) => {
    // validasi request
    const validator = productValidationSchema.validate(request.body)
    if(validator.error) {
        return response.status(400).json({status: false, message: validator.error.details[0].message})
    }
    // update product
    try {
        const updateProduct = await productModel.findByIdAndUpdate(request.params.id,  validator.value, { new: true, runValidators: true })
        return response.status(200).json({status: true, value: updateProduct, message: 'Update Product Successfull!'})
    } catch (error) {
        next(error)
    }
}

// delete product
exports.DeleteProduct = async (request, response, next) => {
    // delete product
    try {
        const deleted = await productModel.findByIdAndDelete(request.params.id)
        return response.status(200).json({status: true, value: deleted, message: 'Delete Product Successfull!'})
    } catch (error) {
        next(error)
    }
}