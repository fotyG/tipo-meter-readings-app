const { TipoE0882410 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0882410 = async (req, res) => {
  const reading = await TipoE0882410.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0882410 = async (req, res) => {
  try {
    // find the latest document in TipoE0882410
    const latest = await TipoE0882410.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0882410.findOne({
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

const getAllTipoE0882410 = async (req, res) => {
  const readings = await TipoE0882410.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0882410 = async (req, res) => {
  try {
    const deletedItem = await TipoE0882410.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

const editTipoE0882410 = async (req, res) => {
  try {
    const editedItem = await TipoE0882410.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    console.log(error)
  }
}

const getOneTipoE0882410 = async (req, res) => {
  try {
    const oneReading = await TipoE0882410.findById(req.params.id)
    res.status(StatusCodes.OK).json(oneReading)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Reading Not Found" })
  }
}

module.exports = {
  createTipoE0882410,
  getLatestTipoE0882410,
  getAllTipoE0882410,
  deleteTipoE0882410,
  editTipoE0882410,
  getOneTipoE0882410,
}
