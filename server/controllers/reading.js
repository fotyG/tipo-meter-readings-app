const { Reading } = require("../models/Readings")
const { StatusCodes } = require("http-status-codes")

const createReading = async (req, res) => {
  try {
    const reading = await Reading.create(req.body)
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Reading Created Successfully" })
  } catch (error) {
    res.json({ msg: "Creation failed", error })
  }
}

const getMetersReadings = async (req, res) => {
  try {
    const readings = await Reading.find({
      meterId: req.params.id,
    })
      .populate("meterId")
      .sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json(readings)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" })
  }
}

const getOneReading = async (req, res) => {
  try {
    const readings = await Reading.find({
      _id: req.params.id,
    })
      .populate("meterId")
      .sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json(readings)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" })
  }
}

const deleteReading = async (req, res) => {
  try {
    const readingToDelete = await Reading.findByIdAndDelete({
      _id: req.params.id,
    })
    res.status(StatusCodes.NO_CONTENT).json({ msg: "Reading Deleted" })
  } catch (error) {
    res.json({ msg: "Delete operation failed" })
  }
}

const editReading = async (req,res) => {
  try {
    const readingToEdit = await Reading.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.status(StatusCodes.OK).json({ msg: "Reading Edited" })
  } catch (error) {
    res.json({msg: "Edit did not succeed"})
  }
}

module.exports = {
  createReading,
  getMetersReadings,
  getOneReading,
  deleteReading,
  editReading,
}
