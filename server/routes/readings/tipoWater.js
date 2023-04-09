const express = require("express")
const router = express.Router()

const {
  createTipoW,
  getLatestTipoW,
  getAllTipoW,
  deleteTipoW,
} = require("../../controllers/readings/tipoWater")

router.route("/tipow").post(createTipoW).get(getAllTipoW)
router.route("/tipow/latest").get(getLatestTipoW)
router.route("/tipow/:id").delete(deleteTipoW)

module.exports = router
