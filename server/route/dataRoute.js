// membuat route
const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

// get and post data
router.route('/').get(dataController.GetAllData).post(dataController.PostData)
// get, update, and delete data with specific value (id)
router.route('/:id').get(dataController.GetSingleData).put(dataController.UpdateData).delete(dataController.DeleteData)

module.exports = router