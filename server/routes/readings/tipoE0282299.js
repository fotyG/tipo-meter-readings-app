const express = require("express")
const router = express.Router()

const {
  createTipoE0282299,
  getLatestTipoE0282299,
  getAllTipoE0282299,
} = require("../../controllers/readings/tipoE0282299")

router.route("/TipoE0282299").post(createTipoE0282299).get(getAllTipoE0282299)
router.route("/TipoE0282299/latest").get(getLatestTipoE0282299)

module.exports = router
