const express = require("express")
const router = express.Router()

const {
  createTipoESanitex,
  getLatestTipoESanitex,
  getAllTipoESanitex,
  deleteTipoESanitex,
  editTipoESanitex,
  getOneTipoESanitex,
} = require("../../controllers/readings/tipoESanitex")

router.route("/TipoESanitex").post(createTipoESanitex).get(getAllTipoESanitex)
router.route("/TipoESanitex/latest").get(getLatestTipoESanitex)
router.route("/TipoESanitex/:id").delete(deleteTipoESanitex).get(getOneTipoESanitex).patch(editTipoESanitex)

module.exports = router
