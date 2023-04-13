const mongoose = require("mongoose")
const Schema = mongoose.Schema

const meterSchema = new Schema({
  meterId: {
    type: String,
    required: true,
    unique: true,
  },
  client: String,
  meterType: String,
  location: String,
  pavilion: String,
  meterNr: String,
})

const Meter = mongoose.model("Meter", meterSchema)


module.exports = { Meter }
