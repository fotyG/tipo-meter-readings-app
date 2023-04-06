const { TipoE004165 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE004165 = async (req, res) => {
  const reading = await TipoE004165.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE004165 = async (req, res) => {
  try {
    // find the latest document in TipoE004165
    const latest = await TipoE004165.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE004165.findOne({
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

const getAllTipoE004165 = async (req, res) => {
  const readings = await TipoE004165.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createTipoE004165,
  getLatestTipoE004165,
  getAllTipoE004165,
}
