const express = require('express')
const router = express.Router()
const driver = require('../modules/driver')

router.get('/driver', driver.getDriver)

module.exports = router