const express = require('express')
const router = express.Router()

router.use(require('./login'))
router.use(require('./organization'))
router.use(require('./vehicle'))
router.use(require('./driver'))
router.use(require('./action'))
router.use(require('./route'))

module.exports = router
