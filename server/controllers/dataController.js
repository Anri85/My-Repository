// import model
const dataModel = require('../models/dataModel')
const AsyncHandler = require('../middleware/AsyncHandler')
const ErrorResponse = require('../utilities/ErrorResponse')

// membuat controller
exports.GetAllData = AsyncHandler( async (request, response, next) => {
    let query
    let uiValues = {
        filtering: {},
        sorting: {}
    }
    // menerapkan request.query (mengelompokan query dalam database berdasarkan parameter yang terdapat dalam request.query (gte, gt, lte, lt, in))
    const requestQueries = { ...request.query }
    console.log(requestQueries)
    // melakukan filtering jika field yang ada dalam parameter tidak ingin ditampilkan
    const removeFields = ['sort']
    // melakukan looping untuk menghilangkan field yang diinginkan pada variabel removeFields
    removeFields.forEach(value => delete requestQueries[value])
    console.log(requestQueries)
    // mengirim value filter kedalam halaman client
    const filterKey = Object.keys(requestQueries)
    const filterValues = Object.values(requestQueries)

    filterKey.forEach((value, index) => {
        uiValues.filtering[value] = filterValues[index]
    })

    // menjadikan request.query dalam format string
    let queryStr = JSON.stringify(requestQueries)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`)

    console.log(queryStr)
    // menerapkan sort filtering
    query = dataModel.find(JSON.parse(queryStr))
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
    const data = await query
    const maxAge = await dataModel.find().sort({ age: -1 }).limit(1).select('-_id age')
    const minAge = await dataModel.find().sort({ age: 1 }).limit(1).select('-_id age')

    uiValues.maxAge = maxAge[0].age
    uiValues.minAge = minAge[0].age
    response.status(200).json({status: true, result: data, uiValues, message: 'Successfull'})
})

exports.GetSingleData = AsyncHandler( async (request, response, next) => {
    const singleData = await dataModel.findById(request.params.id)
    response.status(200).json({status: true, result: singleData, message: 'Successfull'})
})

exports.PostData = AsyncHandler( async (request, response, next) => {
    const newData = await dataModel.create(request.body)
    response.status(201).json({status: true, result: newData, message: 'New Data Successfully Added'})
})

exports.UpdateData = AsyncHandler( async (request, response, next) => {
    let data = await dataModel.findById(request.params.id)

    if(!data) {
        return next(new ErrorResponse(`The Data With ID ${request.params.id} Not Found`, 404))
    }

    data = await dataModel.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
    response.status(201).json({status: true, result: data, message: 'Updated The Data Successfull'})
})

exports.DeleteData = AsyncHandler( async (request, response, next) => {
    let data = await dataModel.findById(request.params.id)

    if(!data) {
        return next(new ErrorResponse(`The Data With ID ${request.params.id} Not Found`, 404))
    }

    await data.remove()
    response.status(200).json({status: true, result: {}, message: 'Deleted The Data Successfull'})
})