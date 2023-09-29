const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home.js")

router.get("/", homeController.getIndex)
router.get("/explore", homeController.getExplore)
router.post("/explore", homeController.findByState)

module.exports = router
