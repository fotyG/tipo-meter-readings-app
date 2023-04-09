const express = require("express")
const router = express.Router()

const {
  createTipoG,
  getLatestTipoG,
  getAllTipoG,
  deleteTipoG,
  editTipoG,
  getOneTipoG,
} = require("../../controllers/readings/tipoGas")

router.route("/tipog").post(createTipoG).get(getAllTipoG)
router.route("/tipog/latest").get(getLatestTipoG)
router.route("/tipog/:id").delete(deleteTipoG).get(getOneTipoG).patch(editTipoG)

module.exports = router
