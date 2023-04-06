const express = require("express")
const router = express.Router()

const {
  createTipoE0281934,
  getLatestTipoE0281934,
  getAllTipoE0281934,
} = require("../../controllers/readings/tipoE0281934")

router.route("/TipoE0281934").post(createTipoE0281934).get(getAllTipoE0281934)
router.route("/TipoE0281934/latest").get(getLatestTipoE0281934)

module.exports = router
