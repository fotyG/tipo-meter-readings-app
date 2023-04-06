const express = require("express")
const router = express.Router()

const {
  createMajaElectricity,
  getLatestMajaElectricity,
  getAllMajaElectricity,
} = require("../../controllers/readings/majaElectricity")

router.route("/MajaElectricity").post(createMajaElectricity).get(getAllMajaElectricity)
router.route("/MajaElectricity/latest").get(getLatestMajaElectricity)

module.exports = router
