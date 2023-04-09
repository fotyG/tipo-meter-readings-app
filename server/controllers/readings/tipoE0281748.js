const { TipoE0281748 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0281748 = async (req, res) => {
  const reading = await TipoE0281748.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0281748 = async (req, res) => {
  try {
    // find the latest document in TipoE0281748
    const latest = await TipoE0281748.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0281748.findOne({
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

const getAllTipoE0281748 = async (req, res) => {
  const readings = await TipoE0281748.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0281748 = async (req, res) => {
  try {
    const deletedItem = await TipoE0281748.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE0281748 = async (req, res) => {
  try {
    const editedItem = await TipoE0281748.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE0281748 = async (req, res) => {
  try {
    const oneReading = await TipoE0281748.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE0281748,
  getLatestTipoE0281748,
  getAllTipoE0281748,
  deleteTipoE0281748,
  editTipoE0281748,
  getOneTipoE0281748,
}
