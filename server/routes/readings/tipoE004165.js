const express = require("express")
const router = express.Router()

const {
  createTipoE004165,
  getLatestTipoE004165,
  getAllTipoE004165,
  deleteTipoE004165,
} = require("../../controllers/readings/tipoE004165")

router.route("/TipoE004165").post(createTipoE004165).get(getAllTipoE004165)
router.route("/TipoE004165/latest").get(getLatestTipoE004165)
router.route("/TipoE004165/:id").delete(deleteTipoE004165)

module.exports = router
