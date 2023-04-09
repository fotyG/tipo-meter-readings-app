const { TipoE0281935 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0281935 = async (req, res) => {
  const reading = await TipoE0281935.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0281935 = async (req, res) => {
  try {
    // find the latest document in TipoE0281935
    const latest = await TipoE0281935.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0281935.findOne({
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

const getAllTipoE0281935 = async (req, res) => {
  const readings = await TipoE0281935.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0281935 = async (req, res) => {
  try {
    const deletedItem = await TipoE0281935.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE0281935 = async (req, res) => {
  try {
    const editedItem = await TipoE0281935.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE0281935 = async (req, res) => {
  try {
    const oneReading = await TipoE0281935.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE0281935,
  getLatestTipoE0281935,
  getAllTipoE0281935,
  deleteTipoE0281935,
  editTipoE0281935,
  getOneTipoE0281935,
}
