const express = require("express")
const router = express.Router()

const { createMeter, getAllMeterLatestReadings } = require("../controllers/meter")

router.route("/meters").post(createMeter).get(getAllMeterLatestReadings)


module.exports = router