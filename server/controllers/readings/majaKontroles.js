const { MajaKontroles } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaKontroles = async (req, res) => {
  const reading = await MajaKontroles.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMajaKontroles = async (req, res) => {
  try {
    // find the latest document in MajaKontroles
    const latest = await MajaKontroles.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await MajaKontroles.findOne({
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

const getAllMajaKontroles = async (req, res) => {
  const readings = await MajaKontroles.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteMajaKontroles = async (req, res) => {
  try {
    const deletedItem = await MajaKontroles.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createMajaKontroles,
  getLatestMajaKontroles,
  getAllMajaKontroles,
  deleteMajaKontroles,
}
