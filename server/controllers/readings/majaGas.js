const { MajaGas } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaGas = async (req, res) => {
  const reading = await MajaGas.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMajaGas = async (req, res) => {
  try {
    // find the latest document in MajaGas
    const latest = await MajaGas.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MajaGas.findOne({
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

const getAllMajaGas = async (req, res) => {
  const readings = await MajaGas.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createMajaGas,
  getLatestMajaGas,
  getAllMajaGas,
}
