const express = require('express')
const router = express.Router()
const organization = require('../modules/organization')

router.get('/organization', organization.getOrganization)

module.exports = router