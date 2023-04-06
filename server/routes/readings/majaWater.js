const express = require("express")
const router = express.Router()

const {
  createMajaWater,
  getLatestMajaWater,
  getAllMajaWater,
} = require("../../controllers/readings/majaWater")

router.route("/MajaWater").post(createMajaWater).get(getAllMajaWater)
router.route("/MajaWater/latest").get(getLatestMajaWater)

module.exports = router
