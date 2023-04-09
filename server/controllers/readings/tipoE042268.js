const { TipoE042268 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE042268 = async (req, res) => {
  const reading = await TipoE042268.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE042268 = async (req, res) => {
  try {
    // find the latest document in TipoE042268
    const latest = await TipoE042268.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE042268.findOne({
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

const getAllTipoE042268 = async (req, res) => {
  const readings = await TipoE042268.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE042268 = async (req, res) => {
  try {
    const deletedItem = await TipoE042268.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE042268 = async (req, res) => {
  try {
    const editedItem = await TipoE042268.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE042268 = async (req, res) => {
  try {
    const oneReading = await TipoE042268.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE042268,
  getLatestTipoE042268,
  getAllTipoE042268,
  deleteTipoE042268,
  editTipoE042268,
  getOneTipoE042268,
}
