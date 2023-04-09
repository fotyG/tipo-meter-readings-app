const { MazgatavaElectricity } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMazgatavaElectricity = async (req, res) => {
  const reading = await MazgatavaElectricity.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMazgatavaElectricity = async (req, res) => {
  try {
    // find the latest document in MazgatavaElectricity
    const latest = await MazgatavaElectricity.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MazgatavaElectricity.findOne({
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

const getAllMazgatavaElectricity = async (req, res) => {
  const readings = await MazgatavaElectricity.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMazgatavaElectricity = async (req, res) => {
  try {
    const deletedItem = await MazgatavaElectricity.findByIdAndDelete(
      req.params.id
    )
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createMazgatavaElectricity,
  getLatestMazgatavaElectricity,
  getAllMazgatavaElectricity,
  deleteMazgatavaElectricity,
}
