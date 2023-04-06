const express = require("express")
const router = express.Router()

const {
  createMazgatavaElectricity,
  getLatestMazgatavaElectricity,
  getAllMazgatavaElectricity,
} = require("../../controllers/readings/mazgatavaElectricity")

router
  .route("/MazgatavaElectricity")
  .post(createMazgatavaElectricity)
  .get(getAllMazgatavaElectricity)
router.route("/MazgatavaElectricity/latest").get(getLatestMazgatavaElectricity)

module.exports = router
