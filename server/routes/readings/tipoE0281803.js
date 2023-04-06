const express = require("express")
const router = express.Router()

const {
  createTipoE0281803,
  getLatestTipoE0281803,
  getAllTipoE0281803,
} = require("../../controllers/readings/tipoE0281803")

router
  .route("/TipoE0281803")
  .post(createTipoE0281803)
  .get(getAllTipoE0281803)
router
  .route("/TipoE0281803/latest")
  .get(getLatestTipoE0281803)

module.exports = router
