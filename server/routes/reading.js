const express = require("express")
const router = express.Router()

const {
  createReading,
  getMetersReadings,
  getOneReading,
  deleteReading,
  editReading,
} = require("../controllers/reading")

router.route("/readings").post(createReading)
router.route("/meters/:id").get(getMetersReadings)
router
  .route("/readings/:id")
  .get(getOneReading)
  .delete(deleteReading)
  .patch(editReading)

module.exports = router
