const express = require("express")
const router = express.Router()

const {
  createMazgatavaKontroles,
  getLatestMazgatavaKontroles,
  getAllMazgatavaKontroles,
} = require("../../controllers/readings/mazgatavaKontroles")

router
  .route("/MazgatavaKontroles")
  .post(createMazgatavaKontroles)
  .get(getAllMazgatavaKontroles)
router.route("/MazgatavaKontroles/latest").get(getLatestMazgatavaKontroles)

module.exports = router
