const express = require("express")
const router = express.Router()

const {
  createTipoE0282274,
  getLatestTipoE0282274,
  getAllTipoE0282274,
  deleteTipoE0282274,
} = require("../../controllers/readings/tipoE0282274")

router.route("/TipoE0282274").post(createTipoE0282274).get(getAllTipoE0282274)
router.route("/TipoE0282274/latest").get(getLatestTipoE0282274)
router.route("/TipoE0282274/:id").delete(deleteTipoE0282274)

module.exports = router
