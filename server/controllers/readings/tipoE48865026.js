const { TipoE48865026 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE48865026 = async (req, res) => {
  const reading = await TipoE48865026.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE48865026 = async (req, res) => {
  try {
    // find the latest document in TipoE48865026
    const latest = await TipoE48865026.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE48865026.findOne({
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

const getAllTipoE48865026 = async (req, res) => {
  const readings = await TipoE48865026.find()
  res.status(StatusCodes.OK).json({ readings })
}

module.exports = { createTipoE48865026, getLatestTipoE48865026, getAllTipoE48865026 }
