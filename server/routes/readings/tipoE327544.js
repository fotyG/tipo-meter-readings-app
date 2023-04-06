const express = require("express")
const router = express.Router()

const {
  createTipoE327544,
  getLatestTipoE327544,
  getAllTipoE327544,
} = require("../../controllers/readings/tipoE327544")

router.route("/TipoE327544").post(createTipoE327544).get(getAllTipoE327544)
router.route("/TipoE327544/latest").get(getLatestTipoE327544)

module.exports = router
