import express from "express"
const router = express.Router()
import homeController from "../controllers/home.js"

router.get("/", homeController.getIndex)
router.get("/explore", homeController.getExplore)
router.post("/explore", homeController.findByState)

export default router
