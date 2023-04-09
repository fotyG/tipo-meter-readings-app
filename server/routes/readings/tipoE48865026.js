const express = require("express")
const router = express.Router()

const {
  createTipoE48865026,
  getLatestTipoE48865026,
  getAllTipoE48865026,
  deleteTipoE48865026,
  editTipoE48865026,
  getOneTipoE48865026,
} = require("../../controllers/readings/tipoE48865026")

router.route("/TipoE48865026").post(createTipoE48865026).get(getAllTipoE48865026)
router.route("/TipoE48865026/latest").get(getLatestTipoE48865026)
router.route("/TipoE48865026/:id").delete(deleteTipoE48865026).get(getOneTipoE48865026).patch(editTipoE48865026)

module.exports = router
