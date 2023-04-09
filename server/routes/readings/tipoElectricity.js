const express = require("express")
const router = express.Router()

const {
  createTipoE,
  getLatestTipoE,
  getAllTipoE,
  deleteTipoE,
} = require("../../controllers/readings/tipoElectricity")

router.route("/tipoe").post(createTipoE).get(getAllTipoE)
router.route("/tipoe/latest").get(getLatestTipoE)
router.route("/tipoe/:id").delete(deleteTipoE)


module.exports = router;