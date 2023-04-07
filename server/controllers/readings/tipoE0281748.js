const { TipoE0281748 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0281748 = async (req, res) => {
  const reading = await TipoE0281748.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0281748 = async (req, res) => {
  try {
    // find the latest document in TipoE0281748
    const latest = await TipoE0281748.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0281748.findOne({
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

const getAllTipoE0281748 = async (req, res) => {
  const readings = await TipoE0281748.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createTipoE0281748,
  getLatestTipoE0281748,
  getAllTipoE0281748,
}
