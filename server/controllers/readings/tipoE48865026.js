const { TipoE48865026 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE48865026 = async (req, res) => {
  const reading = await TipoE48865026.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE48865026 = async (req, res) => {
  try {
    // find the latest document in TipoE48865026
    const latest = await TipoE48865026.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE48865026.findOne({
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

const getAllTipoE48865026 = async (req, res) => {
  const readings = await TipoE48865026.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE48865026 = async (req, res) => {
  try {
    const deletedItem = await TipoE48865026.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE48865026 = async (req, res) => {
  try {
    const editedItem = await TipoE48865026.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE48865026 = async (req, res) => {
  try {
    const oneReading = await TipoE48865026.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE48865026,
  getLatestTipoE48865026,
  getAllTipoE48865026,
  deleteTipoE48865026,
  editTipoE48865026,
  getOneTipoE48865026,
}
