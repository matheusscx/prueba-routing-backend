const express = require("express")
const router = express.Router()
const { getRoute, createRoute, deleteRoute, updateRoute } = require("../modules/route")

router.get("/route", getRoute)
router.post("/route", createRoute)
router.put("/route", updateRoute)
router.delete("/route", deleteRoute)

module.exports = router
