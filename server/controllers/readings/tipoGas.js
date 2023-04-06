const { TipoGas } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoG = async (req, res) => {
  const reading = await TipoGas.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoG = async (req, res) => {
  try {
    // find the latest document in TipoGas
    const latest = await TipoGas.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoGas.findOne({
      createdAt: { $lt: latest.createdAt },
    })
      .sort({ createdAt: -1 })
      .exec()

    res.status(StatusCodes.OK).json({ latest, previous })
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" })
  }
}

const getAllTipoG = async (req, res) => {
  const readings = await TipoGas.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = { createTipoG, getLatestTipoG, getAllTipoG }
