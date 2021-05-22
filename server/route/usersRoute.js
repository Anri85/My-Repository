// users route
const express = require('express')
const router = express.Router()

// importing controller
const usersController = require('../controllers/usersController')

// login route
router.route('/login').post(usersController.Login)
// register route
router.route('/register').post(usersController.Register)

module.exports = router