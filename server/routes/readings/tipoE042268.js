const express = require("express")
const router = express.Router()

const {
  createTipoE042268,
  getLatestTipoE042268,
  getAllTipoE042268,
} = require("../../controllers/readings/tipoE042268")

router.route("/TipoE042268").post(createTipoE042268).get(getAllTipoE042268)
router.route("/TipoE042268/latest").get(getLatestTipoE042268)

module.exports = router
