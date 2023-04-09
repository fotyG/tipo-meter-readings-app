const { TipoE0282274 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0282274 = async (req, res) => {
  const reading = await TipoE0282274.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0282274 = async (req, res) => {
  try {
    // find the latest document in TipoE0282274
    const latest = await TipoE0282274.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0282274.findOne({
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

const getAllTipoE0282274 = async (req, res) => {
  const readings = await TipoE0282274.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0282274 = async (req, res) => {
  try {
    const deletedItem = await TipoE0282274.findByIdAndDelete(
      req.params.id
    )
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE0282274 = async (req, res) => {
  try {
    const editedItem = await TipoE0282274.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE0282274 = async (req, res) => {
  try {
    const oneReading = await TipoE0282274.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE0282274,
  getLatestTipoE0282274,
  getAllTipoE0282274,
  deleteTipoE0282274,
  editTipoE0282274,
  getOneTipoE0282274,
}
