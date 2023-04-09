const express = require("express")
const router = express.Router()

const {
  createMajaWater,
  getLatestMajaWater,
  getAllMajaWater,
  deleteMajaWater,
} = require("../../controllers/readings/majaWater")

router.route("/MajaWater").post(createMajaWater).get(getAllMajaWater)
router.route("/MajaWater/latest").get(getLatestMajaWater)
router.route("/MajaWater/:id").delete(deleteMajaWater)

module.exports = router
