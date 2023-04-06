const express = require("express")
const router = express.Router()

const {
  createTipoG,
  getLatestTipoG,
  getAllTipoG,
} = require("../../controllers/readings/tipoGas")

router.route("/tipog").post(createTipoG).get(getAllTipoG)
router.route("/tipog/latest").get(getLatestTipoG)

module.exports = router
