const express = require("express")
const parksController = require("../controllers/park")
const router = express.Router()

router.get("/", parksController.getAllParks)
router.get("/state/:id", parksController.getByState)
router.get("/:id", parksController.getPark)

module.exports = router
