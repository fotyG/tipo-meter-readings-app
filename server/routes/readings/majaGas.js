const express = require("express")
const router = express.Router()

const {
  createMajaGas,
  getLatestMajaGas,
  getAllMajaGas,
  deleteMajaGas,
} = require("../../controllers/readings/majaGas")

router
  .route("/MajaGas")
  .post(createMajaGas)
  .get(getAllMajaGas)
router.route("/MajaGas/latest").get(getLatestMajaGas)
router.route("/MajaGas/:id").delete(deleteMajaGas)

module.exports = router
