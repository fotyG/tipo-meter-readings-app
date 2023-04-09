const express = require("express")
const router = express.Router()

const {
  createTipoESanitex,
  getLatestTipoESanitex,
  getAllTipoESanitex,
  deleteTipoESanitex,
} = require("../../controllers/readings/tipoESanitex")

router.route("/TipoESanitex").post(createTipoESanitex).get(getAllTipoESanitex)
router.route("/TipoESanitex/latest").get(getLatestTipoESanitex)
router.route("/TipoESanitex/:id").delete(deleteTipoESanitex)

module.exports = router
