const { TipoGas } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoG = async (req, res) => {
  const reading = await TipoGas.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoG = async (req, res) => {
  try {
    // find the latest document in TipoGas
    const latest = await TipoGas.findOne()
      .sort({ createdAt: -1 })
      .exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoGas.findOne({
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

const getAllTipoG = async (req, res) => {
  const readings = await TipoGas.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoG = async (req, res) => {
  try {
    const deletedItem = await TipoGas.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoG = async (req, res) => {
  try {
    const editedItem = await TipoGas.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoG = async (req, res) => {
  try {
    const oneReading = await TipoGas.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoG,
  getLatestTipoG,
  getAllTipoG,
  deleteTipoG,
  editTipoG,
  getOneTipoG,
}
