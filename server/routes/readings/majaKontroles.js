const express = require("express")
const router = express.Router()

const {
  createMajaKontroles,
  getLatestMajaKontroles,
  getAllMajaKontroles,
  deleteMajaKontroles,
  editMajaKontroles,
  getOneMajaKontroles,
} = require("../../controllers/readings/majaKontroles")

router.route("/MajaKontroles").post(createMajaKontroles).get(getAllMajaKontroles)
router.route("/MajaKontroles/latest").get(getLatestMajaKontroles)
router.route("/MajaKontroles/:id").delete(deleteMajaKontroles).get(getOneMajaKontroles).patch(editMajaKontroles)

module.exports = router
