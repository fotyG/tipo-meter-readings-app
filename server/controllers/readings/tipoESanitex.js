const { TipoESanitex } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoESanitex = async (req, res) => {
  const reading = await TipoESanitex.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoESanitex = async (req, res) => {
  try {
    // find the latest document in TipoESanitex
    const latest = await TipoESanitex.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoESanitex.findOne({
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

const getAllTipoESanitex = async (req, res) => {
  const readings = await TipoESanitex.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoESanitex = async (req, res) => {
  try {
    const deletedItem = await TipoESanitex.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoESanitex = async (req, res) => {
  try {
    const editedItem = await TipoESanitex.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoESanitex = async (req, res) => {
  try {
    const oneReading = await TipoESanitex.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoESanitex,
  getLatestTipoESanitex,
  getAllTipoESanitex,
  deleteTipoESanitex,
  editTipoESanitex,
  getOneTipoESanitex,
}
