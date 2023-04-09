const { TipoE0281679 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0281679 = async (req, res) => {
  const reading = await TipoE0281679.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0281679 = async (req, res) => {
  try {
    // find the latest document in TipoE0281679
    const latest = await TipoE0281679.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0281679.findOne({
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

const getAllTipoE0281679 = async (req, res) => {
  const readings = await TipoE0281679.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0281679 = async (req, res) => {
  try {
    const deletedItem = await TipoE0281679.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE0281679 = async (req, res) => {
  try {
    const editedItem = await TipoE0281679.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE0281679 = async (req, res) => {
  try {
    const oneReading = await TipoE0281679.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE0281679,
  getLatestTipoE0281679,
  getAllTipoE0281679,
  deleteTipoE0281679,
  editTipoE0281679,
  getOneTipoE0281679,
}
