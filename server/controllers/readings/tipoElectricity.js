const { TipoElectricity } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes");

const createTipoE = async (req, res) => {
  const reading = await TipoElectricity.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE = async (req, res) => {
  try {
    // find the latest document in TipoElectricity
    const latest = await TipoElectricity.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoElectricity.findOne({
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

const getAllTipoE = async (req, res) => {
  const readings = await TipoElectricity.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({readings})
}

const deleteTipoE = async (req, res) => {
  try {
    const deletedItem = await TipoElectricity.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createTipoE, getLatestTipoE, getAllTipoE, deleteTipoE }