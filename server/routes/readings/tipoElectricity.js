const express = require("express")
const router = express.Router()

const {
  createTipoE,
  getLatestTipoE,
  getAllTipoE,
} = require("../../controllers/readings/tipoElectricity")

router.route("/tipoe").post(createTipoE).get(getAllTipoE)
router.route("/tipoe/latest").get(getLatestTipoE)


module.exports = router;