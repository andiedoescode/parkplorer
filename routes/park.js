const express = require("express")
const parksController = require("../controllers/park")
const router = express.Router()

router.get("/", parksController.getAllParks)
router.get("/state/:id", parksController.getByState)
router.get("/:id", parksController.getPark)
router.get("/page/:page", parksController.paginate)

module.exports = router
