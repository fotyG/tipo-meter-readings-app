const { TipoE042268 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE042268 = async (req, res) => {
  const reading = await TipoE042268.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE042268 = async (req, res) => {
  try {
    // find the latest document in TipoE042268
    const latest = await TipoE042268.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE042268.findOne({
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

const getAllTipoE042268 = async (req, res) => {
  const readings = await TipoE042268.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createTipoE042268,
  getLatestTipoE042268,
  getAllTipoE042268,
}
