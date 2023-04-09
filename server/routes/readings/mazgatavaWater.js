const express = require("express")
const router = express.Router()

const {
  createMazgatavaWater,
  getLatestMazgatavaWater,
  getAllMazgatavaWater,
  deleteMazgatavaWater,
} = require("../../controllers/readings/mazgatavaWater")

router
  .route("/MazgatavaWater")
  .post(createMazgatavaWater)
  .get(getAllMazgatavaWater)
router.route("/MazgatavaWater/latest").get(getLatestMazgatavaWater)
router.route("/MazgatavaWater/:id").delete(deleteMazgatavaWater)

module.exports = router
