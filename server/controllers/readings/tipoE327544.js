const { TipoE327544 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE327544 = async (req, res) => {
  const reading = await TipoE327544.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE327544 = async (req, res) => {
  try {
    // find the latest document in TipoE327544
    const latest = await TipoE327544.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE327544.findOne({
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

const getAllTipoE327544 = async (req, res) => {
  const readings = await TipoE327544.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createTipoE327544,
  getLatestTipoE327544,
  getAllTipoE327544,
}
