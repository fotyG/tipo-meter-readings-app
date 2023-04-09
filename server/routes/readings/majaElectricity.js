const express = require("express")
const router = express.Router()

const {
  createMajaElectricity,
  getLatestMajaElectricity,
  getAllMajaElectricity,
  deleteMajaElectricity,
  editMajaElectricity,
  getOneMajaElectricity,
} = require("../../controllers/readings/majaElectricity")

router.route("/MajaElectricity").post(createMajaElectricity).get(getAllMajaElectricity)
router.route("/MajaElectricity/latest").get(getLatestMajaElectricity)
router.route("/MajaElectricity/:id").delete(deleteMajaElectricity).get(getOneMajaElectricity).patch(editMajaElectricity)

module.exports = router
