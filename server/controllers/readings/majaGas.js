const { MajaGas } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaGas = async (req, res) => {
  const reading = await MajaGas.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMajaGas = async (req, res) => {
  try {
    // find the latest document in MajaGas
    const latest = await MajaGas.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MajaGas.findOne({
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

const getAllMajaGas = async (req, res) => {
  const readings = await MajaGas.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMajaGas = async (req, res) => {
  try {
    const deletedItem = await MajaGas.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editMajaGas = async (req, res) => {
  try {
    const editedItem = await MajaGas.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneMajaGas = async (req, res) => {
  try {
    const oneReading = await MajaGas.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createMajaGas,
  getLatestMajaGas,
  getAllMajaGas,
  deleteMajaGas,
  editMajaGas,
  getOneMajaGas,
}
