const { MazgatavaWater } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMazgatavaWater = async (req, res) => {
  const reading = await MazgatavaWater.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMazgatavaWater = async (req, res) => {
  try {
    // find the latest document in MazgatavaWater
    const latest = await MazgatavaWater.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MazgatavaWater.findOne({
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

const getAllMazgatavaWater = async (req, res) => {
  const readings = await MazgatavaWater.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMazgatavaWater = async (req, res) => {
  try {
    const deletedItem = await MazgatavaWater.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editMazgatavaWater = async (req, res) => {
  try {
    const editedItem = await MazgatavaWater.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneMazgatavaWater = async (req, res) => {
  try {
    const oneReading = await MazgatavaWater.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createMazgatavaWater,
  getLatestMazgatavaWater,
  getAllMazgatavaWater,
  deleteMazgatavaWater,
  editMazgatavaWater,
  getOneMazgatavaWater,
}
