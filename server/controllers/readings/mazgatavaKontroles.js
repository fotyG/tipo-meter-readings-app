const { MazgatavaKontroles } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMazgatavaKontroles = async (req, res) => {
  const reading = await MazgatavaKontroles.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMazgatavaKontroles = async (req, res) => {
  try {
    // find the latest document in MazgatavaKontroles
    const latest = await MazgatavaKontroles.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MazgatavaKontroles.findOne({
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

const getAllMazgatavaKontroles = async (req, res) => {
  const readings = await MazgatavaKontroles.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMazgatavaKontroles = async (req, res) => {
  try {
    const deletedItem = await MazgatavaKontroles.findByIdAndDelete(
      req.params.id
    )
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editMazgatavaKontroles = async (req, res) => {
  try {
    const editedItem = await MazgatavaKontroles.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneMazgatavaKontroles = async (req, res) => {
  try {
    const oneReading = await MazgatavaKontroles.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createMazgatavaKontroles,
  getLatestMazgatavaKontroles,
  getAllMazgatavaKontroles,
  deleteMazgatavaKontroles,
  editMazgatavaKontroles,
  getOneMazgatavaKontroles,
}
