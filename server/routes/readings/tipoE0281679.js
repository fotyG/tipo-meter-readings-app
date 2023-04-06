const express = require("express")
const router = express.Router()

const {
  createTipoE0281679,
  getLatestTipoE0281679,
  getAllTipoE0281679,
} = require("../../controllers/readings/tipoE0281679")

router.route("/TipoE0281679").post(createTipoE0281679).get(getAllTipoE0281679)
router.route("/TipoE0281679/latest").get(getLatestTipoE0281679)

module.exports = router
