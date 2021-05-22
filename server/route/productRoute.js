// membuat route
const express = require('express')
const router = express.Router()

// importing controller
const productController = require('../controllers/productController')

// get all product route
router.route('/').get(productController.GetAllProduct)
// get single product route
router.route('/:id').get(productController.GetSingleProduct)
// add product route
router.route('/add').post(productController.AddProduct)
// update product route
router.route('/update/:id').put(productController.UpdateProduct)
// delete product route
router.route('/delete/:id').delete(productController.DeleteProduct)

module.exports = router