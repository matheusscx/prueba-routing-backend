const express = require('express')
const router = express.Router()
const login = require('../modules/login')

router.post('/login', login.login)

module.exports = router