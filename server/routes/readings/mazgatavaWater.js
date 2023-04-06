const express = require("express")
const router = express.Router()

const {
  createMazgatavaWater,
  getLatestMazgatavaWater,
  getAllMazgatavaWater,
} = require("../../controllers/readings/mazgatavaWater")

router
  .route("/MazgatavaWater")
  .post(createMazgatavaWater)
  .get(getAllMazgatavaWater)
router.route("/MazgatavaWater/latest").get(getLatestMazgatavaWater)

module.exports = router
