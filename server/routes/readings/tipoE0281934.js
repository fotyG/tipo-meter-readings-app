const express = require("express")
const router = express.Router()

const {
  createTipoE0281934,
  getLatestTipoE0281934,
  getAllTipoE0281934,
  deleteTipoE0281934,
  editTipoE0281934,
  getOneTipoE0281934,
} = require("../../controllers/readings/tipoE0281934")

router.route("/TipoE0281934").post(createTipoE0281934).get(getAllTipoE0281934)
router.route("/TipoE0281934/latest").get(getLatestTipoE0281934)
router.route("/TipoE0281934/:id").delete(deleteTipoE0281934).get(getOneTipoE0281934).patch(editTipoE0281934)

module.exports = router
