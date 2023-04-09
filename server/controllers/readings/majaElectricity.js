const { MajaElectricity } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaElectricity = async (req, res) => {
  try {
    const reading = await MajaElectricity.create(req.body)
    res.status(StatusCodes.CREATED).json({ reading })
  } catch (error) {
    console.log(error)
  }
}

const getLatestMajaElectricity = async (req, res) => {
  try {
    // find the latest document in MajaElectricity
    const latest = await MajaElectricity.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MajaElectricity.findOne({
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

const getAllMajaElectricity = async (req, res) => {
  const readings = await MajaElectricity.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMajaElectricity = async (req, res) => {
  try {
    const deletedItem = await MajaElectricity.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editMajaElectricity = async (req, res) => {
  try {
    const editedItem = await MajaElectricity.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneMajaElectricity = async (req, res) => {
  try {
    const oneReading = await MajaElectricity.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createMajaElectricity,
  getLatestMajaElectricity,
  getAllMajaElectricity,
  deleteMajaElectricity,
  editMajaElectricity,
  getOneMajaElectricity,
}
