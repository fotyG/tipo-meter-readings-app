const { MajaElectricity } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createMajaElectricity = async (req, res) => {
  const reading = await MajaElectricity.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestMajaElectricity = async (req, res) => {
  try {
    // find the latest document in MajaElectricity
    const latest = await MajaElectricity.findOne().sort({ createdAt: -1 }).exec()

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

module.exports = {
  createMajaElectricity,
  getLatestMajaElectricity,
  getAllMajaElectricity,
}
