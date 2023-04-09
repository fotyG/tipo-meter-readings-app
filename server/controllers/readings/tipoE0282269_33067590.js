const { TipoE0282269_33067590 } = require("../../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createTipoE0282269_33067590 = async (req, res) => {
  const reading = await TipoE0282269_33067590.create(req.body)
  res.status(StatusCodes.CREATED).json({ reading })
}

const getLatestTipoE0282269_33067590 = async (req, res) => {
  try {
    // find the latest document in TipoE0282269_33067590
    const latest = await TipoE0282269_33067590.findOne().sort({ createdAt: -1 }).exec()

    // find the document with the next highest timestamp value using $lt operator
    const previous = await TipoE0282269_33067590.findOne({
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

const getAllTipoE0282269_33067590 = async (req, res) => {
  const readings = await TipoE0282269_33067590.find().sort("-createdAt")
  res.status(StatusCodes.OK).json({ readings })
}

const deleteTipoE0282269_33067590 = async (req, res) => {
  try {
    const deletedItem = await TipoE0282269_33067590.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createTipoE0282269_33067590,
  getLatestTipoE0282269_33067590,
  getAllTipoE0282269_33067590,
  deleteTipoE0282269_33067590,
}
