const { TipoE32878714 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE32878714 = async (req, res) => {
  const reading = await TipoE32878714.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE32878714 = async (req, res) => {
  try {
    // find the latest document in TipoE32878714
    const latest = await TipoE32878714.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE32878714.findOne({
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

const getAllTipoE32878714 = async (req, res) => {
  const readings = await TipoE32878714.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE32878714 = async (req, res) => {
  try {
    const deletedItem = await TipoE32878714.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createTipoE32878714,
  getLatestTipoE32878714,
  getAllTipoE32878714,
  deleteTipoE32878714,
}
