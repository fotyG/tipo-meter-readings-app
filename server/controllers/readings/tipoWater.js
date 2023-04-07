const { TipoWater } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoW = async (req, res) => {
  const reading = await TipoWater.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoW = async (req, res) => {
  try {
    // find the latest document in TipoWater
    const latest = await TipoWater.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoWater.findOne({
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

const getAllTipoW = async (req, res) => {
  const readings = await TipoWater.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = { createTipoW, getLatestTipoW, getAllTipoW }
