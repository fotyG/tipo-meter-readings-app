const mongoose = require("mongoose")
const Schema = mongoose.Schema


const readingSchema = new Schema(
  {
    meterId: {
      type: Schema.Types.ObjectId,
      ref: "Meter",
      required: true,
    },
    reading: {
      type: Number,
      required: true,
    },
    client: {
      type: String,
    },
  },
  { timestamps: true }
)

const Reading = mongoose.model("Reading", readingSchema)

module.exports = { Reading }
