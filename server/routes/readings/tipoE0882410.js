const express = require("express")
const router = express.Router()

const {
  createTipoE0882410,
  getLatestTipoE0882410,
  getAllTipoE0882410,
} = require("../../controllers/readings/tipoE0882410")

router.route("/TipoE0882410").post(createTipoE0882410).get(getAllTipoE0882410)
router.route("/TipoE0882410/latest").get(getLatestTipoE0882410)

module.exports = router
