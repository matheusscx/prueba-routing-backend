const express = require('express')
const router = express.Router()
const vehicle = require('../modules/vehicle')

router.get('/vehicle', vehicle.getVehicle)

module.exports = router