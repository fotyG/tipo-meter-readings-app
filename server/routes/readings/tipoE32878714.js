const express = require("express")
const router = express.Router()

const {
  createTipoE32878714,
  getLatestTipoE32878714,
  getAllTipoE32878714,
  deleteTipoE32878714,
} = require("../../controllers/readings/tipoE32878714")

router
  .route("/TipoE32878714")
  .post(createTipoE32878714)
  .get(getAllTipoE32878714)
router.route("/TipoE32878714/latest").get(getLatestTipoE32878714)
router.route("/TipoE32878714/:id").delete(deleteTipoE32878714)

module.exports = router
