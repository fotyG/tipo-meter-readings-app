const { TipoE0882410 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0882410 = async (req, res) => {
  const reading = await TipoE0882410.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0882410 = async (req, res) => {
  try {
    // find the latest document in TipoE0882410
    const latest = await TipoE0882410.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0882410.findOne({
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

const getAllTipoE0882410 = async (req, res) => {
  const readings = await TipoE0882410.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = {
  createTipoE0882410,
  getLatestTipoE0882410,
  getAllTipoE0882410,
}
