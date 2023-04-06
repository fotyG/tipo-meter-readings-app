const express = require("express")
const router = express.Router()

const {
  createMajaKontroles,
  getLatestMajaKontroles,
  getAllMajaKontroles,
} = require("../../controllers/readings/majaKontroles")

router.route("/MajaKontroles").post(createMajaKontroles).get(getAllMajaKontroles)
router.route("/MajaKontroles/latest").get(getLatestMajaKontroles)

module.exports = router
