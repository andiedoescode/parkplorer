import express from "express"
const router = express.Router()
import parksController from "../controllers/park.js"

router.get("/", parksController.getAllParks)
router.get("/state/:id", parksController.getByState)
router.get("/:id", parksController.getPark)
router.get("/page/:page", parksController.paginate)

export default router
