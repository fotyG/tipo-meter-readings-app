const express = require("express")
const router = express.Router()

const {
  createTipoE0281748,
  getLatestTipoE0281748,
  getAllTipoE0281748,
} = require("../../controllers/readings/tipoE0281748")

router.route("/TipoE0281748").post(createTipoE0281748).get(getAllTipoE0281748)
router.route("/TipoE0281748/latest").get(getLatestTipoE0281748)

module.exports = router
