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

module.exports = {
  createMazgatavaWater,
  getLatestMazgatavaWater,
  getAllMazgatavaWater,
}
