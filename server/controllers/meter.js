const { Meter } = require("../models/Meters")
const { StatusCodes } = require("http-status-codes")

const createMeter = async (req, res) => {
  try {
    const meter = await Meter.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: "Meter Created Successfully"})
    console.log(meter)
  } catch (error) {
    res.json({msg: "Creation failed", error})
  }
}

const getAllMeterLatestReadings = async (req, res) => {
  try {
    const result = await Meter.aggregate([
      {
        $lookup: {
          from: "readings",
          localField: "_id",
          foreignField: "meterId",
          as: "readings",
        },
      },
      {
        $unwind: "$readings",
      },
      {
        $sort: {
          "readings.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          meterId: { $first: "$meterId" },
          client: { $first: "$client" },
          meterType: { $first: "$meterType" },
          location: { $first: "$location" },
          pavilion: { $first: "$pavilion" },
          meterNr: { $first: "$meterNr" },
          readings: { $push: "$readings" },
        },
      },
      {
        $project: {
          meterId: 1,
          client: 1,
          meterType: 1,
          location: 1,
          pavilion: 1,
          meterNr: 1,
          readings: {
            $slice: ["$readings", 0, 2],
          },
        },
      },
      {
        $sort: {
          location: -1,
          pavilion: 1,
          client: 1,
          meterType: 1,
        },
      },
    ])
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" })
  }
}



module.exports = { createMeter, getAllMeterLatestReadings }