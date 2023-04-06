const express = require("express")
const router = express.Router()

const {
  createMajaGas,
  getLatestMajaGas,
  getAllMajaGas,
} = require("../../controllers/readings/majaGas")

router
  .route("/MajaGas")
  .post(createMajaGas)
  .get(getAllMajaGas)
router.route("/MajaGas/latest").get(getLatestMajaGas)

module.exports = router
