const express = require("express")
const router = express.Router()

const {
  createTipoE0282269_33067590,
  getLatestTipoE0282269_33067590,
  getAllTipoE0282269_33067590,
  deleteTipoE0282269_33067590,
} = require("../../controllers/readings/tipoE0282269_33067590")

router.route("/TipoE0282269_33067590").post(createTipoE0282269_33067590).get(getAllTipoE0282269_33067590)
router.route("/TipoE0282269_33067590/latest").get(getLatestTipoE0282269_33067590)
router.route("/TipoE0282269_33067590/:id").delete(deleteTipoE0282269_33067590)

module.exports = router
