const express = require("express")
const router = express.Router()

const {
  createTipoE0281935,
  getLatestTipoE0281935,
  getAllTipoE0281935,
  deleteTipoE0281935,
  editTipoE0281935,
  getOneTipoE0281935,
} = require("../../controllers/readings/tipoE0281935")

router
  .route("/TipoE0281935")
  .post(createTipoE0281935)
  .get(getAllTipoE0281935)
router.route("/TipoE0281935/latest").get(getLatestTipoE0281935)
router.route("/TipoE0281935/:id").delete(deleteTipoE0281935).get(getOneTipoE0281935).patch(editTipoE0281935)

module.exports = router
