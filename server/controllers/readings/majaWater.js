const { MajaWater } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaWater = async (req, res) => {
  const reading = await MajaWater.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMajaWater = async (req, res) => {
  try {
    // find the latest document in MajaWater
    const latest = await MajaWater.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MajaWater.findOne({
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

const getAllMajaWater = async (req, res) => {
  const readings = await MajaWater.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMajaWater = async (req, res) => {
  try {
    const deletedItem = await MajaWater.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editMajaWater = async (req, res) => {
  try {
    const editedItem = await MajaWater.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneMajaWater = async (req, res) => {
  try {
    const oneReading = await MajaWater.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createMajaWater,
  getLatestMajaWater,
  getAllMajaWater,
  deleteMajaWater,
  editMajaWater,
  getOneMajaWater,
}
