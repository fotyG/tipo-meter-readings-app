const express = require("express")
const router = express.Router()

const {
  createTipoESanitex,
  getLatestTipoESanitex,
  getAllTipoESanitex,
} = require("../../controllers/readings/tipoESanitex")

router.route("/TipoESanitex").post(createTipoESanitex).get(getAllTipoESanitex)
router.route("/TipoESanitex/latest").get(getLatestTipoESanitex)

module.exports = router
