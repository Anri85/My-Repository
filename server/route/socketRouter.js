const express = require('express')
const { route } = require('./productRoute')
const router = express.Router()

router.get('/socket', (requiest, response) => {
    response.send('Route For Socket.IO Is Ready!')
})

module.exports = router