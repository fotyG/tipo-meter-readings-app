const express = require("express")
const router = express.Router()

const {
  createTipoW,
  getLatestTipoW,
  getAllTipoW,
} = require("../../controllers/readings/tipoWater")

router.route("/tipow").post(createTipoW).get(getAllTipoW)
router.route("/tipow/latest").get(getLatestTipoW)

module.exports = router
