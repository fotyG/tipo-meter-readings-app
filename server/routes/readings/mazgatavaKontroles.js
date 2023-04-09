const express = require("express")
const router = express.Router()

const {
  createMazgatavaKontroles,
  getLatestMazgatavaKontroles,
  getAllMazgatavaKontroles,
  deleteMazgatavaKontroles,
} = require("../../controllers/readings/mazgatavaKontroles")

router
  .route("/MazgatavaKontroles")
  .post(createMazgatavaKontroles)
  .get(getAllMazgatavaKontroles)
router.route("/MazgatavaKontroles/latest").get(getLatestMazgatavaKontroles)
router.route("/MazgatavaKontroles/:id").delete(deleteMazgatavaKontroles)

module.exports = router
