const express = require('express')
const router = express.Router()
const action = require('../modules/action')

router.get('/action', action.getAction)

module.exports = router