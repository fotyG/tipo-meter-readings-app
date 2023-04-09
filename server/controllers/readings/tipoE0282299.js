const { TipoE0282299 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0282299 = async (req, res) => {
  const reading = await TipoE0282299.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0282299 = async (req, res) => {
  try {
    // find the latest document in TipoE0282299
    const latest = await TipoE0282299.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0282299.findOne({
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

const getAllTipoE0282299 = async (req, res) => {
  const readings = await TipoE0282299.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0282299 = async (req, res) => {
  try {
    const deletedItem = await TipoE0282299.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createTipoE0282299,
  getLatestTipoE0282299,
  getAllTipoE0282299,
  deleteTipoE0282299,
}
