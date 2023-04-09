const express = require("express")
const router = express.Router()

const {
  createMazgatavaElectricity,
  getLatestMazgatavaElectricity,
  getAllMazgatavaElectricity,
  deleteMazgatavaElectricity,
  editMazgatavaElectricity,
  getOneMazgatavaElectricity,
} = require("../../controllers/readings/mazgatavaElectricity")

router
  .route("/MazgatavaElectricity")
  .post(createMazgatavaElectricity)
  .get(getAllMazgatavaElectricity)
router.route("/MazgatavaElectricity/latest").get(getLatestMazgatavaElectricity)
router.route("/MazgatavaElectricity/:id").delete(deleteMazgatavaElectricity).get(getOneMazgatavaElectricity).patch(editMazgatavaElectricity)

module.exports = router
